# knex-sql-file-migration

[![npm](https://img.shields.io/npm/v/knex-sql-file-migration.svg)](https://www.npmjs.com/package/knex-sql-file-migration)
[![npm](https://img.shields.io/npm/dt/knex-sql-file-migration.svg)](https://www.npmjs.com/package/knex-sql-file-migration)

Use sql files instead of `knex.schema` methods.

Exports `up` and `down` functions whichs executes `knex.raw()` method on SQL files having same file name appended `.up.sql` and `.down.sql`.

This is a fork of `knex-migrate-sql-file` with multiple queries support and transaction usage on migrate

# Synopsis

1. Create `knex` migration file
2. Import this library in migration file
3. Create SQL files

```sh
$ knex migrate:make add-user-table
Created Migration: /some/path/20180516163212_add-user-table.js
```

**/some/path/20180516163212_add-user-table.js**

```js
//                      Don't forget function call ⤵
module.exports = require("knex-sql-file-migration")();
```

**/some/path/20180516163212_add-user-table.up.sql**

```sql
CREATE TABLE "user";

CREATE TABLE "user_profile";
```

To use multiple queries on a file, close each with a `;`

**/some/path/20180516163212_add-user-table.down.sql**

```sql
DROP TABLE "user";

DROP TABLE "user_profile";
```

You can override `up` or `down` function according to your needs.

# API

## Functions

<dl>
<dt><a href="#up">up(knex)</a></dt>
<dd><p>Reads <code>.up.sql</code> file and executes it using <code>knex.raw()</code> method.</p>
</dd>
<dt><a href="#down">down(knex)</a></dt>
<dd><p>Reads <code>.down.sql</code> file and executes it using <code>knex.raw()</code> method.</p>
</dd>
</dl>

<a name="up"></a>

## up(knex)

Reads `.up.sql` file and executes it using `knex.raw()` method.

**Kind**: global function

| Param | Type              | Description |
| ----- | ----------------- | ----------- |
| knex  | <code>Knex</code> | Knex object |

**Example**

```js
module.exports = require("knex-sql-file-migration")();
```

<a name="down"></a>

## down(knex)

Reads `.down.sql` file and executes it using `knex.raw()` method.

**Kind**: global function

| Param | Type              | Description |
| ----- | ----------------- | ----------- |
| knex  | <code>Knex</code> | Knex object |

**Example**

```js
module.exports = require("knex-sql-file-migration")();
```
