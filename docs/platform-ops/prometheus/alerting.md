# Configure alerts and routine monitoring checks

This page explains how to load Prometheus alert rules, configure Alertmanager notifications, perform routine monitoring checks, and classify incidents. Before you begin, [verify the Prometheus monitoring path](deployment.md#step-3-verify-the-monitoring-path) and define task SLAs with the [metric reference and health assessment](metrics.md).

## Alert design principles

- Prioritize signals users can experience: collection failure, task failure, sustained retry, connection failure, replication lag, and API 5xx responses.
- Use CPU, memory, and GC mainly for early warning and diagnosis. Do not classify a resource signal as the highest-severity incident without business impact.
- Use `for` to exclude brief fluctuations. Use Alertmanager grouping and inhibition to prevent duplicate notifications for one failure.
- Include environment, component, instance, task, current value, duration, and a runbook link in each notification.
- Prometheus `warning` and `critical` labels represent signal severity. Determine the final incident severity from business impact and scope.

## Install and validate the rules

<a href="/resources/TapData_Prometheus_Alert_Rules.yaml">Download the TapData Prometheus alert rules</a> and save the file as `tapdata-alert-rules.yml`.

The file contains five groups for availability, resources, HTTP, MongoDB, and tasks. You can load the entire file, but a group protects the environment only when its referenced metrics exist.

Before enabling task rules, run these queries while at least one task is active:

```promql
count(task_status{job="tapdata-flow-engine"})
count(task_active_db{job="tapdata-flow-engine"})
count(task_cdc_delay_ms{job="tapdata-flow-engine"})
```

If every query has no data, the `tapdata-tasks` group cannot detect task failures. Passing syntax validation and showing **Inactive** do not prove that a task is healthy.

Remove or comment out the entire group with `name: tapdata-tasks` for now. Keep only component, resource, HTTP, and MongoDB groups whose metrics return data, and use the TapData task monitoring page. Restore the task rules after the endpoint begins returning task metrics, and then run a failure drill.

If MongoDB rules are enabled, also check:

```promql
mongodb_up{job="mongodb"}
mongodb_rs_myState{job="mongodb"}
```

`mongodb_up` should be `1`. Enable the replica set state rule only when the topology and enabled collection option (collector) provide that metric. For a standalone deployment with no state metric, remove `MongoDBReplicaSetStateUnhealthy`. Do not interpret missing data as a healthy replica set.

Run `promtool` for static validation:

```bash
docker run --rm \
  --entrypoint /bin/promtool \
  -v "$PWD:/work:ro" \
  prom/prometheus:v3.13.1 \
  check rules /work/tapdata-alert-rules.yml
```

Confirm that `prometheus.yml` references the rule file and Alertmanager:

```yaml
rule_files:
  - /etc/prometheus/tapdata-alert-rules.yml

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']
```

Mount the rule file in Docker Compose:

```yaml
volumes:
  - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
  - ./tapdata-alert-rules.yml:/etc/prometheus/tapdata-alert-rules.yml:ro
```

Recreate the Prometheus container to apply the new file mount, and then inspect the rules:

```bash
docker compose up -d prometheus
docker compose logs --tail=100 prometheus
curl -fsS http://<monitor-host-private-ip>:9090/api/v1/rules
```

Open **Status** > **Rule health**. Some Prometheus versions label the page **Rules**. It should not report a loading error. The rule list uses these states:

| State | Meaning |
| --- | --- |
| **Inactive** | The alert condition is not currently met. A rule can also remain Inactive when its metric is missing. |
| **Pending** | The condition is met, but not for the full duration configured by `for`. |
| **Firing** | The condition has met the required duration, and the alert is active. |

## Rule coverage

| Rule | Component | Warning | Critical |
| --- | --- | --- | --- |
| Metric target unavailable | Management, Flow Engine, Agent, API Server, MongoDB exporter | — | Two minutes |
| Disk space | Management, Flow Engine, Agent | Less than 20% available | Less than 10% available |
| CPU | Management, Flow Engine, Agent | Five-minute average above 85% | Five-minute average above 95% |
| Management 5xx | Management | Above 5% | Above 20% |
| API 5xx | API Server | Above 5% | Above 20% |
| MongoDB connection | MongoDB exporter | — | `mongodb_up=0` for two minutes |
| MongoDB replica set state | MongoDB | Not PRIMARY, SECONDARY, or ARBITER for five minutes | — |
| Task status | Flow Engine | Retrying for ten minutes | Failed for one minute |
| Data source connection | Flow Engine | — | Network, server, or authentication error for one minute |
| CDC lag | Flow Engine | Above 30 seconds for five minutes | Above five minutes for five minutes |

Task rules work only when Flow Engine provides the corresponding `task_*` metrics. API and Management 5xx rules evaluate only when request traffic exists. MongoDB connection and replica set rules require their exporter metrics. Establish an environment baseline before alerting on MongoDB cache, connection count, or operation rate.

## Configure alert notifications

The following example uses generic webhooks. Replace the URLs with endpoints from your notification gateway, PagerDuty, ticketing system, or collaboration platform. Restrict file access to `alertmanager.yml`.

```yaml title="alertmanager.yml"
route:
  receiver: ops-webhook
  group_by: [alert_family, project, instance, task_name]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
    - receiver: oncall-webhook
      matchers:
        - severity="critical"
      repeat_interval: 30m

receivers:
  - name: ops-webhook
    webhook_configs:
      - url: 'https://<notification-gateway>/alerts/warning'
        send_resolved: true

  - name: oncall-webhook
    webhook_configs:
      - url: 'https://<notification-gateway>/alerts/critical'
        send_resolved: true

inhibit_rules:
  - source_matchers:
      - severity="critical"
    target_matchers:
      - severity="warning"
    equal: [alert_family, project, instance, task_name]
```

This routes warnings to the standard operations channel and critical alerts to the on-call channel. A critical alert inhibits the warning for the same object. Both receivers send resolved notifications when an alert recovers. Authentication and payload formats vary by notification system. Store secrets in the notification gateway; do not commit tokens to a public repository.

After changing the configuration:

```bash
docker compose restart alertmanager
docker compose logs --tail=100 alertmanager
curl -fsS http://<monitor-host-private-ip>:9093/-/ready
```

For routing, grouping, and inhibition options, see [Alertmanager configuration](https://prometheus.io/docs/alerting/latest/configuration/).

## Test the notification path

In a test environment or maintenance window, send a simulated alert to Alertmanager:

```bash
starts_at=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
ends_at=$(date -u -d '+5 minutes' +"%Y-%m-%dT%H:%M:%SZ")
curl -fsS -X POST http://<monitor-host-private-ip>:9093/api/v2/alerts \
  -H 'Content-Type: application/json' \
  -d "[{
    \"labels\": {
      \"alertname\": \"TapDataNotificationTest\",
      \"alert_family\": \"notification_test\",
      \"severity\": \"warning\",
      \"project\": \"tapdata-test\",
      \"instance\": \"manual\"
    },
    \"annotations\": {
      \"summary\": \"TapData monitoring notification test\"
    },
    \"startsAt\": \"${starts_at}\",
    \"endsAt\": \"${ends_at}\"
  }]"
```

The alert should appear in Alertmanager. The expected receiver should get a firing notification when the alert starts and a resolved notification after about five minutes. The notification should include the key labels. The `date -d` syntax works on common Linux distributions. Do not keep an always-true Prometheus rule for testing.

The page labels for alert name, `project`, `instance`, and `severity` should match the request. An alert on the page proves only that Alertmanager received it. Confirm both the alert-start and alert-recovery messages at the actual receiver.

Before production launch, also test two real paths: temporarily block a dedicated test target to verify `TargetDown`; if task metrics are confirmed, fail a dedicated test task to verify the task rules. Do not affect production tasks.

## Response order

1. **Confirm collection is trustworthy.** Check `up`, **Status** > **Target health**, and the metric endpoint. Do not use stopped business curves to infer task state when collection has failed.
2. **Determine the scope.** Use `project`, `job`, `instance`, and `task_name` to distinguish one task, one node, or a wider failure.
3. **Confirm business impact.** Check critical task state, lag, API 5xx responses, and user reports.
4. **Locate the cause.** Correlate task logs, connection tests, source and target database health, component resources, and recent changes.
5. **Recover and verify.** Before closing the incident, confirm that targets are UP, task and connection states return to 0, lag continues to decline into the SLA, and error rates recover.
6. **Record and review.** Document the timeline, impact, cause, actions, recovery evidence, and any rule or documentation changes.

For task incidents, see [Task troubleshooting](../troubleshooting/task-troubleshooting.md). For system and dependency incidents, see [Emergency plan](../emergency-plan.md).

## Incident severity and escalation

Alert severity is not automatically incident severity. A critical alert in a test environment might not be P1. A warning for sustained lag on a critical business task might require escalation.

| Incident level | Example | Recommended response | Escalation condition |
| --- | --- | --- | --- |
| P1 | Multi-node or widespread task outage; critical path unavailable with no workaround | Notify the on-call lead and business owner immediately, open an incident channel, and continue coordinated response | Major business impact, data continuity risk, or expanding scope |
| P2 | One critical task failed; a critical task remains outside its SLA; widespread API 5xx responses | Acknowledge and begin response within 15 minutes | Not recovered within the agreed time, expanding impact, or data risk |
| P3 | Brief retry on a noncritical task; resource trend warning; one instance affected without business impact | Handle during working hours and continue observation | Recurrence, worsening trend, or SLA impact begins |

Use the response times defined by your business SLA. If an operator cannot identify the cause within the target response time, escalate the incident before root-cause analysis is complete.

## Routine monitoring checklist

| Frequency | Checks | Pass criteria | Output |
| --- | --- | --- | --- |
| Daily | Prometheus targets, current critical alerts, failed or retrying tasks, critical-task lag, API 5xx | Required targets are UP; every detected issue has an owner or ticket | Daily issues and open items |
| Weekly | Lag and node processing trends, CPU, memory, disk, MongoDB replica set and Oplog, noisy alerts | No sustained degradation; no obvious threshold or notification noise | Capacity and rule-adjustment list |
| Monthly and after major changes | TargetDown, task-failure, and recovery-notification drills; contacts, routes, and runbooks | The correct people receive alerts and can independently diagnose and verify recovery | Drill record and improvements |

At minimum, a ticket should record alert start and recovery time, environment, instance, task, impact, relevant log range, recent changes, actions, recovery query results, and follow-up work.

## Maintain thresholds

- Start with the example thresholds, but replace CDC lag values with task SLAs before production use.
- After one week, calibrate resource rules with peak, off-peak, and historical percentile data.
- When warning and critical fire for the same signal, use `alert_family` and inhibition to send only the highest severity.
- Review missed alerts, false positives, notification failures, and recovery conditions after every incident.
- Validate every rule change with `promtool`, a test environment, review, and a change record.

Prometheus recommends `for` to control how long a condition must hold before an alert becomes active. It also provides `promtool check rules` and rule unit tests. For more information, see [Alerting rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/).
