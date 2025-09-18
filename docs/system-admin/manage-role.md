# Manage Roles

A role is a collection of one or more permissions. It controls access to features and data across the TapData platform.
 Roles can be assigned to both:

- **[Users](manage-user.md)**, to control what operations they can perform in the TapData UI.
- **[Clients](../publish-apis/create-api-client.md)**, to control which APIs they are authorized to access under API Services.

By pre-defining roles for typical use cases, you can quickly assign them to users or clients without configuring individual permissions each time—streamlining management and enhancing security.

## Procedure

1. Log in to TapData Platform as a system administrator.

2. In the left navigation bar, select **System** > **Roles**.

3. Click **Create Roles** on the right side of the page, and fill in the role name and description, and set whether it is the default role.

4. If you need to manage existing roles, you can choose the operation to perform:

    * **Set Permissions**: Click **Set Permissions** for the target role. On the page that appears, select the permissions that the role will have.

      :::tip

        * As shown below, we only grant **Connections** permission. After this user logs into TapData, they can only see the connection management menu, and creating and copying connections are not allowed for this role.
        * The functionality modules that currently support fine-grained permission control are Connection Management and Data Pipeline.

      :::

      ![Set Role Permissions](../images/grant_data_srouce.png)

    * **Associate Users**: Click **Associate Users** for the target role. In the pop-up dialog, select the target user(s) (multiple selections allowed) and click **Confirm**. The user(s) will automatically inherit all permissions of the current role.

    * **Edit**: Click **Edit** for the target role to set the role name, description, and whether it is the default role.

    * **Delete**: Ensure that the target role is not associated with any other roles, click **Delete** for the target role, and click **Confirm** in the pop-up dialog.

      :::caution

      Once a role is deleted, it cannot be recovered. Please proceed with caution.

      :::
