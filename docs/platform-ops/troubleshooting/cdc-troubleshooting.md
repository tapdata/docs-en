# CDC Incremental Sync Troubleshooting

Troubleshooting CDC (Change Data Capture) issues is key to keeping replication tasks stable. When you see high incremental lag, tasks stopping with errors, or inconsistent data, the root cause is often on the source side: log configuration, permissions, or resource constraints. This guide helps you quickly identify and resolve the most common CDC problems.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Identify the Symptom

Before you dive in, first classify the issue based on how the task behaves:



-  **Task stops with an error**: The task status becomes “Error” or “Stopped”. Check the [task logs](../../data-replication/monitor-task.md#-task-log-display-area) and look for keywords such as `binlog`, `cdc`, `DDL event`, or `Oplog`.
    
    **Common causes**: Log expiry, insufficient permissions, parsing errors, unexpected DDL changes, network interruptions.

-  **Incremental lag keeps increasing**: The task is “Running”, but **incremental lag** keeps growing (for example, from milliseconds to minutes or hours).
    
    **Common causes**: Bulk updates (large transactions) on the source, high source load, limited network bandwidth, TapData engine processing bottlenecks.

-  **Data inconsistency or missing updates**: The target has fewer rows than the source, or certain fields are not updated.
    
    **Common causes**: Tables without primary keys causing updates to be lost, DDL changes not replicated, incorrect log parsing or filtering configuration.

-  **No incremental changes captured from the source**: The task looks normal and the source is changing, but TapData monitoring shows QPS as 0 and the target does not change.
    
    **Common causes**: CDC not enabled on the database, incorrect log-level settings, misconfigured log filters (for example, excluding the database or tables you intended to replicate).

## General Troubleshooting Steps

Regardless of the source database type, these steps cover the basics for CDC troubleshooting:

1. Open the task monitoring page and [check the task logs](../../data-replication/monitor-task.md#-task-log-display-area).
    - **Error codes**: Filter by `WARN` or `ERROR`. Use the standard [error codes](error-code.md) to quickly narrow down the cause and recommended fixes.
    - **Key context**: Read the surrounding log lines. For example, `binlog` typically points to MySQL configuration; `ReplicationSlot` often points to a PostgreSQL replication-slot issue.

2. Verify the account has sufficient privileges to read the database transaction logs.
    :::tip
    For the required CDC permissions per source database, see the connector documentation under [Connect Data Sources](../../connectors/README.md).
    :::

3. Check network connectivity.
    - From the machine running the TapData engine, `ping` the source IP or use `telnet` to verify the port is reachable.
    - Check whether firewall policies drop long-idle connections (TCP keepalive).

## Database-Specific CDC Checks

CDC implementations differ by database. Follow the section that matches your source.

:::tip
This guide covers common databases only. For CDC requirements on other databases, see the relevant connector under [Connect Data Sources](../../connectors/README.md).
:::


```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="MySQL / MariaDB" default>
```
MySQL CDC relies on the binary log (binlog). Common issues include:

- **Binlog is enabled and formatted correctly**:
  Binlog must be enabled with `binlog_format` set to `ROW`, and `binlog_row_image` must be `FULL`.
  ```sql
  SHOW VARIABLES LIKE 'log_bin'; -- Result must be ON
  SHOW VARIABLES LIKE 'binlog_format'; -- Result must be ROW
  SHOW VARIABLES LIKE 'binlog_row_image'; -- Result must be FULL
  ```
  :::tip
  If `binlog_row_image` is not `FULL`, UPDATE events may omit unchanged columns, which can cause replication failures on the target.
  :::

- **Binlog filtering rules**:
  Check whether `binlog-ignore-db` or `binlog-do-db` is configured in MySQL (`my.cnf`).
  *   If `binlog-ignore-db` is set, make sure it does **not** include the database you want to replicate.
  *   If `binlog-do-db` is set, you must **explicitly include** the database. Otherwise its incremental changes will not be logged and TapData cannot capture them.

- **Binlog has expired (purged)**:
  If you restart a task after it has been stopped for a while and see errors like “Binlog not found”, the retention window may be too short.
  ```sql
  -- List current binlog files
  SHOW BINARY LOGS;
  -- Check binlog retention settings
  SHOW VARIABLES LIKE 'expire_logs_days';
  SHOW VARIABLES LIKE 'binlog_expire_logs_seconds';
  ```
  **Fix**: Increase binlog retention, or reset the task and start again.


</TabItem>

<TabItem value="PostgreSQL">

PostgreSQL CDC typically uses Logical Replication and Replication Slots.

:::tip
TapData supports Wal2json (recommended), Pgoutput, Decoderbufs, and Walminer decoding plugins. The checks below use Wal2json as an example.
:::

- **Check WAL level**:
  It must be `logical`.
  ```sql
  SHOW wal_level; -- Must be logical
  ```

- **Check replication slot status**:
  TapData creates a replication slot to persist and resume the read position.
  ```sql
  -- Check replication slot status; active = t means in use
  SELECT * FROM pg_replication_slots;
  ```
  :::tip
  If a slot has `active = f` and an old `restart_lsn`, WAL files may not be recycled and can **fill up disk space**. Remove unused slots promptly.
  :::

- **Check Replica Identity**:
  If UPDATE/DELETE operations are not replicated, verify the table has a primary key or a Replica Identity configured.
  ```sql
  -- Default is DEFAULT (uses primary key). If no primary key, set to FULL (higher overhead)
  ALTER TABLE table_name REPLICA IDENTITY FULL;
  ```

</TabItem>

<TabItem value="MongoDB">


MongoDB CDC relies on the oplog (operations log).

- **Check deployment mode**:
  MongoDB must run as a **Replica Set** or a **Sharded Cluster**.
  
  Standalone MongoDB does not enable the oplog by default and does not support CDC. You can convert it to a single-node replica set to enable the oplog. See [Convert a Standalone to a Replica Set](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/).

- **Check oplog window (retention)**:
  If the oplog window is too short, the task may not be able to resume after being paused.
  ```javascript
  // Run in the mongo shell to view oplog size and time range
  rs.printReplicationInfo();
  ```
  **Fix**: If the “Log length start to end” window is too short (for example, only 1 hour), increase the oplog size.

</TabItem>

<TabItem value="Oracle">

Oracle CDC typically relies on LogMiner or TapData’s [raw log parsing tool](../../case-practices/best-practice/raw-logs-solution.md).

- **Check archive log mode**:
  Archive mode must be enabled. Otherwise, once online redo logs are overwritten, historical changes cannot be recovered.
  ```sql
  ARCHIVE LOG LIST; -- Database log mode must be Archive Mode
  ```

- **Check supplemental logging**:
  Minimal supplemental logging must be enabled, along with table-level column logging (typically primary key or all columns).
  ```sql
  SELECT supplemental_log_data_min FROM v$database; -- Must be YES
  ```

</TabItem>

<TabItem value="SQL Server">


- **Check whether CDC/CT is enabled**:
  Confirm CDC or CT (Change Tracking) is enabled at both the database and table level.
  ```sql
  -- Check whether CDC is enabled at the database level
  SELECT name, is_cdc_enabled FROM sys.databases;
  -- Check whether CDC is enabled for tables
  SELECT name, is_tracked_by_cdc FROM sys.tables;
  ```

- **Check SQL Server Agent**:
  CDC relies on Agent jobs to capture and clean up data. Ensure the SQL Server Agent service is running.

</TabItem>

</Tabs>

## Performance Troubleshooting and Tuning

If the task is not erroring but **incremental lag remains high** or **throughput is lower than expected**, optimize from these angles:

* **Engine overload**
    - **Insufficient memory**: Check whether TapData engine logs show frequent GC (Garbage Collection). If memory is tight, consider merging tasks to reduce thread overhead, or scale up the server and increase engine memory.
    - **Enable shared mining**: If multiple tasks replicate from the same source, enable [Shared Mining](../../operational-data-hub/advanced/share-mining.md). This merges log-reading threads, significantly reducing source pressure and network bandwidth usage.

* **Network or source-side issues**
    - **Network stability**: Check whether there were network interruptions. Consider restarting network services or optimizing routing.
    - **Large transactions or batch operations**: Full-table updates or mass deletes generate huge logs and can cause lag to backlog. This is expected. Increase the task’s **incremental concurrent write threads** to catch up faster, or coordinate with application owners to split large transactions or run them off-peak.

* **High database load**
  
  If CPU/IO on the source or target is saturated, slower responses will also slow replication. Work with your DBA to run performance analysis and scale resources if needed.


## Other Common Issues

* **DDL changes break replication**
    
    Confirm whether DDL changes occurred on the source, and check whether the task has “DDL Sync” and “DDL Apply” enabled. If not enabled, you must adjust the target schema manually or reset the task.

    For detailed handling strategies and best practices, see [Handle DDL Changes](../../case-practices/best-practice/handle-schema-changes.md).

*   **Data inconsistency**
    
    If you suspect inconsistency, troubleshoot in this order:
    - **Trigger impact**: Check whether the source tables have triggers that modify data. Some CDC implementations may not capture trigger-generated changes, or trigger logic may modify rows again and the changes are not captured as expected.
    - **Data validation**: Use TapData data validation to confirm whether source and target are consistent.
      - **[Full data validation](../../operational-data-hub/fdm-layer/validate-data-quality.md)**: Used after initial sync to validate consistency. Supports COUNT, field values, hash-based checks, and more.
      - **[Incremental data validation](../../data-replication/incremental-check.md)**: Used to monitor consistency in real time.
