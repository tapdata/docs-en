# What's New

This article provides release notes for TapData Enterprise, including new features, improvements, and bug fixes.


```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```


```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="Version 4.x" default>
```

## 4.8.0

### New Features

* Added support for detecting and [comparing target data models](case-practices/best-practice/compare-data-model.md) to ensure greater data consistency.

### Enhancements

* Enabled rolling upgrades for the API service to ensure uninterrupted availability during updates.

### Bug Fixes

* Fixed an issue where the audit log could not identify client information when the token had expired.
* Fixed an issue where the `Limit` parameter in API requests was not being applied correctly.

## 4.7.0

### New Features

* Added support for configuring field masking rules when [creating APIs](publish-apis/create-api-service.md). Masked fields will also appear masked in audit logs and debug results, improving data security.
* When publishing custom query APIs, users can now preview and edit the final query statement and use custom parameter values.
* API responses now support returning only specific fields from nested documents or arrays, reducing data redundancy and improving performance.

### Enhancements

* Added the ability to configure API database timeout settings in the system settings. When a request times out, clear log messages are generated to simplify troubleshooting.
* Improved the generated API Swagger documentation to fully include request bodies, response formats, and error codes, enhancing integration efficiency and consistency.


## 4.6.0

### New Features

* Added support for defining business aliases for fields when [creating APIs](publish-apis/create-api-service.md), improving semantic readability and standardization of field names.
* When publishing a Custom Query API, you can now preview and edit the generated SQL statement, and reference user-defined parameters—offering a more flexible API configuration experience.

### Enhancements

* Added an **“Ignore Update Events”** option for child table merge logic, reducing redundant triggers and minimizing unnecessary data updates.
* Support for customizing license alert levels and email templates, helping enterprises meet compliance and notification requirements.
* Added a Set API Access option on the role management page, enabling quick assignment of API access permissions to roles, improving authorization efficiency.

### Bug Fixes

* Fixed an issue where the maximum number of rows returned by an API did not take effect in system settings.
* Fixed a display error in the API audit page.

## 4.5.0

### Enhancements

* Improved write performance when using [Feishu Bitable](connectors/saas-and-api/feishu-bitable.md) as a target database.
* Optimized the source and target configuration interfaces to make interactions clearer, improving usability and configuration efficiency.

### Bug Fixes

* Fixed an issue where **specified return fields for APIs** were not applied correctly.

## 4.4.0

### New Features

