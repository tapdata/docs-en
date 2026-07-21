# Metric reference and health assessment

Use this page to answer three operational questions: what a metric means, whether a trend is unhealthy, and when an operator should intervene. For collection setup, see [Deploy Prometheus monitoring](deployment.md).

## Assessment order

Review signals in the following order instead of starting with CPU or memory:

1. **Can you trust collection?** Check `up` and **Status** > **Target health** in Prometheus. When collection fails, other charts might only show stale data.
2. **Is the business affected?** Check failed tasks, sustained retries, connection failures, replication lag, and API 5xx responses.
3. **Is a resource the bottleneck?** Correlate CPU, load, disk, JVM or Node.js memory, GC, and file descriptors.

State metrics can use direct value-based alerts. Performance and capacity metrics require a business SLA, resource limits, and historical baseline. Percentages and durations in this guide are initial recommendations, not universal normal values.

## What to check first

| Check | Healthy behavior | First action when unhealthy |
| --- | --- | --- |
| Collection state, `up` | Required targets are `1` | Check the target address, port, network, and metric path. Do not interpret charts that stopped updating until collection recovers. |
| Task state, `task_status` | Running tasks are `0` | `1` means failed and `2` means retrying. Check task logs, related connections, and Flow Engine. If the query has no data, verify that task metrics exist. |
| Source or target connection, `task_active_db` | `0` | Test the connection, and check the database service, network, credentials, and certificates. |
| Replication lag, `task_cdc_delay_ms` | Within the task SLA and recovers after a short spike | If lag continues to increase, check source writes, node processing, target writes, and network health. |
| Disk and CPU | More than 20% disk available and no sustained high CPU | Determine whether tasks are affected, and then check data growth, logs, GC, and other processes. |

After checking these core signals, use JVM, GC, thread-pool, and file-descriptor metrics to diagnose a specific symptom.

## View metrics available in the environment

Available metrics vary by environment, so you do not need to memorize a complete list. First review the metrics returned by the endpoint, and then decide which dashboards and alerts to enable. To list metric names, help text, and types:

```bash
curl -fsS http://<host>:3035/actuator/prometheus \
  | grep -E '^# (HELP|TYPE) '
```

You can also query collected metadata from the Prometheus API:

```bash
curl -fsS 'http://<monitor-host-private-ip>:9090/api/v1/metadata?limit=10000'
```

Before creating an alert for a metric not covered on this page, confirm:

- Whether the type is Counter, Gauge, or Histogram.
- Whether the unit is seconds, milliseconds, bytes, a ratio, or a cumulative count.
- Which labels and values exist, especially task, node, state, and route labels.
- Whether the metric becomes zero or its data disappears when a task stops, a component restarts, or a feature is disabled.

You do not need to interpret every metric during a routine check. Start with `up`, task state, connection state, replication lag, and disk. Use JVM, GC, and thread-pool metrics after a core signal becomes unhealthy.

## Core task metrics

Task queries and rules must include `job="tapdata-flow-engine"` so that same-named metrics from other components are not mixed together.

:::caution Verify task metric availability before production use

The following tables describe metrics when they exist. While at least one task is active, run:

```bash
curl -fsS http://<host>:3035/actuator/prometheus \
  | grep -E '^# (HELP|TYPE) task_(status|active_db|cdc_delay_ms|node_process_data_ms|milestone_status|milestone_time)'
```

No output means that the endpoint does not provide task-level metrics. Task rules remain Inactive and task dashboards show **No data**; neither result proves that tasks are healthy. Enable only component, resource, HTTP, or MongoDB monitoring whose metrics you have verified. Continue to view task status, replication progress, and data validation in the TapData task monitoring page.

:::

:::warning Keep the Flow Engine filter

The state values below apply only to Flow Engine task metrics. Keep `job="tapdata-flow-engine"` when copying queries, dashboards, or alert rules from this page. Other components can provide same-named metrics. Removing the filter can mix data with different meanings and produce incorrect task states or counts.

