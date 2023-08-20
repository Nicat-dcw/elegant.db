import { JSONAdaptor, ElegantAdaptor } from './src/elegant/index';
import ElegantError from './src/elegant/managers/error';
import UpdateChecker from './src/elegant/managers/updater';
//import EventEmitter from '@elegantdb/events';

/**
 * Represents a database with advanced features.
 */
class Database {
  private path: string;
  private database: JSONAdaptor | ElegantAdaptor;
  //private emitter: EventEmitter;

  /**
   * Creates a new instance of the Database class.
   * @param {Object} options - The options for the database.
   * @param {Object} options.adaptor - The adaptor for the database.
   * @param {string} options.path - The path to the database.
   * @throws {ElegantError} Throws an error if required options are missing.
   * @private
   */
  constructor(options: {
    adaptor: JSONAdaptor | ElegantAdaptor;
    path?: string;
    disableCheckUpdates?: boolean;
  }) {
    const updateChecker = new UpdateChecker();

    const { adaptor, path, disableCheckUpdates } = options || {};
    if (!adaptor) {
      throw new ElegantError({
        expected: "adaptor",
        message: "You must provide an Adaptor for the Database."
      });
    }

    if (path && typeof path !== "string") {
      throw new ElegantError({
        expected: "string",
        message: "The 'path' key must be a string."
      });
    }

    if (disableCheckUpdates === false) {
      new UpdateChecker().checkUpdates();
    }
    /*
    /*if (createConfig === true) {
      fs.createFile("./")
    }*/
   // this.emitter = new EventEmitter();
    this.path = path || './elegant.json'; // @ts-ignore
    this.database = new adaptor({ path: path });
  }

  /**
   * Sets a value in the database.
   * @param {string} key - The key to set.
   * @param {*} value - The value to set.
   */
  set(key: string, value: any): void {
    if (!key || typeof key !== 'string') {
      throw new ElegantError({
        expected: 'string',
        message: `Expected 'string', but got '${typeof key}'.`
      });
    }
    //this.emitter.emit("dataset", { key: key, value: value, adaptor: this.database.adaptor() });
    this.database.set(key, value);
  }

  /**
   * Add's a value in the database.
   * @param {string} key - The key to set.
   * @param {*} value - The value to add.
   */
  add(key: string, value: any): void {
    if (!key || typeof key !== 'string') {
      throw new ElegantError({
        expected: 'string',
        message: `Expected 'string', but got '${typeof key}'.`
      });
    }
    //this.emitter.emit("dataadd", { key: key, value: value, adaptor: this.database.adaptor() });
    this.database.add(key, value);
  }

  /**
   * Gets a value from the database.
   * @param {string} key - The key to retrieve.
   * @returns {*} The value associated with the key.
   */
  get(key: string): any {
    if (typeof key !== 'string') {
      throw new ElegantError({
        expected: 'string',
        message: `Expected 'string', but got '${typeof key}'.`
      });
    }
    //this.emitter.emit("dataget", { key, value: this.database.get(key) });
    return this.database.get(key);
  }

  /**
   * Checks if a key exists in the database.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has(key: string): boolean {
    if (typeof key !== 'string') {
      throw new ElegantError({
        expected: 'string',
        message: `Expected 'string', but got '${typeof key}'.`
      });
    }
    //this.emitter.emit("datahas", { key, response: this.database.has(key) });
    return this.database.has(key);
  }

  /**
   * Removes a key from the database.
   * @param {string} key - The key to remove.
   */
  remove(key: string): void {
    if (typeof key !== 'string') {
      throw new ElegantError({
        expected: 'string',
        message: `Expected 'string', but got '${typeof key}'.`
      });
    }
    //this.emitter.emit("dataremove", { key });
    this.database.remove(key);
  }

  /**
   * Creates a clone of the database instance.
   * @returns {Object} A new instance of the database.
   */
  clone(): JSONAdaptor | ElegantAdaptor {
    //this.emitter.emit("clone", { dbPath: this.path });
    return this.database.clone(this.path);
  }
}

export {
  Database,
  JSONAdaptor,
  ElegantAdaptor
};
