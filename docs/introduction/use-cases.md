# Application Scenarios
Tapdata is a real-time data platform that unifies change capture, in-memory processing, and API/service delivery. Below are the most common scenarios—organized by who cares and what outcome they need.


## Technical Use Cases

*(What engineers can build and accelerate using TapData’s real-time architecture)*

### Active Master Data & Operational Data Hub

- **Real-Time CDC Merge Across Databases**
  Sync core entities（e.g., customers, products）across heterogeneous systems—powering a continuously updated MDM or ODH layer.
- **Quality Gates at Ingest**
  Apply validation, standardization, deduplication, and schema checks as data flows in—no downstream surprises.
- **Schema Version Tracking & Drift Detection**
  Track schema changes and detect metric drift before it affects downstream analytics.

### Real-Time Integration

- **Zero/Low-Code Pipeline Builder**
  Drag-and-drop to connect 100+ sources (DBs, SaaS, APIs) with built-in CDC and sub-second sync.
- **Unified Streaming + Batch**
  Seamlessly combine historical backfills with CDC updates in the same logical pipeline—no need to juggle Airflow + Kafka.
- **One-Stop Schema & Transformation Handling**
  Eliminate the need for Kafka, Flink, and schema registries—TapData handles the full transformation lifecycle natively.

### Query Acceleration with Incremental Materialized Views

- **Hot Path Joins**
  Pre-join operational tables (e.g., Orders + Customers) to reduce OLAP query times.
- **IMV (Incremental Materialized Views)**
  Cache pre-defined aggregations (e.g., revenue by day), auto-refreshed on source change—define once, no orchestration needed.
- **Optional Federated Pushdown**
  Push filters and joins to source systems to reduce duplication and latency.

### API Services & Data Productization

- **Auto-Generated REST & GraphQL APIs**
  Expose curated views or datasets as APIs with Swagger/OpenAPI—no backend code required.
- **Modernize Legacy with JSON Wrappers**
  Wrap mainframes, COBOL, or flat-file systems with real-time APIs—avoid risky rewrites.
- **Row/Field-Level Access Control**
  Enforce granular ACLs on exposed APIs to protect sensitive data while enabling secure sharing.

### Zero-Downtime Migration & Multi-Cloud Sync

- **Full + Incremental Sync for Seamless Cutovers**
  Migrate data across systems or clouds with parallel real-time sync and instant switch-over.
- **Hybrid & Cross-Region Deployments**
  Keep databases in sync across regions, on-prem to cloud, or cloud to cloud—ideal for HA, DR, or modernization projects.

## Business Use Cases

*(Outcome-focused: what the platform delivers for ops, product & execs)*

### Unified Customer Operations (Customer 360)

- Merge CRM, ticketing, and order systems into one live API.

- Trigger personalization within **milliseconds** based on user actions.

### Real-Time Risk & Transaction Monitoring

- Payment/fintech: update balances, detect fraud, and block suspicious transactions instantly.

- IT/production: stream metrics to alerting systems for immediate anomaly detection.

### Omni-Channel Inventory & Order Visibility

- Sync ERP/WMS across regions; prevent overselling with live stock updates.

- Push disruption alerts (Slack/Kafka) on stock-outs or fulfillment delays.

### AI/ML Feature Freshness

- Stream user events to feature stores (e.g., Feast/Tecton) for model retraining.

- Align batch vs. online feature generation to avoid serving/training skew.

### Geo-Redundancy & Disaster Recovery

- Real-time replication across regions/clouds to ensure continuity.

- Automatic failover by redirecting traffic when a primary site fails.



## Technical Differentiation

| Use Case           | TapData Approach                                  | Legacy Alternative                      |
| ------------------ | ------------------------------------------------- | --------------------------------------- |
| Master Data Sync   | CDC-based merge with SCD2 support                 | Nightly batch reconciliation            |
| API Services       | Auto-generated APIs from live DB schemas          | Hand-coded API middleware               |
| Query Acceleration | In-memory pre-joins + incremental materialization | ETL to DWH + scheduled aggregation jobs |

→ [Explore Architecture](architecture.md) ‖ [Talk to Solutions Engineers](https://tapdata.feishu.cn/share/base/form/shrcnoYXtxkXe7L4wu3vKDYzUUc)



**Why It Matters**

- **Engineer-Centric Design** 

  Uses real-world patterns like `SCD2`, `Feast/Tecton`, `pushdown`, and `materialization`—resonating with modern data engineers.

- **Business-to-Tech Mapping**

  Each use case links to clear business value: 
  _e.g., MDM → real-time compliance, API services → product agility_.

- **Real-Time Advantage** 
  Outperforms batch-based stacks (like Kafka + Flink + DWH) by simplifying architecture and minimizing latency (&lt;500 ms typical).
