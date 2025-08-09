# Terminology

This article introduces common terms used in TapData to help you quickly understand product and feature concepts.

## Data Source

A system or platform from which TapData can ingest data. This includes relational databases (MySQL, PostgreSQL, Oracle), NoSQL databases (MongoDB, Redis), SaaS platforms (Salesforce), message queues (Kafka), and more. Support for additional types such as files, GridFS, UDP, and custom plugins is planned.

## Connection

A configured instance of a data source, including credentials, host information, and metadata access. Connections are the entry point for TapData to interact with external systems.

## ODH (Operational Data Hub)

A real-time architecture pattern built atop FDM and MDM. TapData’s ODH delivers continuously updated, query-ready views of key business entities, breaking down data silos. It powers analytics, APIs, and business logic with a live, unified source of truth.

## CDC (Change Data Capture)

A technique that captures insert, update, and delete operations from source systems in real time. TapData supports both log-based (e.g., binlog, WAL) and trigger-based CDC methods, enabling sub-second latency. CDC serves as the foundation for all downstream layers: FDM, MDM, and ADM.

## FDM (Foundational Data Model)

Also known as the **Platform Cache Layer**, FDM mirrors raw source tables using CDC. It reduces the load on operational databases while preserving data fidelity. The FDM layer maintains source-like schemas and provides a real-time foundation for modeling and transformation.

## MDM (Master Data Model)

A Master Data Model in TapData is a standardized data model that defines the structure, attributes, relationships for core business entities (e.g., Customer, Product) to ensure consistency, accuracy, and reusability across integrated systems. It serves as the single source of truth for master data in real-time synchronization, data pipelines, and API-based data services.

Master data model is typically created based on FDM models, using TapData's real time pipeline. TapData uses JSON to store master data model, hence these pipelines typically reads data from multiple FDM tables and merge them into a rich structured master data model.

The master data model in TapData is continuously updated by every insert/update/delete change from each of the contributing tables.

## ADM (Application Data Model)

The delivery layer where curated data is served to consuming systems. TapData supports low-latency delivery via REST/GraphQL APIs, Kafka streams, and direct sync to analytical databases. ADM enables real-time consumption of cleaned and modeled data across platforms.

## Initialization

The process of synchronizing historical (existing) data before switching to real-time incremental sync (CDC). Initialization typically uses full data replication.

## Full Data Synchronization

A one-time or scheduled process that copies all data from a source to a target. Often used for initial loads, cloud migrations, database sharding, or offline backups.

## Incremental Data Synchronization 

Continuously captures changes (insert/update/delete) from source systems and applies them to the target in real time—typically powered by Change Data Capture (CDC). Enables real-time analytics, disaster recovery, and low-latency data integration.

## Data Replication

A general term for both full and incremental data synchronization. It refers to the process of copying data from one system to another, either completely (full load) or incrementally (CDC-based).

## Data Transformation

The process of modifying, enriching, or reshaping data in motion—between ingestion and delivery. Includes operations like field mapping, joins, filtering, deduplication, data masking, and schema validation.

## Processing Node

A logical unit in the pipeline used to apply transformations or rules. Examples include JavaScript/Java processors, field mappers, row-level filters, deduplicators, and anomaly detectors.

## Source Node / Target Node

In any pipeline, the source node provides the data, while the target node receives it after transformation. Every connection between two nodes is directional and reflects this source-target relationship.

## Shared Mining

A feature that allows multiple pipelines to reuse a single CDC log extraction stream from the same source database. Reduces performance overhead and avoids redundant log parsing.

## Shared Cache

Caches frequently accessed lookup tables or static datasets across pipelines to reduce source load and improve processing speed.

## TapData Agent

A lightweight runtime component that executes pipelines. It connects to data sources and targets, performs transformations, and ensures reliable data delivery.

## TCM (TapData Control Manager)

The centralized management plane for pipeline orchestration, configuration, monitoring, and deployment. Users interact with TCM to create, modify, and observe pipelines.