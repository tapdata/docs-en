# Explore FDM Table Details

Explore comprehensive details for any table in the Platform Cache (FDM Layer), including metadata, schema, related tasks, and data lineage—all designed to help you manage synchronized data with confidence.

## Procedure

1. Log in to TapData Platform.

2. In the left sidebar, select **Real-time Data Center**.

3. On this page, you’ll see a clear overview of all tables currently synchronized into the **Foundation Data Model (FDM Layer)**.

   ![View table in FDM](../../images/view_table_in_fdm.png)

4. Click the name of the table you want to inspect. This opens a detailed view with the following sections:

   - **Overview**: See essential metadata for your table—including size, row count, column types, column comments/descriptions (by default sourced from your schema), and sample data.

     You can also edit the business description of the table or individual fields here. This lets you assign clear, meaningful names and notes that make it easier for teams to understand, identify, and manage data in future workflows.

     ![Overview](../../images/table_overview_in_fdm.png)

   - **Schema**: View detailed column definitions including types, primary keys, foreign keys, and default values.

     ![Schema Info](../../images/schema_in_fdm.png)

   - **Tasks**: Review all replication tasks associated with this table, along with their current statuses. Click any task name to open its detailed monitoring page with metrics like sync performance, incremental delay, and logs. For more details, see [Monitor Tasks](../../data-transformation/monitor-view-tasks.md).

     ![Related Tasks](../../images/related_task_in_fdm.png)

   - **Lineage**: Visualize data lineage as an interactive graph. This helps you track and manage data quality across your pipelines. Clicking a task node in the lineage view will take you directly to its monitoring page.

     ![Lineage Info](../../images/lineage_for_fdm.png)

## Trace record lineage

For tables in the Platform Cache (FDM Layer) or Processing Layer (MDM Layer), you can trace a specific business record across upstream and downstream tables. Use this feature to review how the record moves between source, FDM, and MDM tables and to inspect field-level changes at each node.

To trace a record:

1. Open the table details page for an FDM or MDM table.

2. In the upper-right corner, click **Data Lineage Tracing**.

   ![Data lineage tracing entry](../../images/data_lineage_tracing_entry.png)

3. Set the data filter condition. In **Builder** mode, select the field, operator, and value. You can also switch to **MQL JSON** mode and write the query condition directly.

4. In **Select fields to trace in data lineage**, add the fields you want to focus on.

5. Click **Trace**.

6. Review the tracing result:

   ![Data lineage tracing result](../../images/data_lineage_tracing_result.png)


   - **Lineage graph**: The left side of the page shows related tables and their upstream and downstream relationships. Click a table node to view its details.
   - **Change details**: The right side of the page lets you query data changes for the selected node by time range. Switch between **JSON** and **Change Log** views to compare field values before and after a change.


    :::tip

    Data Lineage Tracing depends on data lineage and traceable change records in the Operational Data Hub. If no result is returned, check whether the filter condition matches existing data, related tasks have run and generated change records, and your account has permission to view the Operational Data Hub and data lineage.

    :::
