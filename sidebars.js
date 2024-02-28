/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

// Tapdata Cloud docs list
  cloud: [
    'cloud/what-is-tapdata-cloud',
    {
     type: 'category',
     label: 'Introduction',
     link: {type: 'doc', id: 'cloud/introduction/README'},
     items: [
            'cloud/introduction/architecture',
            'cloud/introduction/features',
            'cloud/introduction/benefits',
            'cloud/introduction/use-cases',
            'cloud/introduction/supported-databases',
            'cloud/introduction/terms',
     ]
    },
{
     type: 'category',
     label: 'Billing',
     link: {type: 'doc', id: 'cloud/billing/README'},
     items: [
            'cloud/billing/billing-overview',
            'cloud/billing/purchase',
            'cloud/billing/renew-subscribe',
            'cloud/billing/expiration',
            'cloud/billing/refund',
     ]
    },
    {
     type: 'category',
     label: 'Quick Start',
     link: {type: 'doc', id: 'cloud/quick-start/README'},
     items: [
            'cloud/quick-start/install-agent',
            'cloud/quick-start/connect-database',
            'cloud/quick-start/create-task',
     ]
    },
{
     type: 'category',
     label: 'Connect Data Sources',
     link: {type: 'doc', id: 'cloud/prerequisites/README'},
     items: [
             'cloud/prerequisites/allow-access-network',
             {
              type: 'category',
              label: 'Warehouses and Lakes',
              link: {type: 'doc', id: 'cloud/prerequisites/warehouses-and-lake/README'},
              items: [
                      'cloud/prerequisites/warehouses-and-lake/big-query',
                      'cloud/prerequisites/warehouses-and-lake/clickhouse',
                      'cloud/prerequisites/warehouses-and-lake/databend',
                      'cloud/prerequisites/warehouses-and-lake/doris',
                      'cloud/prerequisites/warehouses-and-lake/gaussdb',
                      'cloud/prerequisites/warehouses-and-lake/greenplum',
                      'cloud/prerequisites/warehouses-and-lake/selectdb',
                      'cloud/prerequisites/warehouses-and-lake/tablestore',
                      'cloud/prerequisites/warehouses-and-lake/yashandb',
                     ]
              },
             {
              type: 'category',
              label: 'On-Prem Databases',
              link: {type: 'doc', id: 'cloud/prerequisites/on-prem-databases/README'},
              items: [
                      'cloud/prerequisites/on-prem-databases/dameng',
                      'cloud/prerequisites/on-prem-databases/db2',
                      'cloud/prerequisites/on-prem-databases/elasticsearch',
                      'cloud/prerequisites/on-prem-databases/gbase-8a',
                      'cloud/prerequisites/on-prem-databases/gbase-8s',
                      'cloud/prerequisites/on-prem-databases/hive1',
                      'cloud/prerequisites/on-prem-databases/hive3',
                      'cloud/prerequisites/on-prem-databases/informix',
                      'cloud/prerequisites/on-prem-databases/kingbase-es-r3',
                      'cloud/prerequisites/on-prem-databases/kingbase-es-r6',
                      'cloud/prerequisites/on-prem-databases/mariadb',
                      'cloud/prerequisites/on-prem-databases/mongodb',                      
                      'cloud/prerequisites/on-prem-databases/mrs-hive3',
                      'cloud/prerequisites/on-prem-databases/mysql',
                      'cloud/prerequisites/on-prem-databases/mysql-pxc',
                      'cloud/prerequisites/on-prem-databases/oceanbase',
                      'cloud/prerequisites/on-prem-databases/opengauss',
                      'cloud/prerequisites/on-prem-databases/oracle',
                      'cloud/prerequisites/on-prem-databases/postgresql',
                      'cloud/prerequisites/on-prem-databases/redis',
                      'cloud/prerequisites/on-prem-databases/sqlserver',
                      'cloud/prerequisites/on-prem-databases/tdengine',
                      'cloud/prerequisites/on-prem-databases/tidb',
                      ]
              },
              {
               type: 'category',
               label: 'Cloud Databases',
               link: {type: 'doc', id: 'cloud/prerequisites/cloud-databases/README'},
               items: [
                       'cloud/prerequisites/cloud-databases/aliyun-adb-mysql',
                       'cloud/prerequisites/cloud-databases/aliyun-adb-postgresql',
                       'cloud/prerequisites/cloud-databases/aliyun-mongodb',
                       'cloud/prerequisites/cloud-databases/aliyun-rds-for-mariadb',
                       'cloud/prerequisites/cloud-databases/aliyun-rds-for-mongodb',
                       'cloud/prerequisites/cloud-databases/aliyun-rds-for-mysql',
                       'cloud/prerequisites/cloud-databases/aliyun-rds-for-pg',
                       'cloud/prerequisites/cloud-databases/aliyun-rds-for-sql-server',
                       'cloud/prerequisites/cloud-databases/amazon-rds-mysql',
                       'cloud/prerequisites/cloud-databases/mongodb-atlas',
                       'cloud/prerequisites/cloud-databases/polardb-mysql',
                       'cloud/prerequisites/cloud-databases/polardb-postgresql',
                       'cloud/prerequisites/cloud-databases/tencentdb-for-mariadb',
                       'cloud/prerequisites/cloud-databases/tencentdb-for-mongodb',
                       'cloud/prerequisites/cloud-databases/tencentdb-for-mysql',
                       'cloud/prerequisites/cloud-databases/tencentdb-for-pg',
                       'cloud/prerequisites/cloud-databases/tencentdb-for-sql-server',
                      ]
               },
              {
               type: 'category',
               label: 'MQ and Middleware',
               link: {type: 'doc', id: 'cloud/prerequisites/mq-and-middleware/README'},
               items: [
                       'cloud/prerequisites/mq-and-middleware/activemq',
                       'cloud/prerequisites/mq-and-middleware/ai-chat',
                       'cloud/prerequisites/mq-and-middleware/bes-channels',
                       'cloud/prerequisites/mq-and-middleware/hazelcast-cloud',
                       'cloud/prerequisites/mq-and-middleware/kafka',
                       'cloud/prerequisites/mq-and-middleware/rabbitmq',
                       'cloud/prerequisites/mq-and-middleware/rocketmq',
                      ]
               },
               {
               type: 'category',
               label: 'CRM and Sales Analytics',
               link: {type: 'doc', id: 'cloud/prerequisites/crm-and-sales-analytics/README'},
               items: [
                       'cloud/prerequisites/crm-and-sales-analytics/hubspot',
                       'cloud/prerequisites/crm-and-sales-analytics/metabase',
                       'cloud/prerequisites/crm-and-sales-analytics/salesforce',
                       'cloud/prerequisites/crm-and-sales-analytics/zoho-crm',
                      ]
               },
               {
                type: 'category',
                label: 'SaaS and APIs',
                link: {type: 'doc', id: 'cloud/prerequisites/saas-and-api/README'},
                items: [
                        'cloud/prerequisites/saas-and-api/coding',
                        'cloud/prerequisites/saas-and-api/github',
                        'cloud/prerequisites/saas-and-api/lark-approval',
                        'cloud/prerequisites/saas-and-api/lark-doc',
                        'cloud/prerequisites/saas-and-api/lark-im',
                        'cloud/prerequisites/saas-and-api/lark-task',
                        'cloud/prerequisites/saas-and-api/quick-api',
                        'cloud/prerequisites/saas-and-api/vika',
                        'cloud/prerequisites/saas-and-api/zoho-desk',
                       ]
               },
               {
                type: 'category',
                label: 'E-Commerce',
                link: {type: 'doc', id: 'cloud/prerequisites/e-commerce/README'},
                items: [
                        'cloud/prerequisites/e-commerce/alibaba-1688',
                        'cloud/prerequisites/e-commerce/shein',
                       ]
               },
               {
                type: 'category',
                label: 'Files',
                link: {type: 'doc', id: 'cloud/prerequisites/files/README'},
                items: [
                        'cloud/prerequisites/files/csv',
                        'cloud/prerequisites/files/excel',
                        'cloud/prerequisites/files/json',
                        'cloud/prerequisites/files/xml',
                       ]
               },
               {
                type: 'category',
                label: 'Others',
                link: {type: 'doc', id: 'cloud/prerequisites/others/README'},
                items: [
                        'cloud/prerequisites/others/custom-connection',
                        'cloud/prerequisites/others/dummy',
                        'cloud/prerequisites/others/http-receiver',
                       ]
               },
     ]
    },
    {
     type: 'category',
     label: 'User Guide',
     link: {type: 'doc', id: 'cloud/user-guide/README'},
     items: [
             'cloud/user-guide/workshop',
             {
              type: 'category',
              label: 'Data Replication',
              link: {type: 'doc', id: 'cloud/user-guide/copy-data/README'},
              items:[
                    'cloud/user-guide/copy-data/create-task',
                    'cloud/user-guide/copy-data/create-task-via-drag',
                    'cloud/user-guide/copy-data/manage-task',
                    'cloud/user-guide/copy-data/monitor-task',
                    ]
            },
            {
             type: 'category',
             label: 'Data Transformation',
             link: {type: 'doc', id: 'cloud/user-guide/data-development/README'},
             items:[
                   'cloud/user-guide/data-development/create-task',
                   'cloud/user-guide/data-development/create-materialized-view',
                   'cloud/user-guide/data-development/manage-task',
                   'cloud/user-guide/data-development/process-node',
                   'cloud/user-guide/data-development/monitor-task',
                   ]
             },
             {
              type: 'category',
              label: 'Real-Time Data Hub',
              link: {type: 'doc', id: 'cloud/user-guide/real-time-data-hub/README'},
              items:[
                    'cloud/user-guide/real-time-data-hub/enable-real-time-data-hub',
                    'cloud/user-guide/real-time-data-hub/dashboard',
                    'cloud/user-guide/real-time-data-hub/create-task',
                    ]
             },
             {
             type: 'category',
             label: 'Advanced Settings',
             link: {type: 'doc', id: 'cloud/user-guide/advanced-settings/README'},
             items:[
                   'cloud/user-guide/advanced-settings/share-mining',
                   'cloud/user-guide/advanced-settings/manage-external-storage',
                   ]
             },             
             'cloud/user-guide/manage-agent',
             'cloud/user-guide/manage-connection',
             'cloud/user-guide/custom-node',
             'cloud/user-guide/handle-schema-changes',
             'cloud/user-guide/operation-log',
             'cloud/user-guide/error-code-solution',
             'cloud/user-guide/trouble-shooting-connection',
             'cloud/user-guide/no-supported-data-type',
            ]
    },
    {
     type: 'category',
     label: 'Tutorials',
     link: {type: 'doc', id: 'cloud/best-practice/README'},
     items: [
            'cloud/best-practice/data-sync',
            'cloud/best-practice/mysql-to-clickhouse',
            'cloud/best-practice/mysql-to-bigquery',
            'cloud/best-practice/sql-server-to-bigquery',
            'cloud/best-practice/oracle-to-tablestore',
            'cloud/best-practice/mysql-to-oracle',
            'cloud/best-practice/excel-to-mysql',
            
        ]
        },
     {
      type: 'category',
      label: 'FAQ',
      link: {type: 'doc', id: 'cloud/faq/README'},
      items:[
             'cloud/faq/data-security',
             'cloud/faq/agent-installation',
             'cloud/faq/database',
             'cloud/faq/task',
      ]
     },
     {
      type: 'category',
      label: 'Appendix',
      link: {type: 'doc', id: 'cloud/appendix/README'},
      items: [
              'cloud/appendix/standard-js',
              'cloud/appendix/enhanced-js'
              ]
     },
     'cloud/release-notes',
  ],
