# Create a Client


To manage and create API calls, an API client is required. Applications that developers design and develop, or any other applications needing to call API interfaces (referred to collectively as client applications), must register with the data publishing system. Upon registration, you will receive a unique client ID (client_id) and client secret (client_secret).

## Procedure

1. [Log in to TapData Platform](../user-guide/log-in.md).

2. In the left navigation bar, select **Data Services** > **API Clients**.

3. Click **Create a Client** in the top right corner, fill in the relevant information, and click **OK**.

   ![](../images/create_api_client.png)

   - **Client name**: A meaningful name to identify the client. For example, `Client_for_BI`.

   - **Grant Type**: The OAuth2 grant types supported by this client. You can select one or more from:– **Implicit**– **Client Credentials**– **Refresh Token**. Choose based on how the client will authenticate.

   - **Client Secret**: Auto-generated credential used by the client to authenticate. Click **Generate** to create one.
   
     :::tip
   
     The client secret is an important basis for client applications to obtain API access authorization and should be properly stored to avoid transmission in public network environments.
   
     :::
   
   - **Permission scope**  Assign the [role(s)](../system-admin/manage-role.md) this client should inherit (e.g. `DefaultRoleForNewUser`, `admin`). This determines what APIs and resources the client can access.
   
   - **Redirect URI**  The URI to which the system redirects after a successful authorization. Typically used in OAuth2 flows.
   
   - **Show to the menu**  Choose **Yes** to display this client in the app’s client list; choose **No** to hide it from the default view.
