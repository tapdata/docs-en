# Step 4: Publish Your View as an API

After creating your Incremental Materialized View for high-value order analysis, you can easily publish it as an API. This lets your marketing platforms, BI dashboards, or any downstream services securely access up-to-date data in real time—without additional ETL or complex SQL queries.

## Procedure

Follow these steps to publish your materialized view as an API service.

1. Create an Application

   Applications help organize your APIs by business domain. In this example, you’ll create an app called **E-commerce Analytics** to keep all related services together.

   1. In the left navigation panel, go to **Data Services > Application List**.

   2. In the top right corner, click **Create Application**.

   3. In the dialog, enter a name and description, then click **Save**.

      ![Create Application](../images/create_api_group.png)

2. Create an API Service.

   1. Go to **Data Services > Service Management** in the navigation panel.

   2. Click **Create Service** in the top right, then fill in the basic service details:
      
      ![Create API for view](../images/create_api_for_order_flat_view.png)
      
      - **Service Name**: Enter a clear, meaningful name for easy identification.
      - **Access Scope**: Define which roles can call this API.
      -  **Own Application**: Select the application you just created, such as **E-commerce Analytics**.
      - **Type**: Choose **MongoDB** as the data source type.
      -  **Name**: Select the Incremental Materialized View you created earlier—for example, `order_flat_view`.
      - **API Path Settings**: You can keep the default endpoint or customize it as needed.
      
   3. Click **Save**.

3. Publish the API.

   Locate the API service you just created in the list. In the actions column, click **Publish** to make it available for downstream systems.

### What’s next?

Create an API **client key**, choose **token or basic auth**, and share the endpoint with downstream systems. Your BI dashboards, CRM, or marketing automation tools can now fetch high-value-order data via REST or GraphQL—streaming fresh results every time without touching the production source database.