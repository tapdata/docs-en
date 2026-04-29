# Enhanced JS Built-in Function

import Content from '../reuse-content/_all-features.md';

<Content />

Enhanced JS nodes allow you to utilize all built-in functions for external calls, such as networking and database operations. If your requirement is solely to process and operate on data records, it is recommended to use [standard JS nodes](standard-js.md).

For detailed instructions on how to use enhanced JS nodes and explore various scenarios, please refer to the documentation and resources available for [JS processing node](../user-guide/data-pipeline/data-development/process-node#js-process).

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

Description: Adds or subtracts the year/month/day/hour/minute/second of the date. Accepts `Date` (i.e. `DateTime`) type.

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

:::tip

The following methods are available since **version 4.18**.

:::

### isBefore/isAfter/isEqual

Description: Compares the chronological order of two dates. Accepts `Date` (i.e. `DateTime`) type.

| Method | Description | Return |
| --- | --- | --- |
| `isBefore(a, b)` | Whether a is before b | `boolean` |
| `isAfter(a, b)` | Whether a is after b | `boolean` |
| `isEqual(a, b)` | Whether a equals b | `boolean` |

Example:

```javascript
var d1 = new Date();
var d2 = DateUtil.addDays(d1, 1);
var before = DateUtil.isBefore(d1, d2);  // true
var after = DateUtil.isAfter(d1, d2);    // false
var equal = DateUtil.isEqual(d1, d1);    // true
```

### compare

Description: Compares two dates and returns an integer. Returns a negative number if a is before b, 0 if equal, and a positive number if a is after b.

Example:

```javascript
var result = DateUtil.compare(d1, d2);  // < 0 means d1 is before d2
```

### isSameDay/isSameMonth

Description: Determines whether two dates fall on the same day/month. A time zone can be specified.

| Method | Description |
| --- | --- |
| `isSameDay(a, b, zoneId)` | Whether a and b are on the same day (`zoneId` can be `null` to use the system default time zone) |
| `isSameMonth(a, b, zoneId)` | Whether a and b are in the same month |

Example:

```javascript
var d1 = new Date();
var d2 = DateUtil.addHours(d1, 2);
var sameDay = DateUtil.isSameDay(d1, d2, null);    // true
var sameMonth = DateUtil.isSameMonth(d1, d2, null); // true
```

### diffMillis/diffSeconds/diffMinutes/diffHours/diffDays

Description: Calculates the difference between two dates (`a - b`), returning the value in the corresponding time unit.

| Method | Description | Return |
| --- | --- | --- |
| `diffMillis(a, b)` | Difference in milliseconds | `long` |
| `diffSeconds(a, b)` | Difference in seconds | `long` |
| `diffMinutes(a, b)` | Difference in minutes | `long` |
| `diffHours(a, b)` | Difference in hours | `long` |
| `diffDays(a, b)` | Difference in days | `long` |

Example:

```javascript
var d1 = new Date();
var d2 = DateUtil.addHours(d1, 3);
var diffMs = DateUtil.diffMillis(d2, d1);     // 10800000
var diffSec = DateUtil.diffSeconds(d2, d1);   // 10800
var diffMin = DateUtil.diffMinutes(d2, d1);   // 180
var diffHour = DateUtil.diffHours(d2, d1);    // 3
var diffDay = DateUtil.diffDays(d2, d1);      // 0
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

Description: Date type. In Enhanced JS, objects created by `new Date()` are actually of type `DateTime`, which is compatible with common JavaScript `Date` methods.

:::tip

The following Date instance methods are available since **version 4.18**.

:::

### Constructor

```javascript
// Get the current time
var dte = new Date();

// Construct from millisecond timestamp
var dte = new Date(1592233019140);
```

### Getter Methods

| Method | Description | Return |
| --- | --- | --- |
| `getFullYear()` | Get 4-digit year | `int` |
| `getYear()` | Get year (return value is year minus 1900) | `int` |
| `getMonth()` | Get month (0-11, 0 means January) | `int` |
| `getDate()` | Get day of month (1-31) | `int` |
| `getDay()` | Get day of week (0=Sunday, 6=Saturday) | `int` |
| `getHours()` | Get hours (0-23) | `int` |
| `getMinutes()` | Get minutes (0-59) | `int` |
| `getDateSeconds()` | Get seconds (0-59) | `int` |
| `getMilliseconds()` | Get milliseconds (0-999) | `int` |
| `getTime()` | Get milliseconds since 1970-01-01 | `long` |
| `getTimezoneOffset()` | Get timezone offset in minutes (positive means after UTC) | `int` |

### UTC Getter Methods

| Method | Description | Return |
| --- | --- | --- |
| `getUTCFullYear()` | Get UTC 4-digit year | `int` |
| `getUTCMonth()` | Get UTC month (0-11) | `int` |
| `getUTCDate()` | Get UTC day of month (1-31) | `int` |
| `getUTCDay()` | Get UTC day of week (0=Sunday) | `int` |
| `getUTCHours()` | Get UTC hours (0-23) | `int` |
| `getUTCMinutes()` | Get UTC minutes (0-59) | `int` |
| `getUTCSeconds()` | Get UTC seconds (0-59) | `int` |
| `getUTCMilliseconds()` | Get UTC milliseconds (0-999) | `int` |

### Setter Methods

| Method | Description |
| --- | --- |
| `setFullYear(year)` | Set 4-digit year |
| `setYear(year)` | Set year (input value plus 1900 is the actual year) |
| `setMonth(month)` | Set month (0-11) |
| `setDate(date)` | Set day of month (1-31) |
| `setHours(hours)` | Set hours (0-23) |
| `setMinutes(minutes)` | Set minutes (0-59) |
| `setDateSeconds(seconds)` | Set seconds (0-59) |
| `setMilliseconds(ms)` | Set milliseconds (0-999) |
| `setTime(millis)` | Set milliseconds since 1970-01-01 |

### UTC Setter Methods

| Method | Description |
| --- | --- |
| `setUTCFullYear(year)` | Set UTC year |
| `setUTCMonth(month)` | Set UTC month (0-11) |
| `setUTCDate(date)` | Set UTC day of month (1-31) |
| `setUTCHours(hours)` | Set UTC hours (0-23) |
| `setUTCMinutes(minutes)` | Set UTC minutes (0-59) |
| `setUTCSeconds(seconds)` | Set UTC seconds (0-59) |
| `setUTCMilliseconds(ms)` | Set UTC milliseconds (0-999) |

### Formatting Methods

| Method | Description | Example Return |
| --- | --- | --- |
| `toDateString()` | Returns a readable string of the date portion | `"Wed May 08 2024"` |
| `toTimeString()` | Returns a readable string of the time portion | `"14:30:00 GMT+0800"` |
| `toISOString()` | Returns an ISO 8601 formatted UTC string | `"2024-05-08T06:30:00.000Z"` |
| `toJSON()` | Returns a JSON serialization string (same as `toISOString()`) | `"2024-05-08T06:30:00.000Z"` |
| `toGMTString()` | Returns a GMT formatted string | — |
| `toUTCString()` | Returns a UTC formatted string | — |
| `toLocaleString()` | Returns a localized date-time string | — |
| `toLocaleDateString()` | Returns a localized date string | — |
| `toLocaleTimeString()` | Returns a localized time string | — |
| `valueOf()` | Returns the millisecond timestamp (same as `getTime()`) | — |

### Comparison Methods

| Method | Description |
| --- | --- |
| `after(dateTime)` | Whether the current date is after the specified date |
| `before(dateTime)` | Whether the current date is before the specified date |

### Example

```javascript
var dte = new Date();
var year = dte.getFullYear();      // Get 4-digit year, e.g. 2024
var month = dte.getMonth();        // Get month, 0-11
var day = dte.getDate();           // Get day, 1-31
var hours = dte.getHours();        // Get hours
var iso = dte.toISOString();       // "2024-05-08T06:30:00.000Z"

// Modify date
dte.setFullYear(2025);
dte.setMonth(0);                   // Set to January

// Compare two dates
var dte2 = new Date();
if (dte.before(dte2)) {
    // dte is before dte2
}
```

## ScriptExecutorsManager

### getScriptExecutor

Description: Get the data source executor.

Example:

```javascript
var source = ScriptExecutorsManager.getScriptExecutor('mysql-connection-name');
```

## ScriptExecutor

### execute

Description: When performing operations on a database, the return value is of Boolean type. **True** indicates a successful operation, while **false** indicates a failed operation.

:::tip

Before executing, the **source** component indicates performing operations on the source database, while the **target** component indicates performing operations on the target database.

:::

Example:

```javascript
var result = target.execute({
    database: “test”,
    collection: “user”,
    op: “update”,
    filter: {id: 1},
    opObject: {name: “user001”, age: 20},
    upsert: true
});
```

Parameter Description

* For structured databases (such as MySQL), you can refer to the method: `var result = source.execute({sql: “update test.user set name='user001' where id = 1”});`
* For MongoDB, the available parameters are as follows:

   - **database**: The name of the database on which the operation is being performed. 
   - **collection**: The collection name.
   - **op**: The action to be performed (INSERT/UPDATE/DELETE).
   - **filter**: The conditions for updating or deleting data.
   - **opObject**: The specific data for insertion, update, or deletion operations
   - **upsert**: You can choose whether to use the UPSERT mode of MongoDB, which enables inserting data if it doesn't exist and updating it if it does. The default value is **false**.
   - **multi**: You can specify whether to update multiple records. By default, it is set to **false**.

### executeQuery

Description: When performing database query operations, the return value is an array type that represents the result set of the query.

:::tip

Before executing, the **source** component indicates performing operations on the source database, while the **target** component indicates performing operations on the target database.

:::

Example:

```javascript
var users = target.executeQuery({
    database: “test”,
    collection: “user”,
    filter: {age: {$gt: 10}}，
    sort: {age: -1},
    limit: 10
});
```

Parameter Description

* For structured databases (such as MySQL), you can refer to the method: `var users = source.executeQuery({sql: “select * from test.user where age>10”});`
* For MongoDB, the available parameters are as follows:
   * **database**: The name of the database being operated on.
   * **collection**: The name of the collection on which the operation is being performed.
   * **filter**: The conditions for updating or deleting data.
   * **sort**:  Sorting condition (optional).
   * **limit**: Limit on the number of output records (optional).

### call

Description: Executing stored procedures and functions is supported only by structured databases. This feature enables the execution of specific database stored procedures and custom functions. The return value is in the form of key-value pairs, based on the defined result of the stored procedure.

Example:

```javascript
var result = source.call('demo' [{'param1':'aa'}])
```

Parameter Description

* **funcName**: The name of the stored procedure or function.
* **params**: The supported parameters for input.
   * **mode**: Parameter types for input, with the following values: **in** (default, for input parameters), **out** (for output parameters), and **in/out** (for parameters that are both input and output).
   * **name**: Parameter name.
   * **value**: The value of the parameter.
   * **type**: Parameter class type.

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

