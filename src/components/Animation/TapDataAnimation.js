import React, { useEffect, useRef } from 'react';
import styles from './TapDataAnimation.module.css';

const TapDataAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    class TapDataDemo {
      constructor(container) {
        this.container = container;
        this.processingEngine = container.querySelector('#processingEngine');
        this.isRunning = true;
        this.particles = [];
        this.connectionLines = [];
        this.init();
      }

      init() {
        this.createConnectionLines();
        this.bindEvents();
        setTimeout(() => this.startContinuousDemo(), 1000);
      }

      bindEvents() {
        window.addEventListener('resize', () => {
          this.clearAllLines();
          setTimeout(() => {
            this.createConnectionLines();
          }, 100);
        });
      }

      createConnectionLines() {
        const sourceSection = this.container.querySelector('[class*="sourceSection"]');
        const engine = this.processingEngine;
        const mvSection = this.container.querySelector('[class*="materializedView"]');

        if (!sourceSection || !engine || !mvSection) return;

        const sourceRect = sourceSection.getBoundingClientRect();
        const engineRect = engine.getBoundingClientRect();
        const mvRect = mvSection.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();

        // Calculate unified arrow height (using engine center height)
        const arrowHeight = engineRect.top + engineRect.height / 2 - containerRect.top - 25;

        // Arrow group from source tables to engine
        const arrows1 = document.createElement('div');
        arrows1.className = 'flow-arrows';
        arrows1.style.left = `${sourceRect.right - containerRect.left + 20}px`;
        arrows1.style.top = `${arrowHeight}px`;
        arrows1.style.width = `${engineRect.left - sourceRect.right - 40}px`;
        arrows1.style.justifyContent = 'center';
        arrows1.innerHTML = '<span class="arrow">></span><span class="arrow">></span><span class="arrow">></span>';

        // Arrow group from engine to materialized view
        const arrows2 = document.createElement('div');
        arrows2.className = 'flow-arrows';
        arrows2.style.left = `${engineRect.right - containerRect.left + 20}px`;
        arrows2.style.top = `${arrowHeight}px`;
        arrows2.style.width = `${mvRect.left - engineRect.right - 40}px`;
        arrows2.style.justifyContent = 'center';
        arrows2.innerHTML = '<span class="arrow">></span><span class="arrow">></span><span class="arrow">></span>';

        this.container.appendChild(arrows1);
        this.container.appendChild(arrows2);

        this.connectionLines.push(arrows1, arrows2);
      }

      clearAllLines() {
        this.connectionLines.forEach(line => {
          if (line.parentNode) {
            line.parentNode.removeChild(line);
          }
        });
        this.connectionLines = [];
      }

      async startContinuousDemo() {
        if (this.processingEngine) {
          this.processingEngine.classList.add('pulse');
        }

        while (this.isRunning) {
          await this.runTableBasedAnimation();
          await this.delay(4000);
        }
      }

      async runTableBasedAnimation() {
        const mvContent = this.container.querySelector('.mv-content');
        this.resetMaterializedView();

        const tableIds = ['ordersTable', 'usersTable', 'orderItemsTable', 'productsTable'];
        const tableGroups = {};

        tableIds.forEach(id => {
          const table = this.container.querySelector(`#${id}`);
          if (table) {
            const fields = table.querySelectorAll('.field[data-target]');
            const tableName = id.replace('Table', '');
            tableGroups[tableName] = Array.from(fields);
          }
        });

        // Fly fields in order: orders -> users -> orderItems -> products
        const flyOrder = ['orders', 'users', 'orderItems', 'products'];
        for (const tableName of flyOrder) {
          if (!this.isRunning) break;

          const tableFields = tableGroups[tableName];
          if (tableFields && tableFields.length > 0) {
            await this.animateTableFields(tableFields, tableName);
            // Update materialized view for corresponding stage after each table completion
            this.updateMaterializedViewForStage(tableName);
            await this.delay(1000);
          }
        }
      }

      resetMaterializedView() {
        const mvContent = this.container.querySelector('.mv-content');
        if (mvContent) {
          mvContent.textContent = '{\n\n}';
        }

        // Reset flag variables
        this.productItemsStarted = false;
        this.productItemsEnded = false;
        this.userInfoStarted = false;
        this.fieldCount = 0;
        this.productItemsFieldCount = 0;
        this.userInfoFieldCount = 0;

        // Reset displayed fields record
        this.displayedFields = new Set();
      }

      updateMaterializedViewForStage(tableName) {
        const mvContent = this.container.querySelector('.mv-content');
        if (!mvContent) return;

        // Add update animation
        mvContent.classList.add('updating');
        setTimeout(() => {
          mvContent.classList.remove('updating');
        }, 800);

        if (tableName === 'orders') {
          // First time, build complete structure
          this.buildInitialStructure(mvContent);
        } else {
          // Subsequent stages, only add new content
          this.addNewFieldsForStage(mvContent, tableName);
        }
      }

      buildInitialStructure(mvContent) {
        mvContent.innerHTML = '';
        const container = document.createElement('div');
        container.className = 'mv-structure';

        this.addLine(container, '{', 0);
        this.addFieldLine(container, 'order_id', 1, true);
        this.addFieldLine(container, 'order_amount', 1, true);
        this.addFieldLine(container, 'order_status', 1, true);
        this.addFieldLine(container, 'order_time', 1, true);
        this.addFieldLine(container, 'payment_method', 1, true);
        this.addFieldLine(container, 'user_id', 1, true);
        this.addLine(container, '}', 0);

        mvContent.appendChild(container);
        this.animateFieldLines(container);
      }

      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      addNewFieldsForStage(mvContent, tableName) {
        const container = mvContent.querySelector('.mv-structure');
        const closingBrace = container.querySelector('.field-line:last-child');

        if (tableName === 'users') {
          // Add user_info object
          this.insertFieldLine(container, closingBrace, 'user_info: {', 1, true);
          this.insertFieldLine(container, closingBrace, 'city', 2, true);
          this.insertFieldLine(container, closingBrace, 'country', 2, true);
          this.insertFieldLine(container, closingBrace, 'signup_time', 2, true);
          this.insertFieldLine(container, closingBrace, 'user_id', 2, true);
          this.insertFieldLine(container, closingBrace, 'user_level', 2, true);
          this.insertFieldLine(container, closingBrace, 'user_name', 2, true);
          this.insertLine(container, closingBrace, '}', 1);

        } else if (tableName === 'orderItems') {
          // Add product_items array before user_info
          const userInfoLine = Array.from(container.children).find(line =>
            line.textContent.includes('user_info:'));

          this.insertFieldLine(container, userInfoLine, 'product_items: [', 1, true);
          this.insertLine(container, userInfoLine, '{', 2);
          this.insertFieldLine(container, userInfoLine, 'quantity', 3, true);
          this.insertFieldLine(container, userInfoLine, 'item_id', 3, true);
          this.insertFieldLine(container, userInfoLine, 'product_id', 3, true);
          this.insertFieldLine(container, userInfoLine, 'order_id', 3, true);
          this.insertLine(container, userInfoLine, '},', 2);
          this.insertLine(container, userInfoLine, '......', 2);
          this.insertLine(container, userInfoLine, '],', 1);

        } else if (tableName === 'products') {
          // Add new fields to existing product_items
          const orderIdLine = Array.from(container.children).find(line =>
            line.textContent.trim() === 'order_id,' && line.style.paddingLeft === '60px');
          const closingObjectLine = orderIdLine?.nextElementSibling;

          if (closingObjectLine) {
            this.insertFieldLine(container, closingObjectLine, 'category', 3, true);
            this.insertFieldLine(container, closingObjectLine, 'product_name', 3, true);
            this.insertFieldLine(container, closingObjectLine, 'unit_price', 3, true);
          }
        }

        // Re-animate newly added fields
        const newFields = container.querySelectorAll('.field-line.new-field');
        newFields.forEach((field, index) => {
          setTimeout(() => {
            field.style.opacity = '1';
            field.style.transform = 'translateX(0)';
          }, index * 100);
        });
      }

      async animateTableFields(fields, tableName) {
        // Add processing engine jiggle effect
        if (this.processingEngine) {
          this.processingEngine.classList.add('engine-processing');
        }

        // Fly all fields of a table simultaneously
        const flyingPromises = fields.map((field, index) => {
          return new Promise(async (resolve) => {
            // Stagger start time for each field, but with shorter intervals
            await this.delay(index * 50);
            await this.animateFieldToStructure(field, tableName);
            resolve();
          });
        });

        await Promise.all(flyingPromises);

        // Remove processing engine jiggle effect
        if (this.processingEngine) {
          this.processingEngine.classList.remove('engine-processing');
        }
      }

      async animateFieldToStructure(sourceField, tableName) {
        // Highlight source field
        sourceField.classList.add('highlight');

        // Create flying field
        const flyingField = document.createElement('div');
        flyingField.className = 'flying-field';
        const fieldName = sourceField.querySelector('.field-name').textContent.replace(/[🔑🔗]/g, '').trim();
        flyingField.textContent = fieldName;

        const sourceRect = sourceField.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();
        const mvContent = this.container.querySelector('.mv-content');
        const mvRect = mvContent.getBoundingClientRect();

        // Set starting position (source field position)
        flyingField.style.left = `${sourceRect.left - containerRect.left}px`;
        flyingField.style.top = `${sourceRect.top - containerRect.top}px`;

        this.container.appendChild(flyingField);

        // Calculate target position (center of materialized view content area)
        const targetX = mvRect.left - containerRect.left + mvRect.width / 2;
        const targetY = mvRect.top - containerRect.top + mvRect.height / 2;

        // Start flying animation - real left to right flight
        setTimeout(() => {
          flyingField.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          flyingField.style.left = `${targetX}px`;
          flyingField.style.top = `${targetY}px`;
          flyingField.classList.add('animate');
        }, 100);

        // Clean up flying field
        setTimeout(() => {
          sourceField.classList.remove('highlight');
          if (flyingField.parentNode) {
            flyingField.parentNode.removeChild(flyingField);
          }
        }, 1300);

        await this.delay(400);
      }

      addLine(container, text, indent) {
        const line = document.createElement('div');
        line.className = 'field-line';
        line.style.paddingLeft = `${indent * 20}px`;
        line.textContent = text;
        container.appendChild(line);
      }

      addFieldLine(container, text, indent, isNew) {
        const line = document.createElement('div');
        line.className = 'field-line';
        if (isNew) {
          line.classList.add('new-field');
          // Start fade out after 1.2s, 0.5s fade out animation
          setTimeout(() => {
            line.classList.add('fade-out');
            setTimeout(() => {
              line.classList.remove('new-field', 'fade-out');
            }, 500);
          }, 1200);
        }
        line.style.paddingLeft = `${indent * 20}px`;
        line.textContent = text + (text.includes(':') || text.includes('}') || text.includes(']') || text === '......' ? '' : ',');
        container.appendChild(line);
      }

      insertFieldLine(container, beforeElement, text, indent, isNew) {
        const line = document.createElement('div');
        line.className = 'field-line';
        if (isNew) {
          line.classList.add('new-field');
          // Start fade out after 1.2s, 0.5s fade out animation
          setTimeout(() => {
            line.classList.add('fade-out');
            setTimeout(() => {
              line.classList.remove('new-field', 'fade-out');
            }, 500);
          }, 1200);
        }
        line.style.paddingLeft = `${indent * 20}px`;
        line.textContent = text + (text.includes(':') || text.includes('}') || text.includes(']') || text === '......' ? '' : ',');
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        container.insertBefore(line, beforeElement);
      }

      insertLine(container, beforeElement, text, indent) {
        const line = document.createElement('div');
        line.className = 'field-line';
        line.style.paddingLeft = `${indent * 20}px`;
        line.textContent = text;
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        container.insertBefore(line, beforeElement);
      }

      animateFieldLines(container) {
        const lines = container.querySelectorAll('.field-line');
        lines.forEach((line, index) => {
          setTimeout(() => {
            line.style.animationDelay = `${index * 0.1}s`;
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
          }, index * 100);
        });
      }

      cleanup() {
        // Clean up all animation elements
        this.container.querySelectorAll('.field').forEach(field => {
          field.classList.remove('highlight');
        });

        this.container.querySelectorAll('.flying-field').forEach(el => {
          if (el.parentNode) el.parentNode.removeChild(el);
        });

        this.particles.forEach(particle => {
          if (particle.parentNode) particle.parentNode.removeChild(particle);
        });
        this.particles = [];
      }
    }

    // 初始化动画
    if (containerRef.current) {
      const demo = new TapDataDemo(containerRef.current);

      // 清理函数
      return () => {
        demo.isRunning = false;
        demo.cleanup && demo.cleanup();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.demoArea}>
        {/* 源表部分 */}
        <div className={styles.sourceSection}>
          <div className={styles.table} id="ordersTable">
            <div className={styles.tableHeader}>orders</div>
            <div className={`${styles.field} ${styles.joinKey} field`} data-field="order_id" data-target="order_id">
              <span className={`${styles.fieldName} field-name`}>🔑 order_id</span>
            </div>
            <div className={`${styles.field} ${styles.joinKey} field`} data-field="user_id" data-target="user_id">
              <span className={`${styles.fieldName} field-name`}>🔗 user_id</span>
            </div>
            <div className={`${styles.field} field`} data-field="order_status" data-target="order_status">
              <span className={`${styles.fieldName} field-name`}>order_status</span>
            </div>
            <div className={`${styles.field} field`} data-field="order_amount" data-target="order_amount">
              <span className={`${styles.fieldName} field-name`}>order_amount</span>
            </div>
            <div className={`${styles.field} field`} data-field="payment_method" data-target="payment_method">
              <span className={`${styles.fieldName} field-name`}>payment_method</span>
            </div>
            <div className={`${styles.field} field`} data-field="order_time" data-target="order_time">
              <span className={`${styles.fieldName} field-name`}>order_time</span>
            </div>
          </div>

          <div className={styles.table} id="usersTable">
            <div className={styles.tableHeader}>users</div>
            <div className={`${styles.field} ${styles.joinKey} field`} data-field="user_id" data-target="user_id">
              <span className={`${styles.fieldName} field-name`}>🔑 user_id</span>
            </div>
            <div className={`${styles.field} field`} data-field="user_name" data-target="user_info.user_name">
              <span className={`${styles.fieldName} field-name`}>user_name</span>
            </div>
            <div className={`${styles.field} field`} data-field="user_level" data-target="user_info.user_level">
              <span className={`${styles.fieldName} field-name`}>user_level</span>
            </div>
            <div className={`${styles.field} field`} data-field="country" data-target="user_info.country">
              <span className={`${styles.fieldName} field-name`}>country</span>
            </div>
            <div className={`${styles.field} field`} data-field="city" data-target="user_info.city">
              <span className={`${styles.fieldName} field-name`}>city</span>
            </div>
            <div className={`${styles.field} field`} data-field="signup_time" data-target="user_info.signup_time">
              <span className={`${styles.fieldName} field-name`}>signup_time</span>
            </div>
          </div>

          <div className={styles.table} id="orderItemsTable">
            <div className={styles.tableHeader}>order_items</div>
            <div className={`${styles.field} field`} data-field="item_id" data-target="product_items.item_id">
              <span className={`${styles.fieldName} field-name`}>item_id</span>
            </div>
            <div className={`${styles.field} ${styles.joinKey} field`} data-field="order_id" data-target="product_items.order_id">
              <span className={`${styles.fieldName} field-name`}>🔗 order_id</span>
            </div>
            <div className={`${styles.field} ${styles.joinKey} field`} data-field="product_id" data-target="product_items.product_id">
              <span className={`${styles.fieldName} field-name`}>🔗 product_id</span>
            </div>
            <div className={`${styles.field} field`} data-field="quantity" data-target="product_items.quantity">
              <span className={`${styles.fieldName} field-name`}>quantity</span>
            </div>
          </div>

          <div className={styles.table} id="productsTable">
            <div className={styles.tableHeader}>products</div>
            <div className={`${styles.field} ${styles.joinKey} field`} data-field="product_id" data-target="product_items.product_id">
              <span className={`${styles.fieldName} field-name`}>🔑 product_id</span>
            </div>
            <div className={`${styles.field} field`} data-field="product_name" data-target="product_items.product_name">
              <span className={`${styles.fieldName} field-name`}>product_name</span>
            </div>
            <div className={`${styles.field} field`} data-field="category" data-target="product_items.category">
              <span className={`${styles.fieldName} field-name`}>category</span>
            </div>
            <div className={`${styles.field} field`} data-field="unit_price" data-target="product_items.unit_price">
              <span className={`${styles.fieldName} field-name`}>unit_price</span>
            </div>
          </div>
        </div>

        {/* 处理引擎 */}
        <div className={styles.processingSection}>
          <div className={styles.processingEngine} id="processingEngine">
            <div className={styles.engineLogo}>TapData</div>
            <div className={styles.engineSubtitle}>Real-time Data</div>
            <div className={styles.engineSubtitle}>Processing Engine</div>
          </div>
        </div>

        {/* 物化视图 */}
        <div className={styles.resultSection}>
          <div className={styles.materializedView}>
            <div className={styles.mvHeader}>Materialized View</div>
            <div className={styles.mvContent + " mv-content"} id="mvContent">{'{\n\n}'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapDataAnimation;