# Features

Deliver trusted, real-time data across your systems with a unified, low-latency pipeline. This page outlines the core capabilities that make TapData a powerful live data platform.

## Data Ingestion: Capture at the Source

![Data Replication Workflow](../images/features_data_copy.png)

TapData supports both **real-time** and **historical** data ingestion, ensuring a complete and continuously updated view of your business data.

- **[Change Data Capture (CDC)](change-data-capture-mechanism.md)**
  Log-based CDC (e.g., MySQL binlog, PostgreSQL WAL) and trigger-based sync methods ensure sub-second latency and zero data loss with automatic retries.
- [**Broad Connector Ecosystem**](../connectors/supported-data-sources.md)
  100+ prebuilt connectors covering relational databases (Oracle, PostgreSQL, Sybase), SaaS platforms (Salesforce, Shopify), cloud services (S3, BigQuery), and legacy systems (Mainframe, FTP).
- [**Hybrid Pipeline Support**](../data-replication/create-task.md)
  Combine historical backfill with ongoing streaming sync in a single unified pipeline—no need to separate batch and real-time workflows.

## Transformation: Prepare and Shape Data in Real Time

![Data Transformation Workflow](../images/features_data_dev.png)

Transform your data on the fly with a zero-code interface or flexible custom logic.

- **[Visual Pipeline Builder](../operational-data-hub/mdm-layer/prepare-and-transform.md)**
  Drag-and-drop operators like `filter`, `join`, `aggregate`, `mask` for rapid flow creation. Power users can inject JavaScript for advanced logic.
- **Incremental Materialized Views (IMV)**
  Maintain fresh, pre-computed results using CDC—no full-table recalculations. Ideal for building analytics-ready views with millisecond latency.
- **Built-in Data Quality**
  Apply schema validation and anomaly detection (e.g., null spike, value drift). Pipelines can auto-pause on quality failures to prevent bad data propagation.

## Data Delivery: Serve Real-Time Data Anywhere

Distribute trusted, real-time data to [downstream systems](../operational-data-hub/adm-layer/sync-downstream.md), [APIs](../operational-data-hub/adm-layer/integrate-apis.md), and apps—no ETL required.

- **Multi-Protocol Outputs**
  Automatically expose your datasets as [REST](../publish-apis/query-via-restful.md)/[GraphQL](../publish-apis/query-via-graphql.md) APIs, publish to Kafka, or sync directly to data warehouses like Snowflake or Delta Lake.
- **Virtual Data Products**
  Publish curated business views (e.g., `user_profile`, `finance.revenue`) with access controls, lineage, and usage monitoring—ideal for MDM, analytics, or API-based consumption.

## Operational Control: Build with Confidence

[Enterprise-grade governance](../operational-data-hub/plan-data-platform.md) and deployment options let you manage pipelines at scale with full observability.

- **Governance & Security**
  Track full [lineage](../operational-data-hub/fdm-layer/explore-fdm-tables.md) from source to consumer. Protect sensitive fields with masking and hashing (GDPR/CCPA ready). RBAC and Kubernetes-native deployment supported.
- **[Pipeline Monitoring](../data-replication/monitor-task.md)**
  Built-in dashboards show lag, throughput, and error metrics. Proactive alerts via Slack, email, or webhook.
- **Flexible Deployment**
  Run on-premises, in the cloud, or across hybrid environments. Cross-cloud sync supported (e.g., RDS → Synapse).

## Developer Experience: Built for Extensibility

Whether you're building pipelines or extending the platform, TapData offers tools for full lifecycle automation.

- **[API-First Control](../tapflow/introduction.md)**
  Manage pipelines via declarative configs (YAML/JSON), CLI, or Terraform.
- [**Custom Extensions**](../operational-data-hub/advanced/README.md)
  Build your own connectors in Java/JS. Extend pipeline logic with plugin architecture.

## Smart Interaction: Chat with Your Data (Preview)

![TapData MCP Server Overview](../images/tapdata_mcp_server_introduction.png)

Unlock natural language access to curated data views—no SQL required.

- **Chat-Based Exploration**
  Let business users query data using natural language. Powered by metadata, lineage, and field-level descriptions from your Virtual Data Products.
- **MCP-Powered Understanding**
  MCP (Metadata-Centric Platform) maps user intent to live datasets, resolving ambiguity using field names, data types, and context.
- **Preview Mode**
  Ideal for customer service, marketing, and internal ops teams to explore data quickly without BI tools or dashboards.

:::tip

[Try Chat with Data via MCP (Preview) →](../mcp/introduction.md)

:::

## Why Choose TapData?

| **Your Need**             | **TapData Solution**                      | **Legacy Alternative**           |
| ------------------------- | ----------------------------------------- | -------------------------------- |
| Real-time customer data   | CDC-powered 360° views                    | Batch ETL + stale aggregates     |
| Agile analytics           | Incremental materialized views (IMV)      | Nightly Data Warehouse refreshes |
| Microservices integration | Auto-generated APIs                       | Hand-coded Kafka consumers       |
| Compliance & auditability | In-flight masking + full lineage tracking | Manual audit scripts             |

:::tip

[See All Connectors →](../connectors/supported-data-sources.md) | [Explore Architecture →](architecture.md)

:::

