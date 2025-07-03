# Create Views

This section shows you how to use TapData to build **Incremental Materialized Views (IMV)**—real-time, high-performance analytics tables that combine data from multiple sources to speed up your insights and decision-making.

## Why Use Incremental Materialized Views?

Imagine you're a data analyst at an e-commerce company. You need to quickly identify **high-value transactions over $300 in Q1 2025** and understand customer membership levels and regions to drive targeted marketing—like sending special coupons or offering tier upgrades to boost retention and sales.

In traditional databases, you'd have to run complex multi-table JOINs between your orders and users tables. When data volumes are large, these queries can be slow and put pressure on production systems. IT might even ask you to run them during off-peak hours—slowing down your entire analysis workflow and limiting your team's agility.

With **TapData’s real-time materialized views**, you can automatically join your orders and users tables into a single, always-up-to-date view synced to MongoDB. Your BI tools or APIs can query this single, denormalized table to get the latest data instantly—no complex SQL, no load on your operational systems. It's fast, scalable, and designed for real-time analytics.

## How to Create Incremental Materialized Views

TapData offers multiple ways to build IMVs, so you can choose what best fits your workflow:

- **IMV Guide** – A step-by-step wizard to get started quickly.
- **Data Pipeline UI** – A visual, drag-and-drop interface for flexible design.
- **TapFlow** – Developer-friendly orchestration and automation for advanced use cases.

Pick the approach that works for you, and start building analytics-ready views with ease!



import DocCardList from '@theme/DocCardList';

<DocCardList />

