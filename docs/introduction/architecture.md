# Architecture and Workflow

Discover how TapData’s unified, real-time architecture brings together data integration, transformation, and delivery—making high-quality, always-fresh data available wherever your business needs it.

## Live Data Platform Overview

TapData brings real-time and batch processing together through a unified pipeline architecture—designed for modern, agile data operations.

![Product Architecture](https://20778419.s21i.faiusr.com/3/2/ABUIABADGAAgtLr-lgYotInUhwYwgA84uAg.gif)

### Connector Layer (Ingest)

- **100+ Ready-to-Use Connectors**
   Connect to databases (PostgreSQL, MySQL, Oracle with CDC), SaaS apps (Salesforce, Workday), and event streams (Kafka, Debezium).
- **Change Data Capture (CDC)**
   Log-based (binlog, WAL) or trigger-based sync with sub-second latency for critical systems.

### Processing Engine (Transform)

- **Streaming-Native Pipelines**
   In-memory execution enables millisecond-level transformations.
- **Visual Orchestration**
   Drag-and-drop operators to filter, join, mask, and aggregate—no code required.

### Serving Layer (Deliver)

- **Multi-Channel Delivery**
   Output to REST/GraphQL APIs, Kafka topics, or direct cloud warehouse sync.
- **Virtual Data Products**
   Package and expose trusted datasets (e.g., `UserProfile`) with built-in access control.

### Control Plane (Manage)

- **Full Observability**
   Monitor pipeline lag, throughput, and errors with end-to-end lineage.
- **Cloud-Native & Hybrid Ready**
   Kubernetes-based deployment for cloud, on-prem, or hybrid environments.

## Key Concepts

### Data Pipeline

A real-time, always-on dataflow that continuously ingests, transforms, and delivers updates—unlike traditional batch-based ETL.

### Change Data Capture (CDC)

TapData captures row-level changes (inserts, updates, deletes) at the source to eliminate full-table scans. [Learn more →](change-data-capture-mechanism.md)

### Incremental Materialized View (IMV)

A continuously updated view that processes only changes—ideal for low-latency analytics without expensive refreshes.

#### Key Benefits

- **CDC-Powered Updates**
   Keeps views fresh by applying only new changes via binlog or WAL—no batch jobs required.
- **Sub-Second Freshness**
   Each change is processed in real time, with typical latency under 500ms.
- **Optimized for Query Performance**
   Results are persisted in high-speed storage (e.g., Redis, PostgreSQL), accessible via SQL, REST, or GraphQL.

[Learn more about IMV →](../getting-started/build-real-time-materialized-view.md)