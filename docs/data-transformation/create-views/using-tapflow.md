# Build View with TapFlow

Use TapData’s TapFlow to build real-time, incremental materialized views with full code-level control—ideal for automation, advanced configurations, and developer workflows.

:::tip
This approach extends the scenario in [Design Incremental Materialized Views](overview.md) and shows you how to implement it programmatically with TapFlow.

:::

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Prerequisites

- Install TapShell and complete initialization.

- Make sure you've already connected your **source MySQL database** and **target MongoDB database** in TapData.

  If you need help setting up connections, see [Connect Data Sources](../../getting-started/connect-data-source.md) for detailed instructions.

## Procedure

```mdx-code-block
<Tabs className="unique-tabs">
<TabItem value="Using Interactive Shell" default>
```

You can build the real-time, incremental materialized view directly in **TapShell** using these steps:

1. Launch the TapShell interactive CLI:

   ```bash
   tap
   ```

2. Define the flow and set **orders** as the main source table:

   ```python
   # Create the Flow and set "orders" as the root table
   orderView = Flow("Order_Advanced_View") \
       .read_from("MySQL_Demo.orders")
   ```

3. Add **lookup** steps to join related tables. Each `.lookup()` call merges data into the main stream at the specified path using the provided join key.

   ```python
   # Embed 'users' as a nested document
   orderView.lookup(
       "MySQL_Demo.users",
       path="user_info",
       type="object",
       relation=[["user_id", "user_id"]]
   )
   
   # Add 'order_items' as an array
   orderView.lookup(
       "MySQL_Demo.order_items",
       path="product_items",
       type="array",
       relation=[["order_id", "order_id"]]
   )
   
   # Flatten 'products' into each order_item
   orderView.lookup(
       "MySQL_Demo.products",
       path="product_items.product",
       type="object",
       relation=[["product_items.product_id", "product_id"]]
   )
   ```

   <details><summary>Understanding type and path in .lookup()</summary>
   These parameters control **how** related data is merged:

   - **type="object"** – embeds the joined record as a nested document at `path`. Ideal for one-to-one enrichments like adding user profiles inside orders.
   - **type="array"** – collects multiple matching records as an array of documents at `path`. Perfect for one-to-many relationships, such as order items.

   :::tip

   To flatten joined fields directly into the parent document—so they appear at the same level without any nesting—use `type="object"` and simply leave `path` empty (`path=""`). This creates a wide-table schema that merges all fields into the root level.

   :::

   </details>

4. Specify the target MongoDB collection to store the resulting view:

   ```python
   # Define the MongoDB target collection
   orderView.write_to("MongoDB_Demo.orders_advanced_imv")
   # Save the task
   orderView.save()
   ```

5. Start the flow and monitor its status:

   ```python
   orderView.start()
   status orderView
   ```

   Example output:

   ```
   job current status is: running, qps is: 3521.2, total rows: 99441, delay is: 332ms
   ```

</TabItem>
<TabItem value="Using Python Script">

Alternatively, you can define the same real-time materialized view as a standalone **Python script** that you can run with:

```bash
python real_time_order_view.py
```

Here's the complete example:

```python title="real_time_order_view.py"
"""
Example: Building a real-time order-wide view (single view) with TapFlow Python SDK

This script reads from multiple MySQL source tables in the 'MySQL_Demo' connection,
joins them into a nested order document, and writes the result to a MongoDB collection.
"""

from tapflow.lib import *
from tapflow.cli.cli import init

# Initialize TapFlow configuration
init()

# Create a new data flow task
orderView = Flow("Order_SingleView_Sync")

# Set the main source table for orders
orderView.read_from("MySQL_Demo.orders")

# Add user profile as a nested document
orderView.lookup(
    "MySQL_Demo.users",
    path="user_info",
    type="object",
    relation=[["user_id", "user_id"]]
)

# Add order items as an array
orderView.lookup(
    "MySQL_Demo.order_items",
    path="product_items",
    type="array",
    relation=[["order_id", "order_id"]]
)

# Flatten product details into each order_item
orderView.lookup(
    "MySQL_Demo.products",
    path="product_items.product",
    type="object",
    relation=[["product_items.product_id", "product_id"]]
)

# Define the MongoDB target collection
orderView.write_to("MongoDB_Demo.orderSingleView")

# Save and start the flow
orderView.save()
orderView.start()
print("Real-time wide-table task started.")

# Monitor task status
while True:
    current_status = orderView.status()
    if current_status == "running":
        print(f"Task status: {current_status}")
        break
    elif current_status == "error":
        print("Task failed to start. Please check your configuration or logs.")
        break
```

**Example Output**
When you run the script, you should see logs similar to:

```
Real-time wide-table task started.
Task status: running
```

</TabItem>
</Tabs>



## Verify Results

Once your task is running, log in to your target MongoDB to explore the new view. Here’s an example document illustrating the nested structure:

```javascript
{
  _id: ObjectId('6868d470d9b9cd512feb6b69'),
  order_id: 'o2001',
  order_amount: Decimal128('759.97'),
  order_status: 'PAID',
  order_time: 2025-01-02T10:00:00.000Z,
  payment_method: 'CREDIT_CARD',
  user_id: 'u001',
  product_items: [
    {
      quantity: 1,
      item_id: 'i3001',
      product_id: 'p101',
      order_id: 'o2001',
      category: 'Electronics',
      product_name: 'Smartphone',
      unit_price: Decimal128('699.99')
    },
    {
      quantity: 2,
      item_id: 'i3002',
      product_id: 'p102',
      order_id: 'o2001',
      category: 'Accessories',
      product_name: 'Phone Case',
      unit_price: Decimal128('29.99')
    }
  ],
  user_info: {
    city: 'New York',
    country: 'USA',
    signup_time: 2024-12-20T12:00:00.000Z,
    user_id: 'u001',
    user_level: 'GOLD',
    user_name: 'Alice'
  }
}
```

This structure is analysis-ready, API-friendly, and tailored for real-time use. Analysts can easily filter and aggregate orders, marketing can segment by user attributes, and developers can serve complete order details in a single API response without expensive joins.

## What’s Next?

- **Monitor your task** to track throughput and latency in real time.
-  **Validate data accuracy** using built-in tools or source queries.
- **Publish the view as an API** so other teams or systems can consume fresh, structured order data via REST or GraphQL.



