import React, { useEffect, useRef } from 'react';
import styles from './TapDataFlowAnimation.module.css';

const TapDataFlowAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const usersTable = container.querySelector('.users');
    const ordersTable = container.querySelector('.orders');
    const tapdataPlatform = container.querySelector('.tapdata-platform');
    const materializedView = container.querySelector('.mv-container');
    const applications = container.querySelector('.applications');

    const createDataChangeIndicator = (table, type) => {
      if (!table) return;
      
      const indicator = document.createElement('div');
      indicator.className = `data-indicator ${type}`;

      const rect = table.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      indicator.style.left = (rect.left - containerRect.left + Math.random() * rect.width) + 'px';
      indicator.style.top = (rect.top - containerRect.top + Math.random() * rect.height) + 'px';

      container.appendChild(indicator);

      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.remove();
        }
      }, 2000);
    };

    const createDataFlow = (fromElement, toElement, dataType) => {
      if (!fromElement || !toElement) return;

      const dataFlow = document.createElement('div');
      dataFlow.className = `data-flow ${dataType} active`;

      const fromRect = fromElement.getBoundingClientRect();
      const toRect = toElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const startX = fromRect.right - containerRect.left;
      const startY = fromRect.top + fromRect.height / 2 - containerRect.top;
      const endX = toRect.left - containerRect.left;
      const endY = toRect.top + toRect.height / 2 - containerRect.top;

      dataFlow.style.left = startX + 'px';
      dataFlow.style.top = startY + 'px';

      container.appendChild(dataFlow);

      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const duration = Math.max(2000, distance * 5);

      dataFlow.style.transition = `all ${duration}ms ease-in-out`;

      setTimeout(() => {
        dataFlow.style.left = endX + 'px';
        dataFlow.style.top = endY + 'px';
        dataFlow.style.opacity = '0';
      }, 50);

      setTimeout(() => {
        if (dataFlow.parentNode) {
          dataFlow.remove();
        }
      }, duration + 100);
    };

    const startDataChangeIndicators = () => {
      setInterval(() => {
        createDataChangeIndicator(usersTable, 'users');
      }, 800);

      setInterval(() => {
        createDataChangeIndicator(ordersTable, 'orders');
      }, 900);

      setInterval(() => {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            createDataChangeIndicator(usersTable, 'users');
          }, i * 150);
        }
      }, 2500);

      setInterval(() => {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            createDataChangeIndicator(ordersTable, 'orders');
          }, i * 180);
        }
      }, 2800);
    };

    const startDataFlowAnimations = () => {
      setInterval(() => {
        createDataFlow(usersTable, tapdataPlatform, 'users-data');
      }, 1000);

      setInterval(() => {
        createDataFlow(ordersTable, tapdataPlatform, 'orders-data');
      }, 1200);

      setInterval(() => {
        createDataFlow(tapdataPlatform, materializedView, 'merged-data');
      }, 1400);

      setInterval(() => {
        createDataFlow(materializedView, applications, 'merged-data');
      }, 1600);

      setInterval(() => {
        createDataFlow(usersTable, tapdataPlatform, 'users-data');
        setTimeout(() => {
          createDataFlow(ordersTable, tapdataPlatform, 'orders-data');
        }, 300);
      }, 2500);

      setInterval(() => {
        createDataFlow(tapdataPlatform, materializedView, 'merged-data');
        setTimeout(() => {
          createDataFlow(materializedView, applications, 'merged-data');
        }, 400);
      }, 3000);
    };

    setTimeout(() => {
      startDataChangeIndicators();
      startDataFlowAnimations();
    }, 3000);

    return () => {
      const indicators = container.querySelectorAll('.data-indicator');
      const flows = container.querySelectorAll('.data-flow');
      
      indicators.forEach(el => el.remove());
      flows.forEach(el => el.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <h1 className={styles.title}></h1>
      
      <div className={styles.flowContainer}>
        {/* Multi-Tables */}
        <div className={styles.multiTables}>
          <div className={styles.sectionTitle}>Multi-Tables</div>
          <div className={`${styles.valueBadge} ${styles.zeroImpact}`}>Zero Impact</div>
          <div className={styles.tablesContainer}>
            <div className={`${styles.table} ${styles.users} users`}>
              <div className={styles.tableHeader}>users</div>
              <div className={styles.tableRow}>
                <span>user_id</span>
              </div>
              <div className={styles.tableRow}>
                <span>user_name</span>
              </div>
              <div className={styles.tableRow}>
                <span>user_level</span>
              </div>
              <div className={styles.tableRow}>
                <span>country</span>
              </div>
              <div className={styles.tableRow}>
                <span>city</span>
              </div>
              <div className={styles.tableRow}>
                <span>signup_time</span>
              </div>
            </div>
            
            <div className={`${styles.table} ${styles.orders} orders`}>
              <div className={styles.tableHeader}>orders</div>
              <div className={styles.tableRow}>
                <span>order_id</span>
              </div>
              <div className={styles.tableRow}>
                <span>user_id</span>
              </div>
              <div className={styles.tableRow}>
                <span>order_status</span>
              </div>
              <div className={styles.tableRow}>
                <span>order_amount</span>
              </div>
              <div className={styles.tableRow}>
                <span>payment_method</span>
              </div>
              <div className={styles.tableRow}>
                <span>order_time</span>
              </div>
              <div className={styles.tableRow} style={{opacity: 0.6, fontStyle: 'italic'}}>
                <span>...</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.arrow} ${styles.animated}`}>
          <div className={styles.flowChevron}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08C8.14 3.31 6.88 3.31 6.11 4.08C5.34 4.85 5.34 6.11 6.11 6.88L11.23 12L6.11 17.12C5.34 17.89 5.34 19.15 6.11 19.92C6.88 20.69 8.14 20.69 8.91 19.92Z" fill="#3b82f6"/>
            </svg>
          </div>
          <div className={styles.flowChevron}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08C8.14 3.31 6.88 3.31 6.11 4.08C5.34 4.85 5.34 6.11 6.11 6.88L11.23 12L6.11 17.12C5.34 17.89 5.34 19.15 6.11 19.92C6.88 20.69 8.14 20.69 8.91 19.92Z" fill="#3b82f6"/>
            </svg>
          </div>
        </div>

        {/* Processing */}
        <div className={styles.processing}>
          <div className={styles.sectionTitle}>Real-time CDC</div>
          <div className={`${styles.tapdataPlatform} tapdata-platform`}>
            <div className={styles.processingIndicator}></div>
            <div className={styles.dataProcessor}>
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path d="M875.833 404.542H743.368L737.08 380.7c-3.037-24.08-22.568-43.008-46.925-45.113-0.35-0.033-0.703-0.054-1.054-0.08-0.335-0.022-0.669-0.05-1.006-0.066a50.568 50.568 0 0 0-3.878-0.062h-102.33v-34.582h103.747c28.647 0 51.873-23.223 51.873-51.873s-23.225-51.873-51.873-51.873H391.689c-28.649 0-51.873 23.223-51.873 51.873s23.223 51.873 51.873 51.873h121.036v34.582H397.878c-12.445-1.462-24.639 1.758-34.603 8.481-12.19 7.999-20.803 20.989-22.935 36.071l-6.491 24.612h-45.905c-28.649 0-51.873 23.223-51.873 51.873v86.454H201.49v-86.454c0-28.649-23.225-51.873-51.873-51.873-28.649 0-51.874 23.223-51.874 51.873v242.072c0 28.648 23.225 51.873 51.874 51.873 28.647 0 51.873-23.225 51.873-51.873v-86.454h34.582v86.454c0 28.648 23.223 51.873 51.873 51.873h83.854l45.836 45.975c9.294 13.974 25.178 23.188 43.219 23.188h276.654c28.648 0 51.873-23.225 51.873-51.873 0-28.649-23.225-51.873-51.873-51.873H480.463l-45.057-45.195c-7.33-11.46-19.032-19.846-32.762-22.799a50.681 50.681 0 0 0-18.783-1.169h-44.044V508.287h33.182c1.287 0.028 2.567 0.007 3.841-0.062 0.371-0.017 0.737-0.048 1.106-0.073 0.318-0.024 0.636-0.042 0.953-0.072 24.367-2.096 43.91-21.029 46.947-45.116l6.288-23.84h212.952l6.49 24.608c2.133 15.104 10.767 28.109 22.985 36.106 9.951 6.697 22.119 9.904 34.538 8.449h114.862V767.65c0 28.648 23.223 51.873 51.873 51.873 28.647 0 51.873-23.225 51.873-51.873V456.414c-0.001-28.649-23.226-51.872-51.874-51.872z" fill="#ffffff"/>
                <path d="M875.833 715.777c28.647 0 51.873 23.223 51.873 51.873 0 28.648-23.225 51.873-51.873 51.873-28.649 0-51.873-23.225-51.873-51.873 0.001-28.649 23.224-51.873 51.873-51.873zM287.944 646.614c28.647 0 51.873 23.223 51.873 51.873 0 28.647-23.225 51.873-51.873 51.873-28.649 0-51.873-23.225-51.873-51.873 0.001-28.65 23.224-51.873 51.873-51.873zM685.634 335.378c28.647 0 51.873 23.223 51.873 51.873 0 28.647-23.225 51.873-51.873 51.873-28.649 0-51.874-23.225-51.874-51.873 0-28.649 23.225-51.873 51.874-51.873z" fill="#ffffff"/>
              </svg>
            </div>
            <div className={styles.platformTitle}>TapData</div>
            <div className={styles.platformSubtitle}>Operational Data Hub</div>
            <div className={styles.platformSubtitle} style={{fontSize: '10px', marginTop: '4px', opacity: 0.8}}>Incremental Processing</div>
          </div>
        </div>

        <div className={`${styles.arrow} ${styles.animated}`}>
          <div className={styles.flowChevron}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08C8.14 3.31 6.88 3.31 6.11 4.08C5.34 4.85 5.34 6.11 6.11 6.88L11.23 12L6.11 17.12C5.34 17.89 5.34 19.15 6.11 19.92C6.88 20.69 8.14 20.69 8.91 19.92Z" fill="#3b82f6"/>
            </svg>
          </div>
          <div className={styles.flowChevron}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08C8.14 3.31 6.88 3.31 6.11 4.08C5.34 4.85 5.34 6.11 6.11 6.88L11.23 12L6.11 17.12C5.34 17.89 5.34 19.15 6.11 19.92C6.88 20.69 8.14 20.69 8.91 19.92Z" fill="#3b82f6"/>
            </svg>
          </div>
        </div>

        {/* Materialized View */}
        <div className={styles.materializedView}>
          <div className={styles.sectionTitle}>Incremental Materialized View</div>
          <div className={`${styles.mvContainer} mv-container`}>
            <div className={styles.mvHeader}>
              One Unified View
              <div className={styles.realtimeIndicator}>LIVE</div>
            </div>
            <div className={styles.mvContent}>
              <div className={styles.mvFeature}>
                <span className={styles.checkmark}>✓</span>
                <span>Always up-to-date</span>
              </div>
              <div className={styles.mvFeature}>
                <span className={styles.checkmark}>✓</span>
                <span>No complex joins required</span>
              </div>
              <div className={styles.mvFeature}>
                <span className={styles.checkmark}>✓</span>
                <span>Fast, analysis-ready data</span>
              </div>
              <div className={styles.mvFeature}>
                <span className={styles.checkmark}>✓</span>
                <span>Power your BI and apps instantly</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.arrow} ${styles.animated}`}>
          <div className={styles.flowChevron}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08C8.14 3.31 6.88 3.31 6.11 4.08C5.34 4.85 5.34 6.11 6.11 6.88L11.23 12L6.11 17.12C5.34 17.89 5.34 19.15 6.11 19.92C6.88 20.69 8.14 20.69 8.91 19.92Z" fill="#3b82f6"/>
            </svg>
          </div>
          <div className={styles.flowChevron}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08C8.14 3.31 6.88 3.31 6.11 4.08C5.34 4.85 5.34 6.11 6.11 6.88L11.23 12L6.11 17.12C5.34 17.89 5.34 19.15 6.11 19.92C6.88 20.69 8.14 20.69 8.91 19.92Z" fill="#3b82f6"/>
            </svg>
          </div>
        </div>

        {/* Applications */}
        <div className={styles.applications}>
          <div className={styles.sectionTitle}>Typical Applications</div>
          <div className={styles.appsContainer}>
            <div className={styles.appItem}>
              <span>📊</span>
              <span>BI Reports</span>
            </div>
            <div className={styles.appItem}>
              <span>🔌</span>
              <span>Kafka</span>
            </div>
            <div className={styles.appItem}>
              <span>🗄️</span>
              <span>Databases</span>
            </div>
            <div className={styles.appItem}>
              <span>🤖</span>
              <span>AI MCP</span>
            </div>
            <div className={styles.appItem}>
              <span>🔗</span>
              <span>API</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapDataFlowAnimation;