:::

| Metric | Meaning and values | Health assessment | Initial alert and investigation |
| --- | --- | --- | --- |
| `task_status` | `0` running, `1` failed, `2` retrying. | `0` is healthy; `1` has failed; a persistent `2` means recovery has not completed. | Critical when `1` continues for one minute. Warning when `2` continues for ten minutes. Check task logs, connections, and Flow Engine. |
| `task_active_db` | `0` healthy, `1` server or network failure, `2` invalid credentials. | A nonzero state normally prevents the node from reading or writing. | Critical when nonzero for one minute. Test the connection and check the network, database, credentials, and certificates. |
| `task_cdc_delay_ms` | Incremental replication lag in milliseconds. Relevant to continuously incremental tasks. | A short spike that recovers can be transient. Sustained growth means input exceeds processing capacity. | Start with a warning above 30 seconds and critical above five minutes, but replace these values with the task SLA. Check source writes, node processing, target writes, and network. |
| `task_node_process_data_ms` | Average processing time for one task node, in milliseconds. | Compare with the historical baseline for the same node. Do not compare unrelated databases or tasks directly. | Do not trigger an urgent notification from this metric alone. If it increases with replication lag, investigate the affected source or target. |
| `task_milestone_status` | Startup milestone state. Related labels include `milestone_status`, `milestone`, and `order`. | Startup should progress through milestones. Long waits, sustained running states, or errors require investigation. | Use as supporting evidence for startup failures. Avoid separate notifications for every milestone. |
| `task_milestone_time` | Duration of a completed or failed milestone, in milliseconds. | Compare with similar tasks and the same task's startup history. | Use for startup degradation and capacity planning. Do not set one universal threshold. |

Use the following labels to filter data by task or node. When getting started, focus on `task_name` and `node_name`. Prometheus also adds `job`, `instance`, and the configured `project` label.

| Metric | Common labels | Usage |
| --- | --- | --- |
| `task_status` | `task_id`, `task_name`, `task_type` | Locate running, failed, or retrying tasks. |
| `task_active_db` | `task_id`, `task_name`, `task_type`, `node_id`, `node_name` | Locate a connection failure by task node. |
| `task_cdc_delay_ms` | `task_id`, `task_name`, `task_type` | Appears only when the task produces incremental-lag samples. |
| `task_node_process_data_ms` | `node_id`, `node_name`, `node_type`, `task_id`, `task_name`, `task_type` | Compare a node with the same task's history. |
| `task_milestone_status`, `task_milestone_time` | `task_id`, `task_name`, `task_type`, `milestone_status`, `milestone`, `order` | Common `milestone_status` values include `waiting`, `running`, `error`, and `finish`. State series normally use sample value `1` for the current label combination. |

Some task metrics exist only during a specific phase. For example, lag metrics might be absent before a task enters the incremental phase, and milestone metrics might be absent before a milestone runs. In these cases, **No data** means that the query has no matching data. It does not mean that the metric value is `0`.

If a task is running but all the task metrics above are absent, treat task metrics as unavailable in the environment. Use the TapData task monitoring page to review task state.

Common queries:

```promql
# Failed or retrying tasks.
task_status{job="tapdata-flow-engine"} != 0

# Ten tasks with the highest lag.
topk(10, task_cdc_delay_ms{job="tapdata-flow-engine"})

# Average node processing time over the last ten minutes.
avg_over_time(task_node_process_data_ms{job="tapdata-flow-engine"}[10m])
```

:::note Data validation is outside the scope of these alerts

Continue to review data validation results on the TapData task monitoring page. The task metrics on this page do not include validation results, difference counts, or validation state. A running task with low lag does not prove that source and target data are identical.

:::

## Component and runtime metrics

### Management and Flow Engine