- [Incremental data validation](data-replication/incremental-check.md) now supports tables without primary keys, along with manual repair. This expands validation coverage and helps ensure data consistency.
- Added [alert notifications](system-admin/other-settings/notification.md#alert-settings) during task retries to improve visibility and responsiveness in failure scenarios.
- Introduced "Node Data Preview" in the task editor, allowing you to view sample fields instantly while configuring tasks—speeding up design and troubleshooting.

### Enhancements

- Improved data source monitoring: Added connection status and performance metrics for Sybase and PostgreSQL, enhancing system observability.

## 4.3.0

### New Features

- [Data validation](operational-data-hub/fdm-layer/validate-data-quality.md) now supports exporting repair SQL for inconsistent results, with compatibility for PostgreSQL, Sybase, and **SQL Server**. This makes offline auditing and rollback easier for ops teams.
- JS Processor Node now supports the `unset` operation, enabling targeted field removal in MongoDB. Ideal for cleanup and payload optimization.

### Enhancements

- Refined logic for marking full sync tasks as completed: now based on whether all writes to the target are finished—more aligned with real business completion.

## 4.2.0

### New Features

- Added status monitoring for incremental log mining plugins in the [Cluster Management](system-admin/manage-cluster.md) module to improve observability and troubleshooting efficiency.
- Support for [customizing alert email content](system-admin/other-settings/notification.md#mail-alert), enhancing readability and flexibility of notifications.
- Support for importing/exporting [data verification task configurations](operational-data-hub/fdm-layer/validate-data-quality.md), making it easier to migrate or reuse configurations between test and production environments.

### Enhancements

- Optimized index synchronization logic to preserve index names in the target database, improving consistency and business traceability.

### Bug Fixes

- Fixed an issue where searching shared mining tasks by connection name caused a page error.

## 4.1.0

### New Features

- Added support for [Incremental Data Validation](data-replication/incremental-check.md) within tasks. This feature continuously verifies target-side data consistency during synchronization, improving validation efficiency and enhancing overall data reliability.

### Enhancements

- Improved the user experience of the data validation interface to make the process more intuitive and feedback more informative.

### Bug Fixes

- Fixed an issue where an unclear error message was shown when creating an Oracle data source with a non-existent account. The system now explicitly indicates that the account does not exist.

## 4.0.0

### New Features

* Introduced [Tapdata MCP (Model Context Protocol)](experimental/mcp/introduction.md), enabling integration of multi-source data into real-time contextual views consumable by LLMs and AI Agents. This feature is ideal for scenarios with high demands on data freshness and compliance, such as financial risk control.
* Added support for using **StarRocks** as a target database, allowing faster construction of real-time data warehouses for high-concurrency, multi-dimensional analytics use cases.
* Added the ability to choose from multiple data structures(e.g. Flink) when syncing to **[Kafka-Enhanced](connectors/mq-and-middleware/kafka-enhanced.md)**, enhancing compatibility and integration efficiency with downstream systems.

### Enhancements

* When update or delete operations fail to match records on the target side, the system now logs warning messages to aid troubleshooting.
* Data replication tasks now support filtering tables by **primary keys and unique indexes**, including: primary key only, unique index only, with either, or without primary key (optionally including unique index).
* In MySQL-to-MySQL sync scenarios, you can now create indexes based on the **first N characters** of a `text`-type field.

### Bug Fixes

* Fixed an issue where field and table processing nodes displayed incorrectly across pagination in replication tasks.
* Fixed an `ArrayIndexOutOfBoundsException` that could occur during incremental sync from **Oracle to Doris**.
* Fixed an error that occurred when using a `date` field as a join key for data validation during sync between Oracle databases.

</TabItem>
<TabItem value="Version 3.x">

## 3.27.0

### New Features

- The Cluster Overview page on the homepage now displays task distribution by node, helping you better understand cluster workload.
- [OceanBase (MySQL Mode)](connectors/on-prem-databases/oceanbase.md), [OceanBase (Oracle Mode)](connectors/on-prem-databases/oceanbase-oracle.md), and [GaussDB (DWS)](connectors/warehouses-and-lake/gaussdb.md) have passed Tapdata certification and are now classified as [Certified Data Sources](connectors/supported-data-sources.md), offering enhanced features and improved production-level stability.
- Data replication tasks now support writing multiple tables to the same Kafka topic, expanding compatibility with more write scenarios.

### Enhancements

- Improved model visualization by adjusting how primary keys, foreign keys, and unique indexes are displayed, making models more readable and easier to edit.

### Bug Fixes

- Fixed an issue where connection requests were not evenly distributed across multiple `mongos` nodes, eliminating potential single-node performance bottlenecks.

## 3.26.0

### New Features

- Added support for syncing tables with auto-increment primary keys in [SQL Server](connectors/on-prem-databases/sqlserver.md).
- Added support for syncing default values and foreign keys in [PostgreSQL](connectors/on-prem-databases/postgresql.md) to SQL Server sync scenarios.

### Enhancements

- Optimized the data validation feature by adding quick location and null-first filter options for easier data inspection.

## 3.25.0

### New Features

- Added support for synchronizing **column default values**, **auto-increment columns**, and **foreign key constraints** in [MySQL](connectors/on-prem-databases/mysql.md)-to-MySQL, [PostgreSQL](connectors/on-prem-databases/postgresql.md)-to-PostgreSQL, and [SQL Server](connectors/on-prem-databases/sqlserver.md)-to-PostgreSQL scenarios, ensuring data structure consistency.
- Enabled foreign key constraint synchronization in [Sybase](connectors/on-prem-databases/sybase.md)-to-PostgreSQL tasks, further enhancing data consistency.
- Enhanced the **[primary-secondary merge node](data-transformation/process-node.md#pri-sec-merged)** functionality to allow subsequent connections with other processing nodes (including JS nodes), improving workflow flexibility.

### Enhancements

- Improved Kafka connector capabilities.
- Optimized the display of task milestones for better clarity.

### Bug Fixes

- Fixed an issue where MongoDB sharded configurations could not be automatically synchronized.
- Resolved a problem where MongoDB capped collections failed to sync correctly.
- Fixed an issue where merged embedded arrays behaved unexpectedly when modifying relationship keys.
- Addressed an error that occurred when using the **one-click data repair** feature after a primary table relationship key validation failure in primary-secondary merge tasks.

## 3.24.0

### Enhancements

- Improved login failure messages by removing specific error details (e.g., incorrect email or password) to enhance security.
- Added support for assigning separate alert email recipients for different tasks, allowing more precise monitoring of task status.

### Bug Fixes

- Fixed an issue where incremental data lost time precision when synchronizing from Oracle to PostgreSQL.
- Fixed an issue in primary-secondary merge tasks where changes to the primary table's association conditions caused extra pre-update records in the target data.

## 3.23.0

### New Features

- Added support for the [Sybase to PostgreSQL](connectors/on-prem-databases/sybase.md) sync scenario, now supporting synchronization of default values, enumerated types, and sequences.
- Enabled the ability to define a primary key for tables without a primary key when configuring [Primary-Secondary Merge Nodes](data-transformation/process-node.md#pri-sec-merged), ensuring data synchronization consistency and improving merge efficiency.

### Enhancements

- Improved field derivation logic for the Sybase to PostgreSQL sync scenario.
- Optimized CPU usage in shared mining tasks during concurrent multi-table consumption scenarios.

### Bug Fixes

- Fixed an issue with multi-level associated keys in primary-secondary merges, preventing incorrect merging of child table data.

## 3.22.0

### Enhancements

- Improved the method for retrieving software version information to prevent version discrepancies caused by page caching.

### Bug Fixes

- Fixed an issue where heartbeat task startup failures prevented data synchronization tasks from starting properly.
- Resolved an issue where enabling SSL for MongoDB, a core system dependency,  led to API service failures.

## 3.21.0

### New Features

- Enhanced [Sybase](connectors/on-prem-databases/sybase.md)-to-PostgreSQL synchronization scenario, adding **index** migration and **sequence** synchronization features, further improving migration automation and ensuring sequence data consistency.

### Feature Optimizations

- Optimized the Oracle connection test feature, adding prompts for mismatched case sensitivity between username and schema to improve user experience.

### Bug Fixes

- Fixed the issue where webhook alerts configured by the admin user could not retrieve all alert data.
- Fixed the issue where shared data mining tasks initiated by the admin user could not be used properly by other users.

## 3.20.0

### New Features

- Added support for restricting [single-session login](system-admin/other-settings/system-settings.md#login) per account to enhance login security.

### Enhancements

- Operation logs now include user creation and permission management activities.
- Improved login failure messages for Active Directory (AD) integration to assist users in troubleshooting issues.
- Added the ability to download log files from the task monitoring page for easier fault diagnosis.
- Optimized engine startup to eliminate the need for MongoDB configuration during initialization.
- Expanded error code coverage and provided more detailed solution hints.

### Bug Fixes

- Fixed an issue where user access tokens were not refreshed properly after being updated.
- Fixed a problem where tasks synchronizing only primary key tables using regex continued to log "new table detected" after adding non-primary key tables.

## 3.19.0

### New Features

- In the **[Data Verification](operational-data-hub/fdm-layer/validate-data-quality.md)** task's advanced settings, a "**Custom Collate**" option has been added, allowing you to specify the sorting rules for both the source and target databases to ensure consistent character sorting during verification.

### Enhancements

- Optimized and added new engine error codes to help users quickly locate the cause of issues.

### Bug Fixes

- Fixed an issue where the system failed to start when configuring SSL connections for MongoDB as an intermediate database.
- Fixed an issue where data was not updated to the target during incremental synchronization when synchronizing Oracle tables with multi-column composite primary keys to GaussDB (DWS).
- Fixed an issue where the task incorrectly reported missing table creation privileges after synchronizing some tables to MySQL.
- Fixed a system error that occurred when viewing the source node list of a data mining task.
- Fixed an issue where the row count displayed in the real-time data platform's table details was inconsistent with the actual row count.

## 3.18.0

### Enhancements

- Added a built-in help documentation link at the top of the page, allowing quick access to usage guides in network-isolated environments.
- Improved data validation logic to support comparisons between Boolean values and numeric 0/1, ensuring accuracy in heterogeneous data source synchronization scenarios.
- Enabled copy all selected table names during task configuration, improving operational efficiency.
- Expanded the range of built-in error codes for better issue identification and diagnosis.
- Enhanced milestone tracking and display logic during task execution.
- Improved log viewing experience for script processing nodes by supporting split log display.

### Bug Fixes

- Fixed an issue where syncing PostgreSQL to SQL Server failed to sync newly added partitioned child tables if the parent table’s partitions were not created before task execution.
- Resolved an issue where MongoDB indexes were not correctly loaded, causing schema loading failures.
- Fixed an issue where data extraction tasks could get stuck at the table structure replication stage.

## 3.17.0

### New Features

- Added support for real-time synchronization of PostgreSQL partitioned tables to SQL Server.

### Enhancements

- Expanded the range of built-in error codes for faster issue identification and diagnosis.

### Bug Fixes

- Fixed an issue where resetting tasks on the edit page failed, causing a “current status not allowed” error when saving the task.
- Resolved an issue where removing and re-adding a table being synchronized in a replication task failed to resume synchronization correctly.

## 3.16.0

### New Features

- Added HTTPS connection support for [Elasticsearch data sources](connectors/on-prem-databases/elasticsearch.md), enhancing data transmission security to meet more stringent data security and compliance requirements.
- Enabled support for synchronizing tables without primary keys by adding a hash field (default name: `_no_pk_hash`), ensuring data consistency and stable synchronization in non-primary key scenarios.

### Enhancements

- Enhanced data filtering logic in Row Filter nodes, ensuring that target data is updated to maintain consistency when data status changes from meeting to not meeting filter conditions.
- Improved support for handling changes in composite primary keys in Oracle.

### Bug Fixes

- Fixed an issue preventing the display of all tables (completed, in progress, and not started) in full sync details.
- Corrected inaccuracies in time and milestone statistics.
- Resolved an issue with MongoDB Atlas functionality when DNS resolution fails.

## 3.15.0

### New Features

* Kafka-Enhanced and TiDB have passed the TapData certification testing process and have been upgraded to [Certified Data Sources](connectors/supported-data-sources.md), providing more advanced features and enhanced production stability.

### Enhancements

- Added a [Multi-threaded CT Table Polling](connectors/on-prem-databases/sqlserver.md#advanced-settings) option to improve incremental data collection performance for SQL Server environments with a large number of tables (over 500), significantly increasing synchronization efficiency.
- Optimized the cache management logic for processing nodes, enhancing resource usage efficiency and improving task execution speed.
- Introduced an automatic retry mechanism for Oracle LogMiner errors caused by exceeding PGA limits, improving fault tolerance.

### Bug Fixes

- Fixed an issue where, after enabling the heartbeat table, tasks displayed no delay but data was not synchronized.
- Fixed an issue where not all tags could be viewed when setting tags.
- Fixed an issue where the task retry start time was incorrectly displayed as 1970.
- Fixed an issue where index creation failed when Elasticsearch was used as the target database.
- Fixed an issue in verification tasks where a full re-verification was triggered when there was a discrepancy in the comparison results.
- Fixed an issue where the detailed download was empty when verification tasks showed inconsistent results in the associated key verification.

## 3.14.0

### New Features

* Doris, ClickHouse, KingBaseES-R6, PostgreSQL, SQL Server, and MongoDB have passed the TapData certification testing process and have been upgraded to [Certified Data Sources](connectors/supported-data-sources.md), providing more advanced features and enhanced production stability.
* Support for [user login authentication via LDAP](system-admin/other-settings/system-settings.md#ldap) integration with Active Directory (AD), enabling unified user identity management.
* When using PostgreSQL as a source, it is now possible to specify the time point for incremental data in task settings.

### Enhancements

* When configuring an Elasticsearch data source, the task setup now allows you to select an update strategy for data writing.
* For data replication tasks, the source node's table selection defaults to primary key tables, with an added prompt message.

### Bug Fixes

- Fixed an issue where tasks would encounter errors during the incremental phase after enabling the heartbeat table in new tasks.
- Fixed the issue where only one page of data validation tasks was displayed in the task list.
- Fixed the issue where tasks got stuck in the full phase and could not move to the incremental phase after a reset.
- Fixed the issue where the shared mining source node would automatically refresh and deselect tables after selection.

## 3.13.0

### New Features

* MySQL has passed the TapData certification testing process, upgrading it to a [certified data source](connectors/supported-data-sources.md), providing more comprehensive features and enhanced production stability.

### Enhancements

- Optimized the performance of the API monitoring page, significantly increasing access speed.
- Added a new sorting feature for mining tasks based on today's mined volume, making task management and filtering more convenient.

### Bug Fixes

- Fixed an issue where regular indexes were not properly synchronized after enabling the **Sync Indexes on Table Creation** option, ensuring data synchronization integrity.
- Fixed an issue where the `admin` user lost permissions after changing the username, ensuring proper permission management.
- Fixed an issue where a success message was returned despite the failure of sending test emails, improving operational feedback accuracy.

## 3.12.0

### New Features

- Oracle, Dameng, and Db2 have passed the TapData certification testing process and have been upgraded to [Certified Data Sources](connectors/supported-data-sources.md), offering richer features and higher production stability.
- When configuring [alert recipient email](case-practices/best-practice/alert-via-qqmail.md), support for using proxy services has been added, allowing for timely alert notifications even in restricted network environments.
- For [PostgreSQL](connectors/on-prem-databases/postgresql.md) data sources, incremental data synchronization is now supported using the walminer plugin, catering to more use cases.
- Data replication tasks now support reading from multiple tables simultaneously, improving parallel processing capabilities and task execution efficiency.
- Added support for batch API publishing, simplifying multi-interface management and enhancing publishing efficiency.

### Feature Enhancements

- Significantly enhanced data synchronization performance.
- Optimized the layout and structure of menu entries.
- Improved error messages and high-risk operation warnings.
- For data sources that do not support hash validation, hash validation is now disabled by default.
- After full sync tasks are completed, restarting the task will trigger a full resynchronization to ensure data consistency.

### Bug Fixes

- Fixed an issue where some task monitoring metrics were lost after task completion.
- Fixed a query efficiency issue caused by missing necessary indexes in the intermediate database, reducing data scan volume.
- Fixed an issue where selecting "Show only different fields" when downloading data validation discrepancies resulted in downloading all fields.
- Fixed an issue where the old engine name still appeared in task settings after changing the engine name in cluster management.
- Fixed a problem where task editing could get stuck during model generation, improving the task editing experience.
- Fixed possible OOM error problems with Agents, enhancing memory management and stability.
- Fixed an issue where full sync tasks in the cloud version sometimes got stuck in a running state, improving task execution smoothness.
- Fixed an issue where editing an API showed a duplicate name warning.
- Fixed an issue where, after stopping a data replication task in the incremental phase and restarting it, the full completion time displayed incorrectly.
- Fixed an issue with TDengine where SQL statement length exceeded limits when writing to super tables with many fields.
- Fixed an error occurring in data transformation tasks using TDengine as a source when the table name contained Chinese characters.
- Fixed potential exceptions when running mining tasks on PostgreSQL data sources.
- Fixed an issue in Oracle to Doris shared mining tasks where source table DDL events could not be parsed.
- Fixed issues with inserting and deleting operations when syncing Oracle to PostgreSQL for tables without primary keys, enhancing synchronization reliability.
- Fixed specific exception issues during the incremental phase of MongoDB to Kafka data transformation tasks.
- Fixed an issue where an unexpected `_id` field appeared in the model when synchronizing MongoDB oplog to Kafka.
- Fixed an issue where MongoDB oplog data replication tasks could not replicate properly during synchronization.

## 3.11.0

### New Features

- Added table name and API address display functionality in the [Service Management List Page](publish-apis/create-api-service.md), supporting quick search and filtering by keywords.
- Enhanced [Data Transformation Task Configuration](data-transformation/create-views/README.md) to support reloading of single table models in the source node model preview area, improving loading efficiency.
- Introduced time detection functionality that automatically detects the time difference between the engine deployment server and the database server and displays it on the task monitoring page.

### Enhancements

* User-defined field business descriptions can now be directly displayed in the column name position of the table sample data.

### Bug Fixes

- Fixed an "System error: null" issue that occurred after importing APIs.
- Fixed an issue where deleted APIs were still shown in the lineage graph.
- Fixed an issue where some table data counts in the real-time data platform were empty.
- Fixed an issue where the host was not displayed in the path when publishing APIs in the real-time data platform.
- Fixed an issue where MongoDB database cursor timeout prevented normal full synchronization.
- Fixed an issue where the custom SQL filter switch could not be turned on in the source node data filtering settings.

## 3.10.0

### New Features

- [Data Verification](operational-data-hub/fdm-layer/validate-data-quality.md) feature now allows downloading detailed discrepancy data from the verification task details page for in-depth analysis.
- Added a [Union Node](data-transformation/process-node.md#union-node) to data replication tasks, enabling the merging (UNION) of multiple tables within the same database. This is useful for data integration and analysis scenarios.
- [Doris](connectors/warehouses-and-lake/doris.md) data source now supports certificate-free HTTPS connections.
- MySQL, Oracle, OpenGauss, SQL Server, and PostgreSQL data sources now support enabling the **Hash Sharding** feature in the advanced settings of nodes during task configuration, significantly improving the full data sync speed for large tables.
- Added support for [VastBase](connectors/on-prem-databases/vastbase.md) data source, with a maturity level of Beta, further enriching the variety of data sources.

### Enhancements

- Improved synchronization logic for time zone fields.
- In data sync/development task settings, users can now choose the scheduling method as random scheduling or priority scheduling of Agents, in addition to tag-based Agent scheduling.
- Optimized the display logic of continuous log mining settings, automatically hiding related buttons if the database version does not support this feature.

### Bug Fixes

- Fixed an issue with incremental sync delay display in MongoDB sync tasks that used shared mining.
- Addressed the unclear error messages and lack of detailed information in the error codes when the source MySQL does not support incremental.
- Corrected the format of task warning alerts.
- Resolved an issue where imported tasks showed running records and the current running record status appeared as "deleting."
- Fixed an issue with incorrect display when renaming tables in FDM replication tasks.
- Addressed an issue where editing tasks incorrectly modified the association key when the target table association key was set.
- Fixed a potential failure when removing fields in Python nodes.
- Resolved an issue where deleting the primary node in master-slave merge operations caused configuration errors in the master-slave merge node, leading to task errors.
- Corrected an issue where creating an application in application management incorrectly prompted that the tag name already existed.
- Fixed garbled text issue with Chinese node names in tasks when a source-side DDL occurs and the engine server is not set to UTF character encoding.

## 3.9.0

### New Features

* [Data Verification](operational-data-hub/fdm-layer/validate-data-quality.md) now includes differential data repair capabilities, enhancing data consistency and accuracy.
* Added a new button for using CDC log Caching when creating [Live Cache](operational-data-hub/advanced/share-cache.md), simplifying cache task configuration and improving the efficiency and flexibility of cache sharing.

### Enhancements

* Optimized features in the [Real-Time Data Hub](operational-data-hub/plan-data-platform.md):
  * The data processing layer now displays all models in the database.
  * The platform cache layer and platform processing layer can be configured with different connections, which cannot be adjusted after setting.
  * Added an API publishing entry.
  * Improved the display of model details.
* Added field restriction configuration parameters for the ElasticSearch data source.
* Optimized exception handling logic when enabling the preimage capability for the MongoDB data source.

### Bug Fixes

- Fixed an issue where some task event statistics might occasionally be missing when reported.
- Fixed an issue where shared cache tasks without shared mining might encounter errors due to exceeding the log time window if data does not change upon restarting or upgrading the engine.
- Fixed an issue where disabling the slave node under the MDM_model led to task startup failures.
- Fixed an issue where the lineage graph in the real-time data hub occasionally failed to display.
- Fixed an issue where the unset operation on the source table could cause task errors in scenarios where the write mode is updating sub-documents.
- Fixed an issue where the verification task search function was unavailable.
- Fixed an issue where joining collections with time types in MongoDB and MySQL caused errors.
- Fixed an issue where tasks created in the real-time data hub could not add master-slave merge nodes.
- Fixed an issue where incremental update events unexpectedly performed lookups in master-slave merge scenarios.
- Fixed conflict errors when modifying columns in master-slave merge nodes.

## 3.8.0

### New Features

* Enhanced [TiDB](connectors/on-prem-databases/tidb.md) data source capabilities with support for real-time incremental synchronization.
* [Data Validation](operational-data-hub/fdm-layer/validate-data-quality.md) now supports automatic difference checking, allowing real-time tasks to automatically perform difference checks based on incremental delay.

### Enhancements

* Improved the display of primary keys and indexes in the task's table model.
* Enhanced the model deduction logic, supporting model deduction directly in the engine.

### Bug Fixes

* Fixed an issue where some exceptions were ignored during data source error handling.
* Fixed an issue where aggregation tasks using time fields as join keys could not backtrack data.
* Fixed an issue with delayed times in mining tasks.
* Fixed an issue where MySQL as a source would consume a large amount of database memory during initial synchronization of large tables.

## 3.7.0

### New Features

* Added support for [granting data verification permissions](system-admin/manage-role.md) to users, enhancing permission management granularity.
* Introduced Mock Source and Mock Target data sources for data migration testing scenarios.

### Enhancements

* Improved the interaction logic for skipping errors when starting tasks.
* Improved the loading speed of the connection list.

### Bug Fixes

* Fixed inconsistencies between the task runtime model and configuration model.
* Fixed inaccurate task event statistics after filtering source data.
* Fixed timezone handling issues in Oracle and PostgreSQL synchronization scenarios.
* Fixed an issue where heartbeat task reset failures could prevent related tasks from starting.

## 3.6.0

### New Features

* Added support for dynamically generating date suffixes for target table names when [configuring data transformation tasks](data-transformation/create-views/README.md#target-node-set), suitable for daily batch processing scenarios.
* Added support for [integrating with third-party platforms via Webhook](system-admin/other-settings/notification.md) to enable more alert notification channels.
* Added support for performing Hash validation between MySQL, Oracle, SQL Server, PostgreSQL, and GaussDB data sources when [configuring data validation tasks](operational-data-hub/fdm-layer/validate-data-quality.md), improving validation efficiency.
* Added support for setting partitions when configuring Doris data sources.
* Added support for the Oracle mode of OceanBase data sources, with the data source name OceanBase(Oracle).

### Enhancements

* Optimized data handling logic when syncing MongoDB to relational databases (e.g., MySQL).
* Enhanced the Dummy data source to support quickly adding large fields for performance testing scenarios.

### Bug Fixes

* Fixed an issue where MariaDB could not write data in the `0000-00-00 00:00:00` format to the target.
* Fixed an issue where heartbeat tasks could not automatically recover after the heartbeat table was mistakenly deleted.
* Fixed an issue where shared extraction tasks could not be serialized after an error occurred.

## 3.5.16

### New Features

* Support for bidirectional data synchronization between MySQL instances and between PostgreSQL instances, better meeting the needs of active-active and disaster recovery scenarios.
* Support for importing files from [MongoDB Relmig](https://www.mongodb.com/docs/relational-migrator/) version 1.3.0 and above, further enhancing ecosystem integration capabilities.
* Support for synchronizing MongoDB [Oplog](https://www.mongodb.com/docs/manual/core/replica-set-oplog/) (operation log) data.
* Support for filtering the time field of tables in the source node’s **[Advanced Settings](data-transformation/create-views/README.md#full-sql-query)** when configuring data transformation tasks (e.g., relative dates).
* Display milestone information for tasks on the [Task List](data-transformation/manage-task.md) page, helping users quickly understand key progress statuses.

### Enhancements

* Improved [Unwind Node](data-transformation/process-node.md#unwind) functionality, allowing users to set expansion modes, such as **Embedded Objects** or **Flatten Fields**.
* Enhanced full synchronization detail page display, supporting quick table name filtering.

### Bug Fixes

* Fixed an issue where adjusting alarm settings could affect normal task operations in certain scenarios.
* Fixed an issue where adding a new digging table caused the task to display digging task errors.

* Fixed an issue where tasks would still retrieve data from deleted shared cache tasks after being restarted.

## 3.5.15

### New Features

* [Data replication tasks](data-replication/create-task.md) now support table-level checkpoint resumption, allowing tasks to continue syncing from the last incomplete table upon restart.
* Added the ability to quickly [set task labels](data-transformation/manage-task.md) by dragging and dropping.
* Added support for MySQL replica architecture, ensuring tasks continue to sync data normally after a failover event.

### Bug Fixes

* Fixed an issue with Alibaba Cloud PolarDB MySQL data source, where tasks failed due to unsupported events.
* Fixed incorrect progress indicators in statistics for completed full replication tasks.

## 3.5.14

### New Features

* Support for [assigning labels](system-admin/manage-cluster.md) to **sync governance services** (Agents), allowing for subsequent assignment of tasks to agents with specific labels.
* Supported real-time log parsing for [TiDB data sources](connectors/on-prem-databases/tidb.md), meeting the needs for incremental data synchronization.
* During the full synchronization phase from Oracle to MySQL, support for syncing unique indexes and regular indexes that do not utilize functions.
* Added the ability to skip errors encountered during the last run when starting tasks.

### Enhancements

* Optimized the data synchronization task scenario, allowing source nodes to [configure DDL synchronization settings](case-practices/best-practice/handle-schema-changes.md) and specify DDL statements to ignore (based on regular expressions) in case of DDL errors.
* Enhanced data verification capabilities to support tasks that include processing nodes.
* Improved the data verification results page display, enabling quick filtering of consistent and inconsistent tables.

### Bug Fixes

* Fixed an issue where MongoDB used as external storage and storing keys with dots (.) in strings, and values as maps, caused exceptions.
* Fixed a loop error when performing connection tests on Kafka data sources containing non-JSON topics.
* Fixed an error that occurred during trial runs of JS nodes in specific scenarios.
* Fixed incorrect data issues caused by changing key values in master-slave merge nodes.
* Fixed an issue where using RocksDB as cache storage could cause task errors.

## 3.5.13

### New Features

* When [configuring data verification tasks](operational-data-hub/fdm-layer/validate-data-quality.md), custom filtering based on time fields is now available for MongoDB aggregation queries.
* Supported [hash verification](operational-data-hub/fdm-layer/validate-data-quality.md) for MySQL/Oracle homogeneous data source synchronization.

### Bug Fixes

* Fixed an issue where DDL operations could not be synchronized normally in multi-threaded synchronization scenarios.
* Fixed an occasional issue where file handles were not released in time when JS nodes printed logs.
* Fixed an issue with the import of MongoDB RM files.

## 3.5.12

### New Features

* Support for sending email reminders one week before the license expires (once a day), which can be combined with [configuring SMTP email services](case-practices/best-practice/alert-via-qqmail.md) to enhance operational convenience.
* New options in [DDL synchronization settings](case-practices/best-practice/handle-schema-changes.md): **Stop Task on DDL Error** and **Automatically Ignore All DDLs**, catering to different business scenario needs.
* Added a [time field injection](data-transformation/process-node.md#time_injection) node, allowing the addition of a custom timestamp field to data during synchronization. This provides a more flexible way to capture incremental changes from the source database.
* Support for setting the expiration time and size of engine logs, enabling automatic log cleanup.

### Enhancements

* Optimized task retry logic and interface prompt information.
* Enhanced the setting for incremental collection timing, supporting quick selection of the incremental time point from the last incremental run.
* Improved the interaction logic for using external storage with the master-slave merge node.



## V3.5.11

### New Features

- [Shared Mining](operational-data-hub/advanced/share-mining.md) functionality supports using RocksDB as local external storage for incremental log storage expansion.
- [TDengine Connector](connectors/on-prem-databases/tdengine.md) supports using multiple databases as incremental sources.

### Enhancements

- [Task Monitoring Page](data-replication/monitor-task.md) adds a time filter option for the incremental phase to quickly observe the RPS (Records Per Second) of the incremental phase.
- Added related prompt information for key operations that may affect the database (such as filtering source table data).

### Bug Fixes

* Fixed the issue where the final data does not match the expectation when the primary and secondary table key conditions change in [Primary-Secondary Merge Node](data-transformation/process-node.md#pri-sec-merged).

## V3.5.10

### New Features

* For data synchronization scenarios between MongoDBs, newly supports [Capped Collections](https://www.mongodb.com/docs/manual/core/capped-collections/).
* Data replication/transformation tasks support import capability. You can design the data flow process on [MongoDB Relational Migrator](https://www.mongodb.com/docs/relational-migrator/) and export it, then directly import it in the TapData data pipeline, enhancing the convenience of data pipeline design.

### Bug Fixes

* Fixed the issue where JS node model declaration settings showed an error in the task editing page.
* Fixed the issue where the DROP COLUMN operation was not properly synchronized when synchronizing from Oracle to MySQL.
* Fixed the problem of DDL errors when synchronizing from MySQL to ClickHouse.
* Fixed the issue of task instability caused by frequent reconnections of WebSocket.
* Fixed several UI interaction experience issues.

## V3.5.9

### New Features

* For MongoDB data sources version 5.x and above, newly supports [Time Series Collections](https://www.mongodb.com/docs/manual/core/timeseries-collections/).
* For MongoDB data sources version 6.x and above, newly supports [preImage](https://www.mongodb.com/docs/manual/changeStreams/#change-streams-with-document-pre--and-post-images).

### Bug Fixes

* Fixed the issue of inaccurate breakpoints in multiple table data replication scenarios.
* Fixed known UI interaction experience issues.

## V3.5.8

### New Features

- Newly supports [Azure Cosmos DB](connectors/cloud-databases/azure-cosmos-db.md) as a data source, capable of synchronizing full data from the source to help facilitate rapid data flow in the cloud.

### Enhancements

- Enhanced data source connection methods, [SQL Server](connectors/on-prem-databases/sqlserver.md) supports SSL connections to further enhance data security.
- Optimized the method of adjusting field types in [data replication tasks](data-replication/create-task.md); in addition to manual input, it now supports direct selection of common types from the target database.
- For the source node settings of the task, supports setting the number of records read per batch during the incremental phase to better meet the performance requirements of incremental synchronization.

### Bug Fixes

- Fixed the issue where the enhanced JS node model declaration did not take effect or showed an exception in specific scenarios.
- Fixed several UI interaction experience issues.

## V3.5.7

### New Features

- Supports loading table comments for [Oracle data sources](connectors/on-prem-databases/oracle.md#advanced), which can be enabled in the advanced options during data source configuration, allowing quick identification of tables' business meanings through comments.
- Supports deployment of TapData on [Windows platform](getting-started/install-and-setup/install-enterprise-edition.md), further expanding the range of supported deployment platforms.
- In the task operation [monitoring page](data-replication/monitor-task.md), supports viewing RPS (Records Per Second) information based on the dimension of event size.

### Bug Fixes

- Fixed the issue where incremental information was not successfully cleared after resetting the task and rerunning it.
- Fixed the issue where the incremental time point was displayed in scenarios of full data synchronization for some SaaS data sources.

## V3.5.6

### Enhancements

- Optimized [data source connections](connectors/README.md), with MySQL, PostgreSQL, Kafka, TiDB, MariaDB, etc., supporting SSL connections to further enhance data security.
- Enhanced the filtering function of [data verification](operational-data-hub/fdm-layer/validate-data-quality.md), supporting custom query and aggregation query filtering through SQL.
- Optimized interface interaction logic.
- For non-primary key update conditions, created a unique index to solve the problem of data duplication.

### Bug Fixes

- Fixed the issue where the table name contained `.` could lead to data synchronization failure.
- Fixed the problem where the task exception information did not include the table name.

## V3.5.5

### New Features

- Newly supports Hive3 as a target.
- When MongoDB is the target, newly supports [automatic creation of sharded collections](data-replication/create-task.md#advanced-settings).
- Newly added [Unwind Processing Node](data-transformation/process-node.md#Unwind), helping you efficiently "unwind" elements in an array, converting each element into a separate data row.
- When configuring tasks, newly supports the ability to disable nodes. Hovering over a node now offers this functionality, helping to reduce the cost of data flow in the process.

### Enhancements

- Optimized the setting of [published API scope](publish-apis/create-api-service.md#settings), allowing adjustments without needing to publish.
- When [configuring data replication tasks](data-replication/create-task.md), the **selectable table range** dropdown box allows quick filtering of tables with or without primary keys, where tables with primary keys include those without primary keys but with unique indexes.

### Bug Fixes

- Fixed the issue where the MongoDB target encountered an error in INSERT operations when no sharding key was found.
- Fixed the problem where MongoDB does not support REPLACE, meaning that fields deleted by REPLACE could not be properly removed.

## V3.5.4

### New Features

- Added [building materialized views](data-transformation/create-views/using-imv-guide.md) feature, enabling quick construction of real-time data models.
- Added support for configuring source nodes of [shared mining](operational-data-hub/advanced/share-mining.md) tasks, including settings for enabling **incremental multi-threaded writing** and **supplementing updated data with complete fields**.
- Kafka data source added support for [setting the number of replicas and partitions](case-practices/pipeline-tutorial/oracle-to-kafka.md).
- Added support for the `$unset` operation during synchronization between MongoDB instances.

### Enhancements

- [Data verification](operational-data-hub/fdm-layer/validate-data-quality.md) feature field filtering experience optimization.
- Supported quick node targeting at the top of the data replication/data transformation configuration page through node search.

## V3.5.2

### New Features

* Added [Python Processing Node](data-transformation/process-node.md#python), supporting custom data processing logic through Python scripts, offering performance improvements compared to JS processing nodes.
* Added support for data synchronization between Redis instances.

### Enhancements

* Enhanced [data source error codes](platform-ops/troubleshooting/error-code.md), covering more scenarios and providing solutions.

## V3.5.1

### New Features
- Now when [creating a role](system-admin/manage-role.md), it supports the granular granting of functional and data rights.

### Enhancements
- Enhanced the UI prompts and guidance when setting up core data sources like PostgreSQL, Redis, etc.
- Improved test scenarios when using MongoDB as external storage.

### Bug Fixes
- Resolved an issue where users were unable to access the run-monitoring page for executed tasks.

---

## V3.4

### New Features
- When task configurations are set for full + incremental sync, there's now support to turn on the [scheduled periodic task feature](data-replication/create-task.md#task-attr). The task will automatically stop, reset, and run again at the set time.
- For the [add/remove field node](data-transformation/process-node.md#add-and-del-cols), field order adjustment is now supported.
- A new feature to [dynamically adjust memory](data-replication/create-task.md#task-attr) has been introduced (enabled by default). During the full synchronization phase, it identifies memory usage and auto-adjusts the memory queue, effectively preventing memory overflow scenarios.
- The data panel has been renamed to the [Real-time Data Center](operational-data-hub/plan-data-platform.md), with added guidance on usage and task creation.
- Introduced a target write strategy, where if an update event does not exist, it can be written to a local log.

### Enhancements
- Data validation usability and UI interactions have been enhanced.
- Error code implementation for the MongoDB data source has been added.
- Optimized the incremental delay metric on the run-monitoring page, using the task's incremental delay warning threshold as the Y-axis data source.
- Enhanced the display of sample data.

### Bug Fixes
- Fixed task count limits in the engine specs.
- Resolved an issue where MongoDB showed unsupported error prompts when used with custom SQL as the target.
- Fixed an issue where, after turning on automatic periodic scheduling for a task, if auto-reset fails, the task won't attempt a reset in the next cycle and won't be scheduled to run.

---

## V3.3

### New Features
- [Kafka data source](connectors/mq-and-middleware/kafka.md) now supports custom message body formats.
- Added the [API interface documentation export feature](publish-apis/create-api-service.md#release330-export-api) to help teams quickly establish and enhance API usage documents.
- Shared mining functionality supports [configuring task alerts](operational-data-hub/advanced/share-mining.md#release330-alert), allowing alerts via system notifications or emails for better task monitoring.
- The [data validation function](operational-data-hub/fdm-layer/validate-data-quality.md) allows setting data filters, enabling validation of specific conditional data only, reducing validation scope and increasing efficiency.
- In data service platform mode, when dragging a data table to the platform cache layer to generate a task, it supports [setting the synchronization type of the task to be full or incremental](operational-data-hub/set-up-odh.md).

### Enhancements
- Introduced [rolling upgrades](platform-ops/operation.md#release330-upgrade), which, compared to the downtime upgrade method, further reduces business impacts.
- Post-error in [shared mining tasks](operational-data-hub/advanced/share-mining.md), associated tasks now include alert prompts.
- In the [row filter processing node](data-transformation/process-node.md), added usage examples when filtering with the DATE type.
- [Time operation node](data-transformation/process-node.md#date-calculation) now displays adjusted fields.
- Optimized algorithm for estimating remaining time for full synchronization.
- Field processing nodes now support one-click copy and paste for configurations.

### Bug Fixes
- Fixed an issue where launching TM without setting the java environment variable would prevent it from starting, adding log output for this issue.
- Addressed a problem where the admin user, after changing the username in the personal center, could not view any menus.
- Fixed an issue in data replication where, during task creation, all data sources did not support DDL.
- Resolved a problem in data replication tasks, where during node configuration, adding a prefix or suffix would reload after each character input.



## V3.2

### New Features

- In the data platform mode, it can directly display the relationship of table-level traceability, helping you to visually show the link relationship of data tables.
- In the data platform mode, it supports deleting tables from the platform processing layer.
- When configuring the target node of a task, it supports [adjusting field length by a coefficient](data-replication/create-task.md#release320-col-length) to avoid data write failures due to different character encodings.
- [Data verification](operational-data-hub/fdm-layer/validate-data-quality.md) feature supports SelectDB data source.
- In scenarios where Redis is the target node, and data is stored in List or Hash format with a single key, it [supports writing the source table schema into a Hash key](case-practices/pipeline-tutorial/mysql-to-redis.md) (default name is `-schema-key-`). The value is used to store the source table's table name and column name information.
- Added [**type filter**](data-transformation/process-node.md#release320-type-filter) processing node, which can quickly filter columns of the same type. Filtered fields will not be passed to the next node.
- **Field editing** processing node supports conversion between snake_case and camelCase naming.
- Data copy tasks, data conversion tasks, data panels, and caching creation support [displaying table description information](data-replication/create-task.md#310-table-model), defaulting to table comment information.

### Enhancements

- Product menu adjustments: data development is renamed to [data conversion](data-transformation/README.md). Some functions have been moved to [advanced settings](operational-data-hub/advanced/manage-function.md) (e.g., shared cache).
- Improved interaction for tables without primary keys, e.g., [support for filtering non-primary key tables and adding primary key table identification](data-replication/create-task.md#310-table-model) when configuring data copy tasks.
- For external storage configurations of MongoDB data sources, [connection testing capability](operational-data-hub/advanced/manage-external-storage.md#320-external-storage) has been added.
- When creating a new external storage and choosing MongoDB, it supports [using SSL connections](operational-data-hub/advanced/manage-external-storage.md#320-external-storage).
- Creating an HttpReceiver data source now [supports script trial runs](connectors/others/http-receiver.md) and [access authentication functionality](connectors/others/http-receiver.md).
- Standard JS node capabilities adjusted, adding [Linked HashMap data structure](appendix/standard-js.md#linkedhashmap) and [context.global object](appendix/standard-js.md#global).
- **Field editing** processing node's UI interaction has been improved.
- Redundant prompts for task startup and schema reload have been optimized.
- Data copy tasks support manually adding new tables. New tables can achieve full + incremental data synchronization.
- Improved user experience and interaction for data verification.
- Optimized task node configuration processing logic.
- In the data panel's **platform cache layer** and **data processing layer**, you can display connection and table information generated by data copy/transfer tasks.
- In the data directory mode of the data panel, you can add description information for tables and fields.
- Optimized deployment flow and prompts for TapData.
- TapData launcher optimization: restarting the service does not require re-registering the data source.
- When starting and stopping the Agent node, PDK registration is automatically stopped.
- Overall optimization of interaction for data copy and data conversion task configuration.

### Bug Fixes

- Fixed 2 issues where specifying different external storage for Oracle data sources resulted in external storage not being user-specified after merging.
- Fixed an issue where turning on shared mining for import task data sources made external storage configuration display as id and unmodifiable.
- Fixed a task merging issue from the data source to the platform cache layer.

## V3.1

### New Features

- Data panel functionality now supports table-level traceability capabilities. You can view data lineage relationships through table details.
- When [configuring data copy tasks](data-replication/create-task.md#310-table-model), you can view the table model in the processing node.
- Supports publishing API data services based on Doris data source [Release API Data Services](publish-apis/create-api-service.md).
- [Cluster management](system-admin/manage-cluster.md) page allows downloading thread resource monitoring and data source usage data.

### Enhancements

- Shared mining task management improved, supporting [starting/stopping mining tasks for individual tables](operational-data-hub/advanced/share-mining.md#release310-share-mining).
- [Shared cache](operational-data-hub/advanced/share-cache.md), [functions](operational-data-hub/advanced/manage-function.md), [API data services](publish-apis/create-api-service.md) support import/export functions.
- [Data verification](operational-data-hub/fdm-layer/validate-data-quality.md) supports configuring alert rules and notification methods.
- Auto-fill table logic for [data verification](operational-data-hub/fdm-layer/validate-data-quality.md) has been optimized.
- Frontend added explanations for the distinction between [standard JS](appendix/standard-js.md) and [enhanced JS](appendix/enhanced-js.md).
- JS processor standardization, JS usage, and trial run have been restructured.
- In all processing nodes supporting JS scripting, typing `record.` automatically prompts for the current model's field names.
- Resolving timeout issues caused by clearing external storage data during a reset has been optimized.
- Support for modifying primary keys.
- Supports setting the default interval for incremental synchronization tasks via scripting.
- License optimization: Binding to IP addresses prevents hardware changes from invalidating the License.
- Enhanced usage prompts for Excel data sources.
- Performance enhancements:
  - **JS Node** processing performance improved.
  - **Field processing** node processing performance improved.
  - **Master-slave merge** node performance improved.
  - **Field editing** node frontend display optimization in multi-field scenarios.
- Optimized data type boundary prompts and handling logic.
- Connection management filter bar database type dropdown supports search and clear selection.
- Error code pop-ups now offer a one-click copy feature for the error stack.

### Bug Fixes

- Fixed issues with incremental metrics lacking incremental time points for polling sources.
- Fixed an issue where model changes forcibly delete updated fields.
- Fixed node configuration issues for type modification, field addition/deletion, and field renaming; configurations are reset when loading the model.
- Fixed errors occurring when turning on the full custom switch and the target is MongoDB.



## V3.0

### New Features

- [Integrated GraphQL capability](publish-apis/query/query-via-graphql.md), enriching API query methods.
- Added [application categorization capability for APIs](publish-apis/create-api-service.md), facilitating categorization based on business.
- Introduced [time calculation processing node](data-transformation/process-node.md#time-calculation) for flexible handling of discrepancies in source and destination database time zones.
- Introduced [full-scale partitioning capability](case-practices/best-practice/full-breakpoint-resumption.md), currently only supported for MongoDB.

### Enhancements

- [Shared cache function](operational-data-hub/advanced/share-mining.md) improved, offering an observable page to monitor mining progress and troubleshoot failures.
- [Full custom query function](data-transformation/create-views/README.md#full-sql-query) relaxed the restriction of only using JS nodes, now allowing the addition of other processing nodes with the node model directly utilizing the source table's model.
- The field [processing node](data-transformation/process-node.md) supporting operations like adding/deleting fields, type modifications, and renaming fields now includes a field search function.
- Adjusted wording for Schema loading frequency configuration in connection settings.
- Optimization of table name modification logic in the **Table Editing Node**; removed the apply button for direct configuration effectiveness.
- During the startup of the management process (frontend), it now includes heapDump and stackTrace parameters, similar to the synchronization governance process.
- Introduced task editing versioning to prevent overwriting of higher-version configurations by lower versions when multiple users edit the same task.
- Documentation on the right side of the data source configuration now supports image enlargement.
- Implementation of error codes for Oracle data sources.

</TabItem>
</Tabs>