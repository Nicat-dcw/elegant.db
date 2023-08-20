
import mysql from 'mysql2/promise';
import ElegantError from '../managers/error.mjs';

/**
 * Represents a MySQL Adaptor for interacting with a MySQL database using mysql2.
 */
class MySQLAdaptor {
  /**
   * Creates a new instance of the MySQLAdaptor class.
   * @param {Object} options - The options for the adaptor.
   * @param {string} options.host - The MySQL database host.
   * @param {string} options.user - The MySQL database user.
   * @param {string} options.password - The password for the MySQL database user.
   * @param {string} options.database - The name of the MySQL database.
   */
  constructor(options) {
    this.connectionConfig = {
      host: options.host,
      user: options.user,
      password: options.password,
      database: options.database,
    };
    this.connection = null;
    this.init();
  }

  /**
   * Initializes the MySQL connection.
   * @private
   */
  async init() {
    try {
      this.connection = await mysql.createConnection(this.connectionConfig);
      console.log('[ ElegantDB ] : Connected to MySQL database.');
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Checks the connection status.
   * @returns {boolean} True if the connection is valid, false otherwise.
   */
  async checkConnection() {
    return this.connection && this.connection.isValid();
  }

  /**
   * Disconnects from the MySQL database.
   */
  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      throw new ElegantError({ expected: 'disconnect', message: 'Disconnected from MySQL database.'}).asBox();
    }
  }

  /**
   * Executes a custom SQL query on the MySQL database.
   * @param {string} query - The SQL query to execute.
   * @param {Array} params - Parameters for the query.
   * @returns {Promise<*>} A promise that resolves with the query result.
   */
  async executeQuery(query, params = []) {
    try {
      const [rows] = await this.connection.execute(query, params);
      return Promise.resolve(rows);
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Inserts a new row into the database.
   * @param {string} tableName - The name of the table to insert into.
   * @param {Object} values - An object containing column names and values to insert.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async insertRow(tableName, values) {
    const columns = Object.keys(values).join(', ');
    const placeholders = Object.keys(values).map(() => '?').join(', ');
    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

    try {
      await this.connection.execute(query, Object.values(values));
      return Promise.resolve();
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Updates a row in the database.
   * @param {string} tableName - The name of the table to update.
   * @param {Object} values - An object containing column names and new values to update.
   * @param {string} condition - The WHERE condition for the update query.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async updateRow(tableName, values, condition) {
    const setStatements = Object.keys(values).map(column => `${column} = ?`).join(', ');
    const query = `UPDATE ${tableName} SET ${setStatements} WHERE ${condition}`;

    try {
      await this.connection.execute(query, [...Object.values(values)]);
      return Promise.resolve();
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Deletes a row from the database using a condition.
   * @param {string} tableName - The name of the table to delete from.
   * @param {string} condition - The WHERE condition for the delete query.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async deleteRow(tableName, condition) {
    const query = `DELETE FROM ${tableName} WHERE ${condition}`;

    try {
      await this.connection.execute(query);
      return Promise.resolve();
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Retrieves all rows from a table based on a condition.
   * @param {string} tableName - The name of the table to retrieve from.
   * @param {string} condition - The WHERE condition for the query.
   * @returns {Promise<Array>} A promise that resolves with an array of retrieved rows.
   */
  async getAllRows(tableName, condition) {
    const query = `SELECT * FROM ${tableName} WHERE ${condition}`;
    
    try {
      const [rows] = await this.connection.execute(query);
      return Promise.resolve(rows);
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Counts the number of rows in a table based on a condition.
   * @param {string} tableName - The name of the table to count from.
   * @param {string} condition - The WHERE condition for the query.
   * @returns {Promise<number>} A promise that resolves with the count of rows.
   */
  async countRows(tableName, condition) {
    const query = `SELECT COUNT(*) as count FROM ${tableName} WHERE ${condition}`;

    try {
      const [rows] = await this.connection.execute(query);
      return Promise.resolve(rows[0].count);
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Sets a row in the database using the provided key and value.
   * @param {string} tableName - The name of the table to insert into.
   * @param {string} key - The key for the row.
   * @param {*} value - The value to set for the row.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async setRowByKey(tableName, key, value) {
    const query = `INSERT INTO ${tableName} (key_column, value_column) VALUES (?, ?)`;

    try {
      await this.connection.execute(query, [key, value]);
      return Promise.resolve();
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Retrieves a row from the database using the provided key.
   * @param {string} tableName - The name of the table to retrieve from.
   * @param {string} key - The key to retrieve the row.
   * @returns {Promise<Object|null>} A promise that resolves with the retrieved row or null if not found.
   */
  async getRowByKey(tableName, key) {
    const query = `SELECT * FROM ${tableName} WHERE key_column = ?`;

    try {
      const [rows] = await this.connection.execute(query, [key]);
      return Promise.resolve(rows[0] || null);
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Deletes all rows from a table.
   * @param {string} tableName - The name of the table to delete from.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async deleteAllRows(tableName) {
    const query = `DELETE FROM ${tableName}`;

    try {
      await this.connection.execute(query);
      return Promise.resolve();
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }

  /**
   * Deletes a row from the database using the provided key.
   * @param {string} tableName - The name of the table to delete from.
   * @param {string} key - The key of the row to delete.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async deleteRowByKey(tableName, key) {
    const query = `DELETE FROM ${tableName} WHERE key_column = ?`;

    try {
      await this.connection.execute(query, [key]);
      return Promise.resolve();
    } catch (error) {
      throw new ElegantError({ expected: typeof error, message: error });
    }
  }


}

export { MySQLAdaptor };