| Metric | Type or unit | Operational use |
| --- | --- | --- |
| `up` | Gauge, 0 or 1 | Whether Prometheus can scrape the target. It does not indicate task health. |
| `disk_free_bytes`, `disk_total_bytes` | Gauge, bytes | Calculate available disk ratio and consumption trend. |
| `system_cpu_usage`, `process_cpu_usage` | Gauge, 0 to 1 | Review host and process CPU. Escalate sustained high usage only when it occurs with task lag, errors, or other service impact. |
| `system_cpu_count` | Gauge, cores | Interpret load and capacity. |
| `system_load_average_1m` | Gauge | Compare with CPU cores to investigate CPU, I/O, or blocking pressure. |
| `process_files_open_files`, `process_files_max_files` | Gauge | Calculate descriptor usage and identify sustained growth toward the process limit. |
| `jvm_memory_used_bytes`, `jvm_memory_committed_bytes`, `jvm_memory_max_bytes` | Gauge, bytes | Review Heap, Metaspace, and other areas by labels such as `area` and `id`. Calculate usage ratio only when `max` is greater than 0. |
| `jvm_buffer_memory_used_bytes` | Gauge, bytes | Review off-heap buffers such as Direct Buffer. |
| `jvm_gc_pause_seconds_count`, `jvm_gc_pause_seconds_sum`, `jvm_gc_pause_seconds_max` | Counter or Gauge, seconds | Use `rate(sum)/rate(count)` for average GC pause in a window. Correlate with maximum pause and business lag. |
| `jvm_threads_live_threads`, `jvm_threads_peak_threads`, `jvm_threads_states_threads` | Gauge, threads | Review thread totals and state changes. Use thread dumps when counts or blocked threads keep increasing. |
| `http_server_requests_seconds_count` | Counter, requests | Use `rate()` for Management request rate and error ratio. |
| `http_server_requests_seconds_sum` | Counter, seconds | Combine with count for average response time. Do not interpret the cumulative value as current latency. |
| `http_server_requests_active_seconds_count` | Gauge or active long-running requests | Review current active request count. |
| `http_server_requests_active_seconds_max` | Gauge, seconds | Locate the longest current active request. |

The following groups can also appear on Management or Flow Engine endpoints. Use them for deeper diagnosis. Do not trigger an urgent alert from one absolute value alone.

| Group | Metrics | Operational use |
| --- | --- | --- |
| Application startup | `application_started_time_seconds`, `application_ready_time_seconds` | Track startup duration. If a restart becomes much slower, correlate it with logs and dependencies. |
| Executor | `executor_active_threads`, `executor_pool_core_threads`, `executor_pool_max_threads`, `executor_pool_size_threads`, `executor_queued_tasks`, `executor_queue_remaining_tasks`, `executor_completed_tasks_total` | Identify a saturated thread pool or continuously growing queue. Investigate when remaining capacity approaches zero together with task lag. |
| JVM classes and compilation | `jvm_classes_loaded_classes`, `jvm_classes_unloaded_classes_total`, `jvm_compilation_time_ms_total`, `jvm_info` | Explain JVM, memory, or startup behavior. Do not alert on these metrics alone. |
| JVM buffers | `jvm_buffer_count_buffers`, `jvm_buffer_memory_used_bytes`, `jvm_buffer_total_capacity_bytes` | Review off-heap buffer count, usage, and capacity by buffer type. |
| JVM GC data | `jvm_gc_live_data_size_bytes`, `jvm_gc_max_data_size_bytes`, `jvm_gc_memory_allocated_bytes_total`, `jvm_gc_memory_promoted_bytes_total`, `jvm_gc_memory_usage_after_gc`, `jvm_gc_overhead` | Review live data after GC, allocation and promotion rate, and GC overhead. Intervene when degradation occurs with lag or memory pressure. |
| Additional JVM threads | `jvm_threads_daemon_threads`, `jvm_threads_started_threads_total` | Review daemon thread count and thread creation rate. Investigate unusual creation rates as possible connection or pool churn. |
| Process lifecycle | `process_cpu_time_ns_total`, `process_start_time_seconds`, `process_uptime_seconds` | Use `rate(process_cpu_time_ns_total[5m])` for CPU-time growth. Use start time and uptime to find unplanned restarts. |
| Log events | `ef_errors_log_total`, `log4j2_events_total` | Use `increase(...[5m])` for new errors or log events by level. Use labels and raw logs to diagnose; a cumulative total is not a current error rate. |
| Scheduled tasks | `tasks_scheduled_execution_active_seconds`, `tasks_scheduled_execution_active_seconds_max`, `tasks_scheduled_execution_seconds`, `tasks_scheduled_execution_seconds_max` | Review execution count, total duration, active duration, and maximum duration against the same instance's baseline. |

