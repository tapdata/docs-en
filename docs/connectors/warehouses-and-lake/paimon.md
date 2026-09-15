---
pdkId: paimon-plus
---

# Paimon Plus


Paimon Plus is TapData's connector for [Apache Paimon](https://paimon.apache.org/), a data lake format for building real-time lakehouses with Flink and Spark. You can use Paimon Plus as a source or target for batch and real-time data synchronization.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Supported versions

Apache Paimon 0.8.2 and later

## Supported operations

- **DML**: INSERT, UPDATE, and DELETE
- **DDL**: Collecting or applying DDL operations is not supported.

:::tip

- As a source, Paimon Plus supports full reads and incremental reads based on Paimon snapshots. When a task first enters the incremental phase without an available checkpoint, it starts with the snapshot after the latest snapshot at that time. Earlier changes are not replayed.
- As a target, Paimon Plus does not support runtime schema changes. Create or update the target table schema before starting the task.

:::

## Supported data types

| Paimon type | TapData type |
| --- | --- |
| BOOLEAN | TapBoolean |
| TINYINT, SMALLINT, INT, BIGINT | TapNumber |
| FLOAT, DOUBLE, DECIMAL | TapNumber |
| CHAR, VARCHAR, STRING | TapString |
| BINARY, VARBINARY | TapBinary |
| DATE | TapDate |
| TIME(0-3) | TapTime |
| TIMESTAMP, TIMESTAMP_LTZ | TapDateTime |

When TapData creates a target table, it maps TapArray, TapMap, TapRow, and TapRaw to Paimon STRING columns and stores their values as JSON strings. The connector does not automatically migrate existing target columns and cannot write to existing Paimon ARRAY, MAP, ROW, MULTISET, or VARIANT columns.

:::tip

