# Replicate Data from Sources

Learn how to set up real-time data replication from your source systems into the FDM (Platform Cache) layer using Tapdata’s flexible, CDC-powered engine. This ensures your business always works with fresh, reliable data—without burdening production databases.

## Why Use the FDM Layer?

The FDM (Federated Data Management) layer acts as a high-performance, real-time cache for your most critical business data.

- Decouples analytics and downstream processes from production databases
- Boosts security and performance by limiting access to sensitive source systems
- Enables scalable, flexible data delivery for multiple teams and use cases

Tapdata’s replication is powered by **Change Data Capture (CDC)** technology, allowing you to sync data with low latency and minimal impact on source systems. Tapdata supports a wide range of popular databases and cloud data sources—so you can unify your data, no matter where it lives.

## Prerequisites

- ODH mode is enabled in Tapdata
- Source and target connections (e.g., your production database and MongoDB) are configured and working
- You have the necessary permissions to create replication tasks

## Procedure

1. [Log in to TapData Platform](../user-guide/log-in.md).

2. In the left sidebar, select **Real-time Data Center**.

3. On this page, you’ll see all connected data sources, displayed across four platform layers for clear governance and data flow management.

    For details on each layer, see [ODH Architecture Overview](https://docs.tapdata.net/user-guide/real-time-data-hub/daas-mode/enable-daas-mode).

4. In the **Source Data Layer**, find the database and tables you want to replicate.
    Or use the <img src='/img/search_icon.png'></img> icon to search, then drag the desired table(s) to the **Platform Cache Layer**.

5. In the configuration dialog, set a **table prefix** and choose the replication mode (**full** or **incremental**).
    
    Tapdata automatically generates the FDM-layer naming pattern for you, which typically includes the `FDM_` prefix plus your table name.
     Here you can add your **source system identifier** to make it easier for business teams to recognize the origin of the data.
    
    For more naming best practices, see [Plan Your Operational Data Hub](../replicate-data.md).
    
6. Click **Save & Run** to immediately start the replication.
    
    Tapdata will create and launch a real-time replication task, continuously syncing your selected tables to the FDM layer with built-in validation.
    
    To monitor the task, click the <img src='/img/detail_icon.png'></img> icon next to the table name in the Platform Cache. This opens the job monitoring page with live status and performance metrics.
    
6. Tapdata will automatically create and launch a real-time replication task, copying data to the FDM layer and validating it.
    To monitor the job, click the <img src='/img/detail_icon.png'></img> icon next to the table name in the Platform Cache—this takes you to the job monitoring page for live status and stats.
    
    **Need more control?**
    If you want to adjust advanced options—like read concurrency, batch size, hash-based sharding (for splitting large tables during full sync), or index replication—click **Save Only** instead of **Save & Run**.
    After saving, locate your new task in the list, click its name, and configure these settings before running it.

## Next Step

[Data Validation](validate-data-quality.md)