Average Management request duration:

```promql
sum by (instance) (rate(http_server_requests_seconds_sum{job="tapdata-management"}[5m]))
/
sum by (instance) (rate(http_server_requests_seconds_count{job="tapdata-management"}[5m]))
```

File descriptor and JVM Heap usage ratios:

```promql
process_files_open_files{job=~"tapdata-(management|flow-engine|agent)"}
/
process_files_max_files{job=~"tapdata-(management|flow-engine|agent)"}

sum by (project, job, instance) (jvm_memory_used_bytes{area="heap"})
/
sum by (project, job, instance) (jvm_memory_max_bytes{area="heap"} > 0)
```

### Agent

Common Agent metrics include `up`, `disk_free_bytes`, `disk_total_bytes`, `process_cpu_time_ns_total`, `process_cpu_usage`, `process_files_open_files`, `system_cpu_count`, `system_cpu_usage`, and `system_load_average_1m`. Apply the same health assessment as the table above. Do not substitute zero for a metric that the endpoint does not provide.

### API Server

Enable the corresponding panels and rules only if API Server `/metrics` returns these metrics.

| Metric | Type or unit | Operational use |
| --- | --- | --- |
| `http_requests_total` | Counter | Calculate request rate and non-2xx or 5xx ratio by `method`, `path`, and `statusCode`. |
| `nodejs_eventloop_lag_seconds` | Gauge, seconds | Sustained growth can indicate synchronous work, CPU saturation, or event-loop blocking. |
| `process_cpu_seconds_total` | Counter, seconds | Use `rate()` for process CPU trend. |
| `process_resident_memory_bytes` | Gauge, bytes | Compare resident memory with container or host limits. |
| `nodejs_heap_size_used_bytes`, `nodejs_heap_size_total_bytes` | Gauge, bytes | Review V8 Heap usage and growth. |
| `nodejs_external_memory_bytes` | Gauge, bytes | Review external memory managed by V8. |
| `nodejs_heap_space_size_used_bytes` | Gauge, bytes | Locate memory growth by Heap Space. |
| `nodejs_gc_duration_seconds_count`, `nodejs_gc_duration_seconds_sum` | Counter | Use `rate()` to determine whether GC frequency and duration keep increasing. |
| `process_files_open_files` | Gauge | Review open file descriptors. |
| `log_level_count_total` | Counter | Use `increase()` for new log events by level within a window. |
| `nodejs_version_info` | Info | Identify instance, process, and Node.js version. Do not use as an alert threshold. |

API 5xx ratio:

```promql
sum by (instance) (rate(http_requests_total{job="tapdata-api-server",statusCode=~"5.."}[5m]))
/
sum by (instance) (rate(http_requests_total{job="tapdata-api-server"}[5m]))
```

### MongoDB

MongoDB metric names depend on the `mongodb_exporter` version, compatibility mode, and enabled collection options (collectors). Use the exporter `/metrics` output as the source of truth. The templates use these core metrics:

