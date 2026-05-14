# Monitor Data Transformation Task



After you start a data transformation task, TapData automatically redirects you to the task monitoring page. You can use this page to check runtime details such as Agent status, synchronization status, task progress, and alert settings. You can also review the overall task status from the task list before opening a specific task for details.


:::tip

You can also open the monitoring page by clicking **Monitor** on the task list page.

:::


## Task List Metrics

On the **Data Transformation** task list page, use filters such as **Task Status**, **Sync Type**, **Task Milestone**, **Agent Name**, and **Task Name** to find tasks. You can also click **Display Settings** to adjust the columns shown in the list. The following table describes the common fields:

| Field | Description |
| --- | --- |
| **Task Name** | The display name of the task. You can search tasks by this field. |
| **Task Status** | The current task status, such as Editing, Running, Stopped, or Failed. |
| **Sync Type** | The task synchronization type, such as full, incremental, or full + incremental. |
| **Task Milestone** | The current execution stage, which helps you determine whether the task is initializing, running full synchronization, running incremental synchronization, or processing another stage. |
| **Incremental Delay** | The time between when an event is generated at the source and when the task finishes processing it. Use this metric to identify incremental backlog. |
| **Last Event Time** | The latest source event time processed by the task. The closer this time is to the current time, the more up to date incremental processing is. |
| **Last Run Time** | The most recent time when the task was started. |
| **Create Time** | The time when the task was created. |
| **Update Time** | The most recent time when the task configuration or status was updated. |
| **Available Operation** | Operations available for the task, such as Start, Edit, Monitor, Reset, Copy, and Delete. The available operations depend on the task status. |

To view node-level metrics, run logs, alerts, or task settings, click **Monitor** on the right side of the target task to open the task details page.

## View Task Details

![](../images/monitor_copy_task_overview.png)



## ① Top Control Bar

You can rename the task, view its start time, and check the Agent status, which includes the following information:

* **CPU Usage**: The CPU usage of the engine process as a proportion of the total CPU usage of the system.
* **Memory Usage**: Used / Memory Max
* **GC Throughput**: (Engine Cumulative Run Time - GC Time)/Engine Cumulative Run Time * 100%



## ② Task Indicators Display Bar

Displaying basic information and key monitoring indicators of the task, including synchronization information, task verification information, performance indicators, and task time statistics.

* **Task Checksumming**: Will only be displayed if the task has checksum enabled. You can click to view checksum details if any anomalies are found.
* **RPS**: The average number of input and output records processed by the task per second. It supports viewing based on the dimensions of event count or size.
* **Incremental Delay**: The delay is calculated as the time it takes for an event generated in the source database to be processed and written to the target by the task. When there are multiple targets, only the maximum incremental delay time is considered, measured in milliseconds.
* **Task Event Statistics**: Statistics of all cumulative events after the operation of the task should be analyzed with the following precautions in mind.
  * **Update**: If the target database already exists when performing an insertion event, it will be treated as an update event. This behavior is determined by the write policy, which is configured to update when the target already exists.
  * **DDL**
    * TapData directly creates a table on the target based on deduction results, so DDL (Data Definition Language) events of the table cannot be tracked or counted at the source.
    * If the target is a database type that does not require explicit table creation, such as MongoDB, the table-building events on the target side are not counted or considered as part of the synchronization process.
    * DDL events for **drop table** and **create table** are counted if the target duplicate processing policy is set to **clear target structure and data**.



## ③ Node Information Display Area

Hover your mouse pointer over a node to display key metrics for that node, and click the ![](../images/node_more_icon.png) icon in the bottom right corner of the node to see more details.

- **Full Sync Progress**: The progress report on the full data synchronization.
- **Incremental Data Synchronization**: The incremental log collection time point is represented as the relative time of (engine time - incremental time point of the node) in the floating window when hovering the mouse.
- **Writing time**: The time it takes for data to be written to the target.
- **RPS**: RPS (Records Per Second) measures the speed and performance of data transfer by indicating the number of records processed each second.
- **Cumulative Input Events**: The number of events received by the node from the previous node or source database.
- **Cumulative Output Events**: The number of events sent by the node to the next node or target database.
- **Processing time**: The processing time for the node to process data.



## ④ Task Log Display Area

Click the ![](../images/view_log_icon.png) icon at the top of the page, then you can view the progress, logs, alert list, and associated task information for a task run. You can filter the logs using keywords, periods, and levels, or download them for local analysis on the **Log** tab.



## ⑤ Task/Alert Setting Area

Click the ![](../images/task_setting_icon.png) icon at the top of the page, which displays the task settings (not modifiable) and alert settings, you can set the alert rules:

* Task running error alert
* Notice of full completion of tasks
* Task increment start notification
* Task stop alert
* Task increment delay alert
