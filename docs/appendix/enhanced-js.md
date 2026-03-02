# Enhanced JS Built-in Function

Enhanced JS nodes allow you to utilize all built-in functions for external calls, such as networking and database operations. If your requirement is solely to process and operate on data records, it is recommended to use [standard JS nodes](standard-js.md).

For detailed instructions on how to use enhanced JS nodes and explore various scenarios, please refer to the documentation and resources available for [JS processing node](../data-transformation/process-node.md#js-processing).

:::tip

This feature is only supported for use in data transformation tasks.

:::

## DateUtil

### parse

Description: Converts date strings in various formats to Date.

Example:

* General Usage

   ```javascript
   var dte = DateUtil.parse('2010-01-01 00:00:00');
   ```

* Advanced usage: `parse(dateString, timeoffset)`, that is, specify the time zone offset while converting.

   ```javascript
   // UTC+08:00
   var dte = DateUtil.parse('2010-01-01 00:00:00', 8);
   
   // UTC+0
   var dte = DateUtil.parse('2010-01-01 00:00:00', 0);
   ```


### determineDateFormat

Description: Get the date format.

Example:

```javascript
var format = DateUtil.determineDateFormat('2010-01-01 00:00:00');
```

### timeStamp2Date

Description: Converts the timestamp to a date string in the specified format.

Example:

```javascript
var dteStr = DateUtil.timeStamp2Date(1592233019140, 'yyyy-MM-dd HH:mm:ss');
```

### addYears/addMonths/addDays/addHours/addMinutes/addSeconds

Description: Adds or subtracts the year/month/day/hour/minute/second of the date.

Example:

```javascript
var dte = DateUtil.addYears(new Date(), 1);
dte = DateUtil.addYears(dte, -1);
```

### sameYear/sameMonth/sameDay/sameHour/sameMinute/sameSecond

Description: Compares the year/month/day/hour/minute/second of the date.

Example:

```javascript
if ( DataUtil.sameYear(new Date(), new Date()) ) {
    ...
}
```

## idGen/UUIDGenerator

### uuid

Description: Generate uuid, if you use `var str = uuid();`, you can get a random string.

Example:

```javascript
// Both methods below are available
var uuid = idGen.uuid();
var uuid = UUIDGenerator.uuid();
```

### objectId

Description: Generate MongoDB ObjectId.

Example:

```javascript
// Both methods below are available
var oid = idGen.objectId();
var oid = UUIDGenerator.objectId();
```

### objectIdStr

Description: Generate MongoDB ObjectId String section.

Example:

```javascript
// Both methods below are available
var oidStr = idGen.objectIdStr();
var oidStr = UUIDGenerator.objectIdStr();
```

## networkUtil

### GetAddress

Description: Network tool to get the IP address or MAC address.

Example:

```javascript
// Get the MAC address of the first network interface
var mac = networkUtil.GetAddress("mac");

// Get IP address
var ip = networkUtil.GetAddress("ip");
```

## HashMap

### put/remove

Description: Hash dictionary.

Example:

```javascript
var map = new HashMap();
map.put(“name”, “test”);
map.remove(“name”);
```

## ArrayList

### add/remove

Note: Array type.

Example:

```javascript
var list = new ArrayList();
list.add(“test1”);
list.remove(0);
```

## Date

### add/remove

Description: Date type.

Example:

```javascript
var dte = new Date();
var year = dte.getYear()+1900;
```

## ScriptExecutorsManager

### getScriptExecutor

Description: Get the data source executor.

Example:

```javascript
var source = ScriptExecutorsManager.getScriptExecutor('mysql-connection-name');
```


## ScriptExecutor


<details>

<summary>Preparation (Optional)</summary>

For demonstration purposes, we executed the following SQL statements in the database to create an `Orders` table and procedures to simulate real business scenarios.

```sql
-- 1. Create Orders table
CREATE TABLE Orders (
    order_id VARCHAR(20) PRIMARY KEY,
    order_date DATETIME,
    total_amount DECIMAL(10, 2),
    status INT DEFAULT 0, -- 0: Pending, 1: Paid, 2: Shipped, 9: Closed
    points INT DEFAULT 0  -- Order points
);

-- Initialize test data
INSERT INTO Orders (order_id, order_date, total_amount, status, points) VALUES 
('ORD_001', NOW(), 100.00, 0, 0),
('ORD_002', NOW(), 5000.00, 1, 0), 
('ORD_003', '2023-01-01 10:00:00', 50.00, 0, 0); -- An old record to demonstrate auto-closing

-- 2. Procedure 1 (No parameters): Batch close expired orders
-- Function: Simulate a scheduled task to mark all unpaid orders older than 30 days as '9' (Closed)
DELIMITER $$
CREATE PROCEDURE sp_close_expired_orders()
BEGIN
    UPDATE Orders SET status = 9 WHERE status = 0 AND order_date < DATE_SUB(NOW(), INTERVAL 30 DAY);
END$$
DELIMITER ;

-- 3. Procedure 2 (With input parameters): Ship order
-- Function: Update the status of a specific order to '2' (Shipped)
DELIMITER $$
CREATE PROCEDURE sp_ship_order(IN p_order_id VARCHAR(20))
BEGIN
    UPDATE Orders SET status = 2 WHERE order_id = p_order_id;
END$$
DELIMITER ;

-- 4. Procedure 3 (Complex scenario): Calculate order points (With IN/OUT parameters)
-- Function: Input order amount, return points earned
-- Rule: Amount < 1000, 1 point per 10 currency units; Amount >= 1000, 2 points per 10 currency units
DELIMITER $$
CREATE PROCEDURE sp_calculate_points(
    IN p_amount DECIMAL(10,2), 
    OUT p_points INT
)
BEGIN
    IF p_amount < 1000 THEN
        SET p_points = FLOOR(p_amount / 10);
    ELSE
        SET p_points = FLOOR(p_amount / 10) * 2;
    END IF;
END$$
DELIMITER ;
```

</details>

### execute / executeQuery

Description: Obtain a script executor for a specific data source via `ScriptExecutorsManager`, then call this method to execute SQL statements or NoSQL operations. This method is recommended for simple scenarios.

* **executeQuery**: Primarily used for queries (SELECT). Returns an array (result set) and supports trial runs (data preview).
* **execute**: Used for DML (INSERT/UPDATE/DELETE) or DDL operations. Returns a boolean (true/false) and does not support trial run data preview.

:::tip

The object before `execute` or `executeQuery` determines the target database: `source` for the source database and `target` for the target database.

:::

#### Structured Databases (e.g., MySQL)

Examples:

* Using execute for DML

  ```javascript
  // Get source connection (replace with your actual source connection name, e.g., 'Source_MySQL')
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // Simple SQL execution: update orders with status 0 (Pending) to 9 (Closed)
  var result = source.execute({
      "sql": "UPDATE Orders SET status = 9 WHERE order_id = 'ORD_001'"
  });
  log.info("Update result: " + result); 
  ```

* Using executeQuery for queries

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // Query all high-value orders (amount > 1000)
  var result = source.executeQuery({
      "sql": "SELECT * FROM Orders WHERE total_amount > 1000"
  });
  log.info("High value orders: " + result);
  ```

* Using execute to call procedures (no parameters)

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // Call the procedure to batch close expired orders
  // Equivalent to source.call("sp_close_expired_orders", [])
  var result = source.execute({
      "sql": "CALL sp_close_expired_orders()"
  });
  ```

* Using execute to call procedures (with parameters)

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // Call the shipping procedure (manually construct SQL parameters)
  // Equivalent to source.call("sp_ship_order", [...])
  var result = source.execute({
      "sql": "CALL sp_ship_order('ORD_002')"
  });
  ```

:::tip

`execute` and `executeQuery` **do not support** retrieving `OUT` (output) or `INOUT` (input/output) parameters from procedures, nor do they support non-query return values. For such complex scenarios, please use the `call` method described below.

:::

#### NoSQL Databases (e.g., MongoDB)

Parameter Description:

* **database**: The name of the database to operate on.
* **collection**: The name of the collection to operate on.
* **op**: The operation to perform (INSERT/UPDATE/DELETE, `execute` only).
* **filter**: Conditions for query, update, or delete.
* **opObject**: The specific data to insert or update.
* **upsert**: Whether to use MongoDB's UPSERT mode (insert if not exists). Default is **false**.
* **multi**: Whether to update multiple records. Default is **false**.
* **sort**: Sorting conditions (`executeQuery` only).
* **limit**: Limit the number of output records (`executeQuery` only).

Examples:

* Using execute for updates

  ```javascript
  var result = target.execute({
      database: "test",
      collection: "user",
      op: "update",
      filter: {id: 1},
      opObject: {name: "user001", age: 20},
      upsert: true
  });
  ```

* Using executeQuery for queries

  ```javascript
  var users = target.executeQuery({
      database: "test",
      collection: "user",
      filter: {age: {$gt: 10}},
      sort: {age: -1},
      limit: 10
  });
  ```

### call

Description: Call custom procedures in the database, supporting complex input/output parameters and return values. This method is recommended for procedures involving multiple result sets or complex parameters (IN/OUT/RETURN).

:::tip

This method is based on the JDBC generic interface. It is recommended to use basic parameter types (such as `int`, `double`, `varchar`) and avoid database-specific complex types to maximize compatibility across different database systems.

:::

Parameter Description:

`call(procedureName, parameters)`

* **procedureName**: The name of the procedure.
* **parameters**: An array of parameters, strictly ordered, containing the following properties:
    * **mode**: Parameter mode. Options: `in` | `out` | `in/out` | `return`.
    * **type**: Data type. Supports common types like `int` | `double` | `varchar`.
    * **value**: The specific value of the input parameter.
    * **name**: Parameter name (optional; if specified, this name will be used as the key in the returned result; otherwise, it is auto-generated).

Examples:

* Simple call (no parameters)

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // Call parameterless procedure: batch close expired orders
  source.call("sp_close_expired_orders", []);
  ```

* Call with input parameters

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // Call procedure with parameters: Ship order (update status of order ORD_002 to 2)
  source.call("sp_ship_order", [
      {"mode": "in", "type": "varchar", "value": 'ORD_002'}
  ]);
  ```

* Complex call (with return values/output parameters)

  ```javascript
  var source = ScriptExecutorsManager.getScriptExecutor('Source_MySQL');
  // Scenario: Calculate order points
  // Input: Order amount 5000 (in)
  // Output: Points earned (out)
  var result = source.call("sp_calculate_points", [
      {"mode": "in",  "type": "decimal", "value": 5000.00},
      {"name": "points", "mode": "out", "type": "int"}
  ]);
  
  // Result returned as a Map
  // Example: {points=1000}
  log.info("Points earned: " + result.points);


## JSONUtil

### json2List/obj2Json/obj2JsonPretty/json2Map

Description: JSON format conversion.

Example:

```javascript
var d = new Date();
var json = JSONUtil.obj2Json(d)
```

## HanLPUtil

### hanLPParticiple

Description: Chinese word segmentation tool, two parameters need to be set in parentheses, the format is `(String inputString, String language)`.

Example:

```javascript
var d = HanLPUtil.hanLPParticiple('你好', 'HK_T')
```

Parameter Description

- **inputString**: A string that requires word segmentation.

- **language**: the type of the language with the word segmentation, support:
   - CH_S: Simplified Chinese.

   - CH_T: Traditional Chinese.

   - HK_T: Traditional Chinese (Hong Kong).

   - TW_T: Traditional Chinese (Taiwan).

Returns: Array type, that is, the result set after word segmentation.

## split_chinese

Description: Chinese word segmentation tool, two parameters need to be set in parentheses, the format is `(String inputString, String language)`.

Example:

```javascript
var strs = split_chinese("这是一个中文句子", "CH_S");
```

Parameter Description

- **inputString**: A string that requires word segmentation.

- **language**: the type of the language with the word segmentation, support:
   - CH_S: Simplified Chinese.

   - CH_T: Traditional Chinese.

   - HK_T: Traditional Chinese (Hong Kong).

   - TW_T: Traditional Chinese (Taiwan).

Returns: Array type, that is, the result set after word segmentation.

## util

### strToBase64/base64ToStr/unwind

Description: String format conversion.

Example:

```javascript
// Convert the string to Base64 format
var b = util.strToBase64('aa');
// Split JSON arrays into hierarchy levels
var list = util.unwind(map, 'a.b.c');
```

## MD5Util/MD5

Description: MD5 encryption tool.

Example:

```javascript
// Get the MD5 signature of a string, the second parameter indicates whether to convert it to uppercase
var b = MD5Util.crypt('aa', true);
// Or
var b = MD5('aa', true);
```

## Collections

### sort/get/emptySet/emptyList

Description: Collection tool classes, such as sorting, getting collections, etc.

Example:

```javascript
// Sort the List
Collections.sort(list);
// Get an empty collection
var set = Collections.emptySet();
```

## MapUtil

### getValueByKey/needSplit/removeValueByKey/containsKey/getValuePositionInMap/deepCloneMap/copyToNewMap/putValueInMap/recursiveFlatMap/obj2Map

Description: Dictionary tool class.

Example:

```javascript
// Get the value of a specified level from a given map
var a = MapUtil.getValueByKey(map, 'a.b.c');
```

## sleep

Description: The program sleeps for a specified duration, measured in milliseconds.

Example:

```javascript
// Sleep for 10 milliseconds in the program
sleep(10);
```

## rest

### get/post/patch/delete

Description: Call HTTP methods (such as Get), format reference:

```javascript
rest.get(url, header)
rest.get(url, header, returnType)
rest.get(url, header, connectTimeOut, readTimeOut)
rest.get(url, header, returnType, connectTimeOut, readTimeOut)
```

* **returnType**: The default return result type is an array.
* **connectTimeOut**: The connection timeout duration in milliseconds. The default value is 10,000 milliseconds (10 seconds).
* **readTimeOut**: The read timeout duration in milliseconds. The default value is 30,000 milliseconds (30 seconds). 

Example:

* Get

   ```javascript
   var result = rest.get('http://127.0.0.1:1234/users?where[user_id]=1', {status: 0}, {}, 30, 300);rest.get(url)
   rest.get(url, headers)
   rest.get(url, connectTimeOut, readTimeOut)
   rest.get(url, headers, connectTimeOut, readTimeOut)
   ```

* Post

   ```javascript
   var result = rest.post('http://127.0.0.1:1234/users?id=1', {}, '[array/object/string]', 30, 300);rest.post(url, parameters)
   rest.post(url, parameters, headers, returnType)
   rest.post(url, parameters, connectTimeOut, readTimeOut)
   rest.post(url, parameters, headers, returnType, connectTimeOut, readTimeOut)
   ```

* Patch

   ```javascript
   var result = rest.patch('http://127.0.0.1:1234/users/find', {}, {}, '[array/object/string]', 30, 300);rest.patch(url, parameters)
   rest.patch(url, parameters, headers)
   rest.patch(url, parameters, connectTimeOut, readTimeOut)
   rest.patch(url, parameters, headers, connectTimeOut, readTimeOut)
   ```

* Delete

   ```javascript
   var result = rest.delete('http://127.0.0.1:1234/users?where[user_id]=1', {}, 30, 300);
   ```

## mongo

### getData/insert/update/delete

Description: Add, delete and check data in MongoDB, format reference:

```javascript
mongo.getData(uri, collection)
mongo.getData(uri, collection, filter)
mongo.getData(uri, collection, filter, limit, sort)
```

Example:

* Query Data

   ```javascript
   var result = mongo.getData('mongodb://127.0.0.1:27017/test', 'users', {id: 1}, 10, {add_time: -1});mongo.insert(url, collection, inserts)
   ```

* Insert data, supporting input of arrays or objects.

   ```javascript
   mongo.insert('mongodb://127.0.0.1:27017/test', 'users', [{id: 1, name: 'test1'}, {id: 2, name: 'test2'}]);mongo.update(url, collection, filter, update)
   ```

* Update data

   ```javascript
   var modifyCount = mongo.update('mongodb://127.0.0.1:27017/test', 'users', {id: 1}, {name: 'test3'});mongo.delete(url, collection, filter)
   ```

* Delete Data

   ```javascript
   var deleteCount = mongo.delete('mongodb://127.0.0.1:27017/test', 'users', {id: 1});
   ```