| Metric | Meaning | Health assessment and usage |
| --- | --- | --- |
| `up{job="mongodb"}` | Whether Prometheus can scrape the exporter. | Should be `1`. If `0` continues for two minutes, check the exporter process, network, and port. |
| `mongodb_up` | Whether the exporter can connect to MongoDB. | Should be `1`. If `up=1` but this value is `0`, check the system database, URI, authentication database, certificates, and network. |
| `mongodb_rs_myState` | Current replica set member state. | `1` PRIMARY, `2` SECONDARY, `7` ARBITER. Investigate other persistent states. Standalone deployments do not have this metric. |
| `mongodb_rs_members_state`, `mongodb_rs_members_health` | State and health of each member, with labels such as `member_idx` and `member_state`. | Member count and state should match `rs.status()`. Health should be `1`. |
| `mongodb_ss_connections` | Current, available, and other connections by `conn_type`. | Look for sustained growth in current connections and a sustained decline in available connections. Compare with capacity and baseline. |
| `mongodb_ss_opcounters` | Cumulative MongoDB operations by `legacy_op_type`. | Use `rate()` for operation rate. Correlate spikes with task traffic, lag, connections, and cache. |
| `mongodb_ss_wt_cache_bytes_currently_in_the_cache`, `mongodb_ss_wt_cache_maximum_bytes_configured` | Current WiredTiger cache usage and configured maximum. | Compare usage with the limit. Assess capacity when usage remains high together with service impact. |
| `mongodb_oplog_stats_storageStats_storageSize` | Current Oplog storage size. | This is capacity, not remaining time. Estimating the window also requires earliest and latest timestamps and write rate. |

For exporter setup, see [Configure MongoDB monitoring](deployment.md#optional-configure-mongodb-monitoring). For dashboard usage, see [Read the MongoDB dashboard](grafana.md#read-the-mongodb-dashboard).

## Initial health thresholds

| Signal | Healthy or observation state | Warning starting point | Critical starting point | First investigation |
| --- | --- | --- | --- | --- |
| `up` | `1` | Not applicable | `0` for two minutes | Target, network, port, process, and metric path. |
| `mongodb_up` | `1` | Not applicable | `0` for two minutes | System database, URI, authentication database, certificates, and network. |
| MongoDB replica set state | PRIMARY, SECONDARY, or ARBITER | Another state for five minutes | Escalate by business impact | Replica set status, MongoDB logs, node network, and disk. |
| Available disk | Above 20% with a stable decline rate | Below 20% for 15 minutes | Below 10% for five minutes | Logs, temporary files, backups, and data growth. Confirm ownership before deleting anything. |
| Host CPU | Below 85% or a short spike | Five-minute average above 85% for 15 minutes | Five-minute average above 95% for five minutes | High-load tasks, GC, other processes, and scaling. |
| System load | Consistent with CPU cores and baseline | Sustained above CPU core count | Also occurs with lag, errors, or unavailability | CPU, I/O wait, and blocked threads. |
| JVM or Node.js memory | Returns after a peak | Sustained growth toward a limit | OOM, restart, or business failure | Memory limits, task concurrency, leak, Heap, and Direct Memory. |
| File descriptors | Varies within the historical range | Sustained growth | Near the system limit or open-file failures | Connection leaks, file operations, and `ulimit`. |
| API 5xx ratio | Near zero | Above 5% for ten minutes while traffic exists | Above 20% for five minutes | Route, dependency, logs, and recent changes. |

### Establish an environment baseline

During the first production week, record task lag, node processing time, CPU, memory, GC, disk growth, and API traffic during both peak and off-peak periods. Then adjust rules with task SLAs and historical percentiles. This avoids thresholds that are so low that on-call staff ignore them or so high that notification arrives after business impact.

After each real incident, review whether the alert was too early, late, or repetitive and whether the notification lacked a task, instance, or runbook link. Record threshold changes through the normal change process instead of editing production rules ad hoc.
