---
slug: /platform-ops/monitor-with-prometheus
---

# Monitor TapData with Prometheus

import Content from '../../reuse-content/_enterprise-features.md';

<Content />

Use Prometheus to collect TapData metrics, Grafana to review trends, and Alertmanager to send notifications. You can also monitor the MongoDB system database used by TapData.

## Choose a starting point

| Goal | Read this page |
| --- | --- |
| Deploy Prometheus, Grafana, and Alertmanager for the first time | [Deploy Prometheus monitoring](deployment.md) |
| Connect TapData to an existing Prometheus, Grafana, or Alertmanager deployment | [Use an existing monitoring stack](deployment.md#use-an-existing-monitoring-stack) |
| Understand metric values, trends, and healthy ranges | [Metric reference and health assessment](metrics.md) |
| Import a TapData, API Server, or MongoDB dashboard | [Use the Grafana dashboards](grafana.md) |
| Monitor the MongoDB system database used by TapData | [Configure MongoDB monitoring](deployment.md#optional-configure-mongodb-monitoring) |
| Configure severity-based alerts, notifications, routine checks, and incident response | [Configure alerts and routine monitoring checks](alerting.md) |

If deployment is complete but a dashboard shows **No data**, go directly to [Troubleshoot missing data](grafana.md#troubleshoot-missing-data).

## Recommended workflow

For a first-time integration, complete these tasks in order:

1. [Enable and verify the metric endpoints](deployment.md#step-1-enable-and-verify-metric-endpoints). Add only endpoints that return Prometheus metrics.
2. Deploy the monitoring services in this guide, or [use an existing monitoring stack](deployment.md#use-an-existing-monitoring-stack).
3. [Review the metrics available in your environment](metrics.md#view-metrics-available-in-the-environment) before enabling task, API Server, or MongoDB dashboards and alerts.
4. [Download and import the Grafana templates](grafana.md#download-the-templates). Validate one instance against the TapData UI before selecting **All**.
5. [Install the alert rules](alerting.md#install-and-validate-the-rules), adjust thresholds to the business SLA, and [test the notification path](alerting.md#test-the-notification-path).
6. Use the [routine monitoring checklist](alerting.md#routine-monitoring-checklist) for ongoing operations and incident escalation.

## Common terms

| Term | Meaning in this guide |
| --- | --- |
| Target | A metric endpoint that Prometheus accesses on a schedule. |
| Metric endpoint | An HTTP URL that returns monitoring data, such as the Flow Engine `/actuator/prometheus` endpoint. |
| Scrape | The process in which Prometheus accesses a metric endpoint and stores the returned data. |
| Metric | Queryable runtime data, such as service state, CPU usage, or task lag. |
| Label | Additional information used to filter a metric, such as `project`, `instance`, or `task_name`. |
| PromQL | The Prometheus query language. Run blocks labeled `promql` on the Prometheus query page. |
| Exporter | A program that converts the state of a system such as MongoDB into Prometheus metrics. |
| **No data** | The query found no matching data. It does not mean that the metric value is `0`. |
| SLA | A service objective defined by the business, such as the maximum permitted task lag. |

## Monitoring coverage

| Object | Primary signals |
| --- | --- |
| Management | Availability, HTTP requests, JVM, process, and host resources |
| Flow Engine | Availability, JVM, process, and host resources |
| TapData tasks | Task status, connection status, CDC lag, node processing time, and startup milestones |
| Agent | Availability, process, and host resources |
| API Server | HTTP requests, Node.js runtime, process, and log metrics |
| MongoDB | Database connection, replica set, connections, operations, and WiredTiger cache |

## Validate the monitoring setup

After deployment, confirm the following results:

1. Under **Status** > **Target health** in Prometheus, every required target is **UP**. Remove [scrape jobs](deployment.md#verify-scrape-targets) for components that are not deployed.
2. The Grafana data source test succeeds, and [dashboard variables](grafana.md#validate-dashboard-data) list the expected environment and instances.
3. Dashboard values, units, state mappings, and task counts pass the [environment comparison](grafana.md#validate-dashboard-data).
4. Alerts use only verified metrics, and task-lag thresholds match the [business SLA](metrics.md#initial-health-thresholds).
5. During a [notification test](alerting.md#test-the-notification-path), alerts move from Pending to Firing, reach the expected receiver, and send a resolved notification after recovery.
6. On-call engineers understand the [response order](alerting.md#response-order), incident classification, and escalation conditions.
