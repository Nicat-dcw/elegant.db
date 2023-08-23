import { JSONAdaptor, ElegantAdaptor } from './src/elegant/index';
/**
 * Represents a database with advanced features.
 */
declare class Database {
    private elegant;
    private path;
    private database;
    private useExperimentalCaches?;
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
        elegant?: object;
        disableCheckUpdates?: boolean;
        useExperimentalCaches?: boolean;
    });
    /**
     * Sets a value in the database.
     * @param {string} key - The key to set.
     * @param {*} value - The value to set.
     */
    set(key: string, value: any): void;
    /**
     * Add's a value in the database.
     * @param {string} key - The key to set.
     * @param {*} value - The value to add.
     */
    add(key: string, value: any): void;
    /**
     * Gets a value from the database.
     * @param {string} key - The key to retrieve.
     * @returns {*} The value associated with the key.
     */
    get(key: string): any;
    /**
     * Checks if a key exists in the database.
     * @param {string} key - The key to check.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key: string): boolean;
    /**
     * Removes a key from the database.
     * @param {string} key - The key to remove.
     */
    remove(key: string): void;
    /**
      * Pushes a value or an array of values to an array in the data and saves it to the file.
      * @param {string} key - The key of the array.
      * @param {*} value - The value(s) to push to the array.
     */
    push(key: string, value: any): void;
    /**
     * Transfers Another Database values to ElegantDB
     * @params {object} database database
     * @example <db>.transfer(<otherdb>.all(), (data) => { console.log(data) })
    */
    transfer(database: {
        [key: string]: any;
    }, callback?: (result: string) => void): void;
    /**
     * Creates a clone of the database instance.
     * @returns {Object} A new instance of the database.
     */
    clone(): JSONAdaptor | ElegantAdaptor;
    /**
     * Get All Database values and keys
     * @returns {Object}
     * @readonly
     *
     */
    all(): Promise<any>;
    /**
     * Get All Cache
     * @returns {Object} data of cache
     * @readonly
    */
    getCache(): any;
}
export { Database, JSONAdaptor, ElegantAdaptor };
//# sourceMappingURL=index.d.ts.map