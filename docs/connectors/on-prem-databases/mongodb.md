---
keywords:
- MongoDB real-time sync
- MongoDB data integration
- MongoDB CDC
- NoSQL data integration
- MongoDB data migration
- Tapdata MongoDB connector
---

# MongoDB



[TapData](https://tapdata.io/) supports [MongoDB](https://www.mongodb.com/) (4.0 and above) as a data source, enabling real-time CDC sync, incremental replication, and flexible pipeline building.

MongoDB is a popular open-source NoSQL database designed for flexible and scalable data storage. This document explains how to connect MongoDB in TapData, supporting real-time CDC synchronization and incremental replication. MongoDB can be used as a source or target to build data pipelines for real-time processing, denormalization, migration, and disaster recovery.

<Head>
    <link rel="canonical" href="https://docs.tapdata.io/prerequisites/on-prem-databases/mongodb" />
</Head>


```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Supported Versions and Architectures

| Category     | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| Version      | MongoDB 4.0 and above. For MongoDB 3.4 and below, please choose the data source named **MongoDB Below 3.4**. |
| Architecture | ● As a source: Supports replica set and sharded cluster architectures. Additionally, full and incremental data synchronization can be performed from the secondary nodes of a sharded cluster.<br />● As a target: Supports single node, replica set, and sharded cluster architectures. |

## Supported Data Types

| Category            | Data Types                       |
| ------------------- | -------------------------------- |
| Strings and Code    | String, JavaScript, Symbol       |
| Numeric Types       | Double, Int32, Int64, Decimal128 |
| Document and Array  | Document, Array                  |
| Binary and ObjectId | Binary, ObjectId                 |
| Boolean Type        | Boolean                          |
| Date and Timestamp  | Date, Timestamp                  |
| Special Types       | Min Key, Max Key, Null           |

## SQL Operations for Sync

**DML**: INSERT, UPDATE, DELETE

:::tip

When MongoDB is used as a target database, you can select the write strategy through the advanced settings of the task node: in case of insert conflicts, you can choose to convert to an update or discard the record; in case of update failures, you can choose to convert to an insert or just log the issue.

:::

## Prerequisites

### As a Source Database

1. Make sure that the schema of the source database is a replica set or a sharding cluster. If it is standalone, you can configure it as a single-member replica set to open Oplog. For more information, see [Convert a Standalone to a Replica Set](https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/).

2. To ensure sufficient storage space for the Oplog, it is important to configure it to accommodate at least 24 hours' worth of data. For detailed instructions, see [Change the Size of the Oplog](https://docs.mongodb.com/manual/tutorial/change-oplog-size/).

3. Create a sync or data development account with read access to the source database and the `clusterMonitor` role for data validation. Choose the access scope below.

   For MongoDB 4.0 or later, incremental sync uses Change Streams and requires `find` and `changeStream`. The built-in `read` and `readAnyDatabase` roles below include both privileges. Custom roles must grant both on all non-system collections in the source database, in addition to other required read privileges.

   ```mdx-code-block
   <Tabs className="unique-tabs">
   <TabItem value="Grant Read Access to Specific Databases">
   ```
   ```sql
   use admin
   db.createUser(
     {
       user: "tapdata",
       pwd: "my_password",
       roles: [
          { role: "read", db: "database_name" },
          { role: "read", db: "local" },
          { role: "read", db: "config" },
          { role: "clusterMonitor", db: "admin" },
       ]
     }
   )
   ```
   </TabItem>

   <TabItem value="Grant Read Access to All Databases">

   ```sql
   use admin
   db.createUser(
     {
       user: "tapdata",
       pwd: "my_password",
       roles: [
          { role: "readAnyDatabase", db: "admin" },
          { role: "clusterMonitor", db: "admin" },
       ]
     }
   )
   ```
   </TabItem>
   </Tabs>

   **Document preimage permissions**

   For new source nodes running MongoDB 6.0 or later, **Document Preimages** is enabled by default. Grant the sync account the `collMod` privilege, or have a DBA enable preimages on the collections in advance.

   ```mdx-code-block
   <Tabs className="unique-tabs" defaultValue="tapdata-auto">
   <TabItem value="tapdata-auto" label="Grant collMod privileges">
   ```

   Have an administrator run the following commands to grant `collMod` to the sync account. This example uses the `tapdata` account created in the `admin` database. Replace the database name and username.

   ```javascript
   use admin

   db.createRole({
     role: "tapdataPreImageRole",
     privileges: [
       {
         resource: { db: "database_name", collection: "" },
         actions: ["collMod"]
       }
     ],
     roles: []
   })

   db.grantRolesToUser(
     "tapdata",
     [{ role: "tapdataPreImageRole", db: "admin" }]
   )
   ```

   The example covers all non-system collections in the specified database. To limit access to specific collections, replace the empty `collection` value with a collection name. For multiple databases or collections, add entries to `privileges`.

   </TabItem>

   <TabItem value="dba-preconfigured" label="Have a DBA enable preimages">

   Have a DBA with `collMod` privileges run this command for each existing collection to sync. Replace the database and collection names:

   ```javascript
   use database_name

   db.runCommand({
     collMod: "collection_name",
     changeStreamPreAndPostImages: { enabled: true }
   })
   ```

   The sync account needs `listCollections` on the source database to check the preimage setting. The built-in roles above include this privilege. The account does not need `collMod`.

   Run this check as the sync account. The result must be `{ enabled: true }`:

   ```javascript
   use database_name

   db.getCollectionInfos({ name: "collection_name" })[0].options.changeStreamPreAndPostImages
   ```

   A DBA must also enable preimages on new or recreated collections.

   </TabItem>
   </Tabs>

   :::tip

   For a sharded source cluster, create the sync account and grant its privileges on each shard's primary node. For details, see MongoDB's [Change Streams](https://www.mongodb.com/docs/manual/changestreams/), [collMod command](https://www.mongodb.com/docs/manual/reference/command/collmod/), and [built-in roles](https://www.mongodb.com/docs/manual/reference/built-in-roles/?deployment-type=self).

   :::

4. When the source database is a cluster, in order to improve data synchronization performance, TapData Cloud will create a thread for each shard and read the data. Before configuring data synchronization/development tasks, you also need to perform the following operations.

5. For sharded cluster architectures, to improve data synchronization performance, TapData will create a thread for each shard to read data. Before configuring data synchronization/development tasks, you also need to perform the following operations:

   1. [Stop the Balancer](https://www.mongodb.com/docs/manual/reference/method/sh.stopBalancer/) to avoid data inconsistency caused by chunk migrations.
   2. [Clean up orphaned documents](https://www.mongodb.com/docs/manual/reference/command/cleanupOrphaned/) to avoid _id conflicts.

### As a Target Database

Grant write role to specified database (e.g. demodata) and **clusterMonitor** role for data validation, e.g.:

```bash
use admin
db.createUser(
  {
    user: "tapdata",
    pwd: "my_password",
    roles: [
       { role: "readWrite", db: "demodata" },
       { role: "clusterMonitor", db: "admin" },
    ]
  }
)
```

## Connect to MongoDB

1. Log in to TapData platform.

2. In the left navigation bar, click **Connections**.

3. Click **Create** on the right side of the page.

4. In the pop-up dialog, search and select **MongoDB**.

5. On the redirected page, fill in the MongoDB connection information as described below.

   ![MongoDB Connection Example](../../images/mongodb_connection.png)

   * **Connection Settings**
      * **Name**: Fill in a unique name that has business significance.
      * **Type**: Supports MongoDB as a source or target database.
      * **Connection Mode**: Choose how you want to connect:
         * **URI Mode**: After selecting this mode, you will be required to provide the necessary information for the database URI connection. The connection string should include the username and password, which are concatenated in the format. For example, the connection string may look like: `mongodb://admin:password@192.168.0.100:27017/mydb?replicaSet=xxx&authSource=admin`.
         * **Standard mode**: After selecting this mode, you need to fill in the database address, name, account number, password and other connection string parameters.
   * **Advanced Settings**
      * **Use TLS/SSL Connection**: Choose according to your business needs:
        * **TLS/SSL Connection**: TapData will connect to a separate server in the network that provides a [TLS/SSL channel](https://www.mongodb.com/docs/manual/core/security-transport-encryption/) to the database. If your database is located in an inaccessible subnet, try this method and upload the client private key file, provide the private key password, and choose whether to validate the server certificate.
        * **Direct Connection**: TapData Cloud will connect directly to the database and you need to set up security rules to allow access.
      * **Number of Sampling Records for Loading Model**: Specifies the number of records to sample when loading the schema to ensure that the generated schema structure matches the source data. Default is **1000**.
      * **Fields Load Limit For Each Collection**: Limits the maximum number of fields loaded per collection to avoid slow schema generation due to excessive fields. Default is **1024**.
      * **CDC Log Caching**: [Mining the source database's](../../operational-data-hub/advanced/share-mining.md) incremental logs, this feature allows multiple tasks to share incremental logs from the source database, avoiding redundant reads and thus significantly reducing the load on the source database during incremental synchronization. Upon enabling this feature, an external storage should be selected to store the incremental log.
      * **Contain Table**: The default option is All, which includes all tables. Alternatively, you can select Custom and manually specify the desired tables by separating their names with commas (,).
      * **Exclude Tables**: Once the switch is enabled, you have the option to specify tables to be excluded. You can do this by listing the table names separated by commas (,) in case there are multiple tables to be excluded.
      * **Agent Settings**: Defaults to Platform automatic allocation, you can also manually specify an agent.
      * **Model Load Time**: If there are less than 10,000 models in the data source, their schema will be updated every hour. But if the number of models exceeds 10,000, the refresh will take place daily at the time you have specified.
      * **Enable Heartbeat Table**: When the connection type is **Source&Target** or **Source**, you can enable this switch. TapData will create a _tapdata_heartbeat_table heartbeat table in the source database and update it every 10 seconds (requires appropriate permissions) to monitor the health of the data source connection and tasks. The heartbeat task starts automatically after the data replication/development task starts, and you can view the [heartbeat task](../../case-practices/best-practice/heart-beat-task.md) in the data source editing page.
   
6. Click **Test**. Once it passes, click **Save**.

   :::tip

   If the connection test fails, please follow the prompts on the page to troubleshoot and resolve the issue.

   :::

## Node Advanced Features

When configuring data synchronization or transformation tasks with Mongo

DB as the source or target node, TapData provides more advanced features to better meet complex business needs and maximize performance. You can configure these features based on your requirements:

![MongoDB Node Advanced Features](../../images/mongodb_node_advanced_settings.png)

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="MongoDB as a Source Node">
```

| **Configuration**                  | **Description**                                              |
| ---------------------------------- | ------------------------------------------------------------ |
| **Document Preimages**             | Available only for MongoDB 6.0 or later and enabled by default for new source nodes. Reads documents as they existed before an update, replacement, or deletion. For required privileges, see [Source prerequisites](#as-a-source-database). Cannot be enabled together with **Filling Modified Data**. |
| **Filling Modified Data**          | Disabled by default for MongoDB 6.0 or later; enabled by default for earlier versions. Fills in complete fields for **UPDATE** events. Cannot be enabled together with **Document Preimages**. |
| **Skip Deleted Events On Filling** | Enabled by default. Disabling this feature may cause incremental data issues in the following cases: tasks using non-`_id` fields for business logic; source field type is a sub-document and its attributes are modified; source field type is an embedded array and the `PULL` operation is executed. |
| **No Cursor Timeout**              | Disabled by default. When enabled, MongoDB will disable cursor timeout to prevent timeout errors during data synchronization. |
| **Write Concern**                  | Sets the [write concern level](https://www.mongodb.com/docs/manual/reference/write-concern/). In a sharded cluster, `mongos` will pass the write concern to the shards. The default value is **w1**. Options are as follows:<br />●  **w0 / Unacknowledged**: Does not wait for write acknowledgment. Fastest, but cannot confirm whether the write was successful.<br />●  **w1 / Acknowledged**: Acknowledges successful write to the primary node. Suitable for most scenarios, balancing performance and safety.<br />●  **w3**: Acknowledges successful write to 3 nodes, increasing data safety.<br />●  **majority**: Acknowledges successful write to most nodes. High security, but may impact performance if there are many nodes. |


</TabItem>

<TabItem value="MongoDB as a Target Node">

| **Configuration**                     | **Description**                                              |
| ------------------------------------- | ------------------------------------------------------------ |
| **Sync Index**                        | Disabled by default. When enabled, indexes from the source database will be automatically synchronized to the target database during the full data synchronization phase. |
| **Save Deleted Data**                 | Disabled by default. When enabled, deleted data content will be cached.<br/> <br />Since MongoDB delete events only return the `_id` by default, if the sync condition for the target database (e.g., MySQL) does not include `_id`, the delete operation may fail. In this case, you can first sync the source table **A** to an intermediate table **A_COPY** (using `_id` as the update condition and enabling this option), then create a new task to sync from **A_COPY** to the target table **B**.<br/> <br />**Note**: If **Document Preimages** is enabled on the source side, delete events can be synced directly without needing an intermediate task. |
| **Time-Series Collection Attributes** | Disabled by default. When enabled, during synchronization between MongoDB 5.0 and above, time-series collections and their attributes can be synchronized. |
| **Write Concern**                     | Sets the [write concern level](https://www.mongodb.com/docs/manual/reference/write-concern/). In a sharded cluster, the `mongos` service will pass the write concern to the shards. The default value is **w1**. Options are as follows:<br />●  **w0 / Unacknowledged**: Does not wait for write acknowledgment. Fastest, but cannot confirm whether the write was successful.<br />●  **w1 / Acknowledged**: Acknowledges successful write to the primary node. Suitable for most scenarios, balancing performance and safety.<br />●  **w3**: Acknowledges successful write to 3 nodes, increasing data safety.<br />●  **majority**: Acknowledges successful write to most nodes. High security, but may impact performance if there are many nodes. |
| **Sync Partition Properties**         | Disabled by default. When enabled, sharding attributes are kept consistent during synchronization between MongoDB sharded clusters. |

</TabItem>
</Tabs>
