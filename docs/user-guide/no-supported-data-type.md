# Data Type Support Description



:::tip

In this article, only the field types not supported during synchronization are listed, and the content that is not covered will be gradually added.

:::

#### Oracle as a source

| Targets | Field type not supported |
| -------------- | ------------------------------------------------------------ |
| Oracle | RAW, LONG_RAW, BFILE, XMLTYPE, STRUCT |
| MongoDB | RAW, LONG_RAW, BFILE, XMLTYPE, STRUCT, INTERVAL DAY(2) TO SECOND(6), INTERVAL YEAR(4) TO MONTH |
| SQL Server | RAW, LONG_RAW, BFILE, XMLTYPE, STRUCT, INTERVAL DAY(2) TO SECOND(6), INTERVAL YEAR(4) TO MONTH |
| MySQL | RAW, LONG_RAW, BFILE, XMLTYPE, STRUCT, INTERVAL DAY(2) TO SECOND(6), INTERVAL YEAR(4) TO MONTH |
| PostgreSQL | RAW, LONG_RAW, BFILE, XMLTYPE, STRUCT, INTERVAL DAY(2) TO SECOND(6), INTERVAL YEAR(4) TO MONTH |
| Elastic Search | RAW, LONG_RAW, BFILE, XMLTYPE, STRUCT, INTERVAL DAY(2) TO SECOND(6), INTERVAL YEAR(4) TO MONTH |
| Kafka | RAW, LONG_RAW, BFILE, XMLTYPE, STRUCT, INTERVAL DAY(2) TO SECOND(6), INTERVAL YEAR(4) TO MONTH |
| ClickHouse | RAW, LONG_RAW, BFILE, XMLTYPE, STRUCT, INTERVAL DAY(2) TO SECOND(6), INTERVAL YEAR(4) TO MONTH, BLOB |

#### MySQL as a source

| Targets | Field type not supported |
| -------------- | ------------------------------------------------------------ |
| Oracle | GEOMETRY, POINT, LINESTRING, POLYGON, MULTIPOINT, MULTILINESTRING, MULTIPOLYGON, GEOMETRYCOLLECTION, DOUBLE UNSIGNED, DOUBLE UNSIGNED, BINARY, VARBINARY, TINYBLOB, BLOB, LONGBLOB |
| MongoDB | GEOMETRY, POINT, LINESTRING, POLYGON, MULTIPOINT, MULTILINESTRING, MULTIPOLYGON, GEOMETRYCOLLECTION, DOUBLE UNSIGNED, DOUBLE UNSIGNED, BINARY, VARBINARY, TINYBLOB, BLOB, LONGBLOB |
| SQL Server | GEOMETRY, POINT, LINESTRING, POLYGON, MULTIPOINT, MULTILINESTRING, MULTIPOLYGON, GEOMETRYCOLLECTION, DOUBLE UNSIGNED, DOUBLE UNSIGNED, BINARY, VARBINARY, TINYBLOB, BLOB, LONGBLOB |
| MySQL | GEOMETRY, POINT, LINESTRING, POLYGON, MULTIPOINT, MULTILINESTRING, MULTIPOLYGON, GEOMETRYCOLLECTION |
| PostgreSQL | GEOMETRY, POINT, LINESTRING, POLYGON, MULTIPOINT, MULTILINESTRING, MULTIPOLYGON, GEOMETRYCOLLECTION, DOUBLE UNSIGNED, DOUBLE UNSIGNED, BINARY, VARBINARY, TINYBLOB, BLOB, LONGBLOB |
| Elastic Search | GEOMETRY, POINT, LINESTRING, POLYGON, MULTIPOINT, MULTILINESTRING, MULTIPOLYGON, GEOMETRYCOLLECTION, DOUBLE UNSIGNED, DOUBLE UNSIGNED, BINARY, VARBINARY, TINYBLOB, BLOB, LONGBLOB |
| Kafka | GEOMETRY, POINT, LINESTRING, POLYGON, MULTIPOINT, MULTILINESTRING, MULTIPOLYGON, GEOMETRYCOLLECTION, DOUBLE UNSIGNED, DOUBLE UNSIGNED, BINARY, VARBINARY, TINYBLOB, BLOB, LONGBLOB |
| ClickHouse | GEOMETRY, POINT, LINESTRING, POLYGON, MULTIPOINT, MULTILINESTRING, MULTIPOLYGON, GEOMETRYCOLLECTION, DOUBLE UNSIGNED, BINARY, VARBINARY, TINYBLOB, BLOB, LONGBLOB |

#### SQL Server as a source

:::tip

Due to the internal mechanism of SQL Server, if the table to be synchronized lacks a primary key and includes text/ image types, there is a possibility of multiple data pieces being updated. In such cases, the inconsistency would be limited to the values of fields containing text, while the values of other fields would remain consistent across the multiple data pieces.

:::

| Targets | Field type not supported |
| -------------- | ----------------------------------------------- |
| Oracle | xml, geometry, geography |
| MongoDB | xml, geometry, geography |
| MySQL | xml, geometry, geography |
| PostgreSQL | xml, geometry, geography |
| Elastic Search | xml, geometry, geography |
| Kafka | xml, geometry, geography |
| ClickHouse | xml, geometry, geography, binary, varbinary, image |

#### PostgreSQL as a source

| Targets | Field type not supported |
| -------------- | ------------------------------------------------------------ |
| Oracle | point, line, lseg, box, path, polygon, circle, int4range, int8range, numrange, tsrange, tstzrange, daterange, macaddr8, uuid, xml |
| MongoDB | point, line, lseg, box, path, polygon, circle, int4range, int8range, numrange, tsrange, tstzrange, daterange, macaddr8, uuid, xml |
| SQL Server | point, line, lseg, box, path, polygon, circle, int4range, int8range, numrange, tsrange, tstzrange, daterange, macaddr8, uuid, xml |
| MySQL | point, line, lseg, box, path, polygon, circle, int4range, int8range, numrange, tsrange, tstzrange, daterange, macaddr8, uuid, xml |
| PostgreSQL | 'int4range', 'int8range', 'numrange', 'tsrange', 'tstzrange', 'daterange' |
| Elastic Search | point, line, lseg, box, path, polygon, circle, int4range, int8range, numrange, tsrange, tstzrange, daterange, macaddr8, uuid, xml |
| Kafka | point, line, lseg, box, path, polygon, circle, int4range, int8range, numrange, tsrange, tstzrange, daterange, macaddr8, uuid, xml |
| ClickHouse | point, line, lseg, box, path, polygon, circle, int4range, int8range, numrange, tsrange, tstzrange, daterange, macaddr8, uuid, xml, bytea |

#### MongoDB as a source

| Targets | Field type not supported |
| -------------- | --------------------------------------------------------- |
| Oracle | JAVASCRIPT, MIN_KEY, REGULAR_EXPRESSION, MAX_KEY |
| SQL Server | JAVASCRIPT, MIN_KEY, REGULAR_EXPRESSION, MAX_KEY |
| MySQL | JAVASCRIPT, MIN_KEY, REGULAR_EXPRESSION, MAX_KEY |
| PostgreSQL | JAVASCRIPT, MIN_KEY, REGULAR_EXPRESSION, MAX_KEY |
| Elastic Search | JAVASCRIPT, MIN_KEY, REGULAR_EXPRESSION, MAX_KEY |
| Kafka | JAVASCRIPT, MIN_KEY, REGULAR_EXPRESSION, MAX_KEY |
| ClickHouse | JAVASCRIPT, MIN_KEY, REGULAR_EXPRESSION, MAX_KEY, BINARY, NULL |

