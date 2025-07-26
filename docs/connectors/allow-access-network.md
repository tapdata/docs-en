# Configure Network Access

Before deploying the Agent, you need to refer to the requirements in this document and adjust the relevant firewall to ensure its communication ability. The workflow of the Agent is shown below:

![](../images/architecture.png)



| Requirements | Description |
| ---------------------------------- | ------------------------------------------------------------ |
| Agent can connect to source database's port. | Ensure that the Agent can read data from the source database.  |
| Agent can connect to target database's port. | Ensure that the Agent can write data to the target database.  |
| Agent can connect to extranet. | Ensure the Agent can report task status, retrieve configuration, and execute tasks to/from TapData Cloud.  |