// Tapdata Enterprise docs list
  enterprise: [
  'enterprise/what-is-tapdata-enterprise',
    {
     type: 'category',
     label: 'Introduction',
     link: {type: 'doc', id: 'enterprise/introduction/README'},
     items: [
             'enterprise/introduction/architecture',
             'enterprise/introduction/features',
             'enterprise/introduction/benefits',
             'enterprise/introduction/use-cases',
             'enterprise/introduction/supported-databases',
             'enterprise/introduction/terms',
       ]
    },
    {
     type: 'category',
     label: 'Quick Start',
     link: {type: 'doc', id: 'enterprise/quick-start/README'},
     items: [
            {
             type: 'category',
             label: 'Install Tapdata',
             link: {type: 'doc', id: 'enterprise/quick-start/install/README'},
             items: [
                    'enterprise/quick-start/install/install-tapdata-stand-alone',
                    'enterprise/quick-start/install/install-on-windows',
             ]
            },
            'enterprise/quick-start/connect-database',
            'enterprise/quick-start/create-task',
     ]
    },
{
         type: 'category',
         label: 'Connect Data Sources',
         link: {type: 'doc', id: 'enterprise/prerequisites/README'},
         items: [
                 {
                  type: 'category',
                  label: 'Data Warehouse and Data Lake',
                  link: {type: 'doc', id: 'enterprise/prerequisites/warehouses-and-lake/README'},
                  items: [
                          'enterprise/prerequisites/warehouses-and-lake/big-query',
                          'enterprise/prerequisites/warehouses-and-lake/clickhouse',
                          'enterprise/prerequisites/warehouses-and-lake/databend',
                          'enterprise/prerequisites/warehouses-and-lake/doris',
                          'enterprise/prerequisites/warehouses-and-lake/gaussdb',
                          'enterprise/prerequisites/warehouses-and-lake/greenplum',
                          'enterprise/prerequisites/warehouses-and-lake/selectdb',
                          'enterprise/prerequisites/warehouses-and-lake/tablestore',
                          'enterprise/prerequisites/warehouses-and-lake/yashandb',
                         ]
                  },
                 {
                  type: 'category',
                  label: 'On-Premises Databases',
                  link: {type: 'doc', id: 'enterprise/prerequisites/on-prem-databases/README'},
                  items: [
                          'enterprise/prerequisites/on-prem-databases/dameng',
                          'enterprise/prerequisites/on-prem-databases/db2',
                          'enterprise/prerequisites/on-prem-databases/elasticsearch',
                          'enterprise/prerequisites/on-prem-databases/gbase-8a',
                          'enterprise/prerequisites/on-prem-databases/gbase-8s',
                          'enterprise/prerequisites/on-prem-databases/hive1',
                          'enterprise/prerequisites/on-prem-databases/hive3',
                          'enterprise/prerequisites/on-prem-databases/informix',
                          'enterprise/prerequisites/on-prem-databases/kingbase-es-r3',
                          'enterprise/prerequisites/on-prem-databases/kingbase-es-r6',
                          'enterprise/prerequisites/on-prem-databases/mariadb',
                          'enterprise/prerequisites/on-prem-databases/mongodb',
                          'enterprise/prerequisites/on-prem-databases/mongodb-atlas',
                          'enterprise/prerequisites/on-prem-databases/mrs-hive3',
                          'enterprise/prerequisites/on-prem-databases/mysql',
                          'enterprise/prerequisites/on-prem-databases/mysql-pxc',
                          'enterprise/prerequisites/on-prem-databases/oceanbase',
                          'enterprise/prerequisites/on-prem-databases/opengauss',
                          'enterprise/prerequisites/on-prem-databases/oracle',
                          'enterprise/prerequisites/on-prem-databases/postgresql',
                          'enterprise/prerequisites/on-prem-databases/redis',
                          'enterprise/prerequisites/on-prem-databases/sqlserver',
                          'enterprise/prerequisites/on-prem-databases/tdengine',
                          'enterprise/prerequisites/on-prem-databases/tidb',
                          ]
                  },
                  {
                   type: 'category',
                   label: 'Cloud Databases',
                   link: {type: 'doc', id: 'enterprise/prerequisites/cloud-databases/README'},
                   items: [
                           'enterprise/prerequisites/cloud-databases/aliyun-adb-mysql',
                           'enterprise/prerequisites/cloud-databases/aliyun-adb-postgresql',
                           'enterprise/prerequisites/cloud-databases/aliyun-mongodb',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-mariadb',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-mongodb',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-mysql',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-pg',
                           'enterprise/prerequisites/cloud-databases/aliyun-rds-for-sql-server',
                           'enterprise/prerequisites/cloud-databases/amazon-rds-mysql',
                           'enterprise/prerequisites/cloud-databases/polardb-mysql',
                           'enterprise/prerequisites/cloud-databases/polardb-postgresql',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-mariadb',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-mongodb',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-mysql',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-pg',
                           'enterprise/prerequisites/cloud-databases/tencentdb-for-sql-server',
                          ]
                   },
                  {
                   type: 'category',
                   label: 'Message Queue and Middleware',
                   link: {type: 'doc', id: 'enterprise/prerequisites/mq-and-middleware/README'},
                   items: [
                           'enterprise/prerequisites/mq-and-middleware/activemq',
                           'enterprise/prerequisites/mq-and-middleware/ai-chat',
                           'enterprise/prerequisites/mq-and-middleware/bes-channels',
                           'enterprise/prerequisites/mq-and-middleware/hazelcast-cloud',
                           'enterprise/prerequisites/mq-and-middleware/kafka',
                           'enterprise/prerequisites/mq-and-middleware/rabbitmq',
                           'enterprise/prerequisites/mq-and-middleware/rocketmq',
                          ]
                   },
                   {
                   type: 'category',
                   label: 'CRM and Sales Analytics',
                   link: {type: 'doc', id: 'enterprise/prerequisites/crm-and-sales-analytics/README'},
                   items: [
                           'enterprise/prerequisites/crm-and-sales-analytics/hubspot',
                           'enterprise/prerequisites/crm-and-sales-analytics/metabase',
                           'enterprise/prerequisites/crm-and-sales-analytics/salesforce',
                           'enterprise/prerequisites/crm-and-sales-analytics/zoho-crm',
                          ]
                   },
                   {
                    type: 'category',
                    label: 'SaaS and APIs',
                    link: {type: 'doc', id: 'enterprise/prerequisites/saas-and-api/README'},
                    items: [
                            'enterprise/prerequisites/saas-and-api/coding',
                            'enterprise/prerequisites/saas-and-api/github',
                            'enterprise/prerequisites/saas-and-api/lark-approval',
                            'enterprise/prerequisites/saas-and-api/lark-doc',
                            'enterprise/prerequisites/saas-and-api/lark-im',
                            'enterprise/prerequisites/saas-and-api/lark-task',
                            'enterprise/prerequisites/saas-and-api/quick-api',
                            'enterprise/prerequisites/saas-and-api/vika',
                            'enterprise/prerequisites/saas-and-api/zoho-desk',
                           ]
                   },
                   {
                    type: 'category',
                    label: 'E-Commerce',
                    link: {type: 'doc', id: 'enterprise/prerequisites/e-commerce/README'},
                    items: [
                            'enterprise/prerequisites/e-commerce/alibaba-1688',
                            'enterprise/prerequisites/e-commerce/shein',
                           ]
                   },
                   {
                    type: 'category',
                    label: 'Files',
                    link: {type: 'doc', id: 'enterprise/prerequisites/files/README'},
                    items: [
                            'enterprise/prerequisites/files/csv',
                            'enterprise/prerequisites/files/excel',
                            'enterprise/prerequisites/files/json',
                            'enterprise/prerequisites/files/xml',
                           ]
                   },
                   {
                    type: 'category',
                    label: 'Others',
                    link: {type: 'doc', id: 'enterprise/prerequisites/others/README'},
                    items: [
                            'enterprise/prerequisites/others/custom-connection',
                            'enterprise/prerequisites/others/dummy',
                            'enterprise/prerequisites/others/http-receiver',
                           ]
                   },
         ]
    },
    {
     type: 'category',
     label: 'User Guide',
     link: {type: 'doc', id: 'enterprise/user-guide/README'},
     items: [
             'enterprise/user-guide/workshop',
             'enterprise/user-guide/manage-connection',
             {
              type: 'category',
              label: '实时数据中心',
              link: {type: 'doc', id: 'enterprise/user-guide/data-console/README'},
              items:[
                    {
                     type: 'category',
                     label: '数据集成模式',
                     link: {type: 'doc', id: 'enterprise/user-guide/data-console/etl-mode/README'},
                     items:[
                            'enterprise/user-guide/data-console/etl-mode/etl-mode-dashboard',
                            'enterprise/user-guide/data-console/etl-mode/create-etl-task',
                           ]
                    },
                    {
                     type: 'category',
                     label: '数据服务平台模式',
                     link: {type: 'doc', id: 'enterprise/user-guide/data-console/daas-mode/README'},
                     items:[
                            'enterprise/user-guide/data-console/daas-mode/enable-daas-mode',
                            'enterprise/user-guide/data-console/daas-mode/daas-mode-dashboard',
                            'enterprise/user-guide/data-console/daas-mode/create-daas-task',
                           ]
                    },
                    ]
             },
             {
              type: 'category',
              label: '数据管道',
              link: {type: 'doc', id: 'enterprise/user-guide/data-pipeline/README'},
              items:[
                    {
                     type: 'category',
                     label: '数据复制',
                     link: {type: 'doc', id: 'enterprise/user-guide/data-pipeline/copy-data/README'},
                     items:[
                            'enterprise/user-guide/data-pipeline/copy-data/create-task',
                            'enterprise/user-guide/data-pipeline/copy-data/process-node',
                            'enterprise/user-guide/data-pipeline/copy-data/monitor-task',
                           ]
                    },
                    {
                     type: 'category',
                     label: '数据转换',
                     link: {type: 'doc', id: 'enterprise/user-guide/data-pipeline/data-development/README'},
                     items:[
                            'enterprise/user-guide/data-pipeline/data-development/create-task',
                            'enterprise/user-guide/data-pipeline/data-development/create-materialized-view',
                            'enterprise/user-guide/data-pipeline/data-development/manage-task',
                            'enterprise/user-guide/data-pipeline/data-development/process-node',
                            'enterprise/user-guide/data-pipeline/data-development/monitor-task',
                           ]
                    },
                    'enterprise/user-guide/data-pipeline/verify-data',
                    'enterprise/user-guide/data-pipeline/pre-check',
                    ]
             },
             {
              type: 'category',
              label: 'Advanced Settings',
              link: {type: 'doc', id: 'enterprise/user-guide/advanced-settings/README'},
              items:[
                     'enterprise/user-guide/advanced-settings/share-cache',
                     'enterprise/user-guide/advanced-settings/manage-function',
                     'enterprise/user-guide/advanced-settings/custom-node',
                     'enterprise/user-guide/advanced-settings/share-mining',
                    ]
             },
             {
              type: 'category',
              label: 'Data Service',
              link: {type: 'doc', id: 'enterprise/user-guide/data-service/README'},
              items:[
                     'enterprise/user-guide/data-service/manage-app',
                     'enterprise/user-guide/data-service/create-api-service',
                     'enterprise/user-guide/data-service/create-api-client',
                     'enterprise/user-guide/data-service/create-api-server',
                     'enterprise/user-guide/data-service/audit-api',
                     'enterprise/user-guide/data-service/monitor-api-request',
                     'enterprise/user-guide/data-service/api-auth',
                     'enterprise/user-guide/data-service/query-via-restful',
                     'enterprise/user-guide/data-service/query-via-graphql',
                     'enterprise/user-guide/data-service/api-query-params',
                    ]
             },
             {
              type: 'category',
              label: 'Manage System',
              link: {type: 'doc', id: 'enterprise/user-guide/manage-system/README'},
              items:[
                     'enterprise/user-guide/manage-system/manage-role',
                     'enterprise/user-guide/manage-system/manage-user',
                     'enterprise/user-guide/manage-system/manage-cluster',
                     'enterprise/user-guide/manage-system/manage-external-storage',
                    ]
             },
             {
              type: 'category',
              label: 'Other Settings',
              link: {type: 'doc', id: 'enterprise/user-guide/other-settings/README'},
              items:[
                     'enterprise/user-guide/other-settings/system-settings',
                     'enterprise/user-guide/other-settings/manage-license',
                     'enterprise/user-guide/other-settings/check-version',
                    ]
             },
             'enterprise/user-guide/notification',
             'enterprise/user-guide/no-supported-data-type',
        ]
    },
    {
     type: 'category',
     label: 'Production Admin',
     link: {type: 'doc', id: 'enterprise/production-admin/README'},
     items: [
            'enterprise/production-admin/install-tapdata-ha',
            'enterprise/production-admin/install-replica-mongodb',
            'enterprise/production-admin/operation',
            'enterprise/production-admin/emergency-plan',
        ]
    },
    {
     type: 'category',
     label: 'Data Pipeline Tutorial',
     link: {type: 'doc', id: 'enterprise/pipeline-tutorial/README'},
     items: [
            'enterprise/pipeline-tutorial/excel-to-mysql',
            'enterprise/pipeline-tutorial/mysql-to-redis',
            'enterprise/pipeline-tutorial/oracle-to-kafka',
            'enterprise/pipeline-tutorial/extract-array',
        ]
    },
    {
         type: 'category',
         label: 'Best Practices',
         link: {type: 'doc', id: 'enterprise/best-practice/README'},
         items: [
                'enterprise/best-practice/data-sync',
                'enterprise/best-practice/handle-schema-change',
                'enterprise/best-practice/heart-beat-task',
                'enterprise/best-practice/alert-via-qqmail',
                'enterprise/best-practice/full-breakpoint-resumption',
                'enterprise/best-practice/raw-logs-solution',
            ]
        },
    {
     type: 'category',
     label: 'TroubleShooting',
     link: {type: 'doc', id: 'enterprise/troubleshooting/README'},
     items: [
            'enterprise/troubleshooting/error-code',
            'enterprise/troubleshooting/error-and-solutions',
        ]
    },
    {
     type: 'category',
     label: 'FAQs',
     link: {type: 'doc', id: 'enterprise/faq/README'},
     items: [
            'enterprise/faq/use-product',
            'enterprise/faq/data-pipeline',
        ]
    },
    {
     type: 'category',
     label: 'Appendix',
     link: {type: 'doc', id: 'enterprise/appendix/README'},
     items: [
            'enterprise/appendix/standard-js',
            'enterprise/appendix/enhanced-js',
            'enterprise/appendix/benchmark'
        ]
    },
  'enterprise/support',
  'enterprise/release-notes',
 ]
};


module.exports = sidebars;