Add a [Type Modification](../../data-transformation/process-node.md#type-modification) processor to change the data types written to the target table.

:::

## Considerations

- When Paimon Plus is used as a source, the TapData Agent must be able to access the warehouse metadata and table data. It needs permissions to list databases and tables and read table schemas and data files.
- During incremental reads, Paimon INSERT and UPDATE_AFTER records become insert events, while DELETE and UPDATE_BEFORE records become delete events. An update might therefore appear as a delete of the old record followed by an insert of the new record. If a downstream system depends on native UPDATE events, test how it handles updates and deletes before running the task in production.
- Define a primary key on target tables that need to support updates or deletes. For large tables, consider partitioning based on your query and write patterns.
- Paimon supports primary keys but not traditional indexes.
- When Paimon Plus is used as a target with soft delete enabled, TapData converts a DELETE into an UPDATE with a deletion marker. This operation requires the complete before image. If the source DELETE event does not include it, non-primary-key fields might be written as `null`. For MongoDB 6.0 and later, enable [Document Pre-image](../on-prem-databases/mongodb.md#node-advanced-features) on the source node. For other sources, make sure the CDC logs contain the complete row before deletion.

## Connect to Paimon Plus

1. Log in to the TapData platform.

2. In the left navigation pane, click **Connection Management**.

3. On the right side of the page, click **Create**.

4. In the dialog, search for and select **Paimon Plus**.

5. Configure the connection as described below.

   - **Basic Settings**
     - **Connection Name**: Enter a unique name that identifies the connection.
     - **Connection Type**: Select whether to use Paimon Plus as a source or target.
     - **Warehouse Path**: Enter the root path of the Paimon warehouse. For example, use `s3://bucket/path` for S3, `hdfs://namenode:port/path` for HDFS, `oss://bucket/path` for OSS, or `/local/path/to/warehouse` for a local file system. A source connection requires read access to warehouse metadata and table data. A target connection also requires write, create, and delete permissions.
     - **Storage Type**: Select S3, HDFS, OSS, or Local based on the storage used by the Paimon warehouse.

       ```mdx-code-block
       <Tabs className="unique-tabs">
       <TabItem value="S3" default>
       ```

       For AWS S3, MinIO, or another S3-compatible object store, configure the following settings:

       * **S3 Endpoint**: Enter the S3 service endpoint, including the port when required. For example, `http://192.168.1.57:9000/`.
       * **S3 Access Key**: Enter the access key ID.
       * **S3 Secret Key**: Enter the corresponding secret access key.
       * **S3 Region**: Enter the region that hosts the S3 service, such as `us-east-1`.
       * **Permission requirements**: A source connection requires permissions to list buckets and directories and read objects. A target connection also requires permissions to write and delete objects.

       </TabItem>
       <TabItem value="HDFS">

       For HDFS storage, configure the following settings:

       * **HDFS Host**: Enter the NameNode hostname or IP address, such as `192.168.1.57`.
       * **HDFS Port**: Enter the NameNode port, such as `9000`.
       * **HDFS User**: Enter the user that accesses HDFS, such as `hadoop`.
       * **Permission requirements**: A source connection requires read and execute permissions on the warehouse path and its subdirectories. A target connection also requires write, create, and delete permissions.

       </TabItem>
       <TabItem value="OSS">

       For Alibaba Cloud OSS storage, configure the following settings:

       * **OSS Endpoint**: Enter the OSS service endpoint, such as `https://oss-cn-hangzhou.aliyuncs.com`.
       * **OSS Access Key**: Enter the access key ID.
       * **OSS Secret Key**: Enter the corresponding access key secret.
       * **Permission requirements**: A source connection requires permissions to list buckets and directories and read objects. A target connection also requires permissions to write and delete objects.

       </TabItem>
       <TabItem value="Local">

       Enter a local file-system path accessible from the TapData Agent host. For a source connection, the Agent's operating-system user needs read permissions on the warehouse path and its subdirectories. For a target connection, the user also needs write, create, and delete permissions.

       </TabItem>
       </Tabs>

     - **Database Name**: Enter the Paimon database name. The default is `default`. Each connection maps to one database. Create a separate connection for each additional database.
   - **Advanced Settings**
     - **Agent Settings**: The default is **Platform automatic allocation**. You can also select an Agent manually.
     - **Model Load Time**: If the source contains fewer than 10,000 models, TapData refreshes model information hourly. If it contains more than 10,000 models, TapData refreshes the information once per day at the specified time.

6. Click **Test Connection**. After the test succeeds, click **Save**.

   :::tip

   If the connection test fails, check the warehouse path, storage credentials, network connectivity, and access permissions based on the error message.

   :::

## Advanced node features

You can configure table creation and write behavior in the advanced settings of a Paimon Plus node in a data replication or transformation task. When Paimon Plus is used as a source, the connector loads the existing source tables and reads them using their schemas, partitions, buckets, and other table properties. You do not need to configure these settings again.

### Table structure and storage

The following settings primarily apply when a target table does not exist and TapData creates it. For an existing target table, TapData retains its schema and table properties.

| Configuration | Description |
| --- | --- |
| **Hash Key** | Disabled by default. When enabled, if the primary key or update condition contains more than five fields, TapData adds an `_hash_key` field to an automatically created target table and uses it as the primary key. This reduces write overhead for wide keys. |
| **Partition Key** | Empty by default. Specifies the partition fields for an automatically created target table. Leave it empty to create an unpartitioned table. |
| **Bucket Mode** | The default is **Dynamic**. Available modes are **Dynamic**, **Postpone**, and **Fixed**. Dynamic mode works for general use cases. Postpone mode is available only for primary-key tables and lets Paimon adjust the bucket count in the background. Fixed mode requires a **Bucket Count**. |
| **Bucket Count** | The default is **1**. This setting appears only when **Bucket Mode** is **Fixed** and specifies the number of buckets in an automatically created target table. |
| **File Format** | Empty by default, which uses the Paimon default. You can also select ORC, Parquet, Avro, CSV, or JSON. |
| **Compression Format** | Empty by default, which uses the Paimon default. You can also select None, Snappy, LZ4, ZSTD, GZIP, or BZIP2. |
| **Table Properties** | Empty by default. Add Paimon table properties as key-value pairs. The connector supports only synchronous snapshot expiration. If you set `snapshot.expire.execution-mode`, its value must be `SYNC`. A task also fails before writing if an existing table uses `ASYNC`. |
| **Target File Size (MB)** | The default is **128 MB**. The supported range is 32-1024 MB. This setting controls the target file size after compaction. |

### Writes and compaction

| Configuration | Description |
| --- | --- |
| **Write Buffer Size (MB)** | The default is **256 MB**. The supported range is 64-2048 MB. A larger buffer can improve throughput but uses more memory. |
| **Data disk overflow write** | Disabled by default. When enabled, the write buffer can spill data to disk. |
| **Disk overflow capacity (GB)** | Appears only when **Data disk overflow write** is enabled. The default is **1 GB**, and the supported range is 1-10 GB. This setting limits how much disk space spilled data can use. |
| **Disk temporary directory** | Appears only when **Data disk overflow write** is enabled. The default is `/tmp`. Make sure the TapData Agent can read and write this directory and that it has sufficient free space. |
| **Batch Accumulation Size** | The default is **100000**, and the supported range is 0-1000000. TapData triggers a commit after accumulating this number of records. Set it to 0 to commit immediately after each write. |
| **Commit Interval (ms)** | The default is **30000** ms, and the supported range is 0-300000 ms. TapData triggers a commit after this interval. Set it to 0 to disable time-based commits. |
| **Enable Async Commit** | Enabled by default. TapData commits accumulated data in the background to reduce write blocking. |
| **Async Commit Concurrency** | The default is **1**, and the supported range is 1-16. This setting limits the number of physical tables that can be committed concurrently. It appears only when **Enable Async Commit** is enabled. |
| **Enable Auto Compaction** | Enabled by default. TapData periodically runs compaction to merge small files. |
| **Compaction Interval (minutes)** | The default is **30** minutes, and the supported range is 1-1440 minutes. This setting applies only when **Enable Auto Compaction** is enabled. |
| **Enable Primary Key Update Detection** | Disabled by default. When enabled, TapData converts a primary-key update into a delete of the old record followed by an insert of the new record. The source must provide before-update data, or the task fails. Enabling this setting adds processing overhead to updates. |

### Task shutdown and resource cleanup

When a task stops, Paimon Plus commits received data, runs a final compaction, waits for the related processes to exit, and then cleans up temporary resources. Keep the default values in most cases. Increase them when compaction takes longer on your target tables.

| Configuration | Description |
| --- | --- |
| **STOP Total Timeout (seconds)** | The default is **180** seconds. Limits the total time allowed for committing data, running final compaction, and cleaning up resources. |
| **Final Compaction Timeout (seconds)** | The default is **120** seconds. Limits the time allowed for final compaction during shutdown. When the timeout expires, the connector requests cancellation of the compaction. |
| **Compaction Cancellation Grace (seconds)** | The default is **30** seconds. Specifies how long the connector waits for compaction to exit after requesting cancellation. |

These settings apply to the entire node, require positive integers, and cannot be configured per table. The task reports a shutdown failure if the total timeout expires or compaction does not exit within the cancellation grace period. To avoid deleting files that are still in use, the connector retains the related temporary resources until the original process exits.
