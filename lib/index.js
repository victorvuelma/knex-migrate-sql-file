const path = require("path");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const exists = util.promisify(fs.exists);

// level = 2 : up -> getSQLFileName -> getParent
function getParent(level = 2) {
  const _ = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = _;
  return stack[level];
}

function getSQLFileName(type) {
  const migrationFile = getParent().getFileName();
  const sqlFile = path.join(path.dirname(migrationFile), `${path.basename(migrationFile, ".js")}.${type}.sql`);
  return sqlFile;
}

function exportFunctions() {
  const sqlFile = { up: getSQLFileName("up"), down: getSQLFileName("down") };

  /**
   * Parses and execute queries using `knex.raw()` method.
   * @param {Knex} knex - Knex object
   * @param sql - Sql queries
   * @async
   */
  const runQueries = async (knex, sql) => {
    const queries = sql
      .split(";")
      .map(q => q.trim())
      .filter(q => q.length);

    const trx = await knex.transaction();

    try {
      for (const query of queries) {
        await trx.raw(query);
      }
    } catch (err) {
      await trx.rollback();

      throw err;
    } finally {
      await trx.commit();
    }
  };

  return {
    /**
     * Reads `.up.sql` file and executes it using `knex.raw()` method.
     * @param {Knex}    knex    - Knex object
     * @async
     * @example
     * module.exports = require("knex-sql-file-migration")();
     */
    up: async function up(knex) {
      if (await exists(sqlFile.down)) {
        const sql = await readFile(sqlFile.up, "utf8");

        return runQueries(knex, sql);
      }
    },
    /**
     * Reads `.down.sql` file and executes it using `knex.raw()` method.
     * @param {Knex}    knex    - Knex object
     * @async
     * @example
     * module.exports = require("knex-sql-file-migration")();
     */
    down: async function down(knex) {
      if (await exists(sqlFile.down)) {
        const sql = await readFile(sqlFile.down, "utf8");

        return runQueries(knex, sql);
      }
    },
  };
}

module.exports = exportFunctions;
