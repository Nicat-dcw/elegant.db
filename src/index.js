"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElegantAdaptor = exports.JSONAdaptor = exports.Database = void 0;
const index_1 = require("./src/elegant/index");
Object.defineProperty(exports, "JSONAdaptor", { enumerable: true, get: function () { return index_1.JSONAdaptor; } });
Object.defineProperty(exports, "ElegantAdaptor", { enumerable: true, get: function () { return index_1.ElegantAdaptor; } });
const error_1 = __importDefault(require("./src/elegant/managers/error"));
//import EventEmitter from '@elegantdb/events';
/**
 * Represents a database with advanced features.
 */
class Database {
    elegant;
    path;
    database;
    useExperimentalCaches;
    //private emitter: EventEmitter;
    /**
     * Creates a new instance of the Database class.
     * @param {Object} options - The options for the database.
     * @param {Object} options.adaptor - The adaptor for the database.
     * @param {string} options.path - The path to the database.
     * @throws {ElegantError} Throws an error if required options are missing.
     * @private
     */
    constructor(options) {
        //  const updateChecker = new UpdateChecker();
        const { useExperimentalCaches, adaptor, path, disableCheckUpdates } = options || {};
        if (!adaptor) {
            throw new error_1.default({
                expected: "adaptor",
                message: "You must provide an Adaptor for the Database."
            });
        }
        if (path && typeof path !== "string") {
            throw new error_1.default({
                expected: "string",
                message: "The 'path' key must be a string."
            });
        }
        if (disableCheckUpdates === false) {
            //  new UpdateChecker().checkUpdates();
        }
        this.elegant = {
            cache: new Map()
        };
        this.path = path || './elegant.json'; // @ts-ignore
        /*if(useExperimentalCaches === true) {
          this.database = new adaptor({ path: path, cache: this.elegant.cache });
        } else {
          this.database = new adaptor({ path: path }); // @ts-ignore
        }*/
        // @ts-ignore
        this.database = new adaptor({ path: path, cache: useExperimentalCaches ?? false });
    }
    /**
     * Sets a value in the database.
     * @param {string} key - The key to set.
     * @param {*} value - The value to set.
     */
    set(key, value) {
        if (!key || typeof key !== 'string') {
            throw new error_1.default({
                expected: 'string',
                message: `Expected 'string', but got '${typeof key}'.`
            });
        }
        //this.emitter.emit("dataset", { key: key, value: value, adaptor: this.database.adaptor() });
        this.elegant.cache.set(key, value);
        this.database.set(key, value);
    }
    /**
     * Add's a value in the database.
     * @param {string} key - The key to set.
     * @param {*} value - The value to add.
     */
    add(key, value) {
        if (!key || typeof key !== 'string') {
            throw new error_1.default({
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
    get(key) {
        if (typeof key !== 'string') {
            throw new error_1.default({
                expected: 'string',
                message: `Expected 'string', but got '${typeof key}'.`
            });
        }
        //this.emitter.emit("dataget", { key, value: this.database.get(key) });
        return this.elegant.cache.get(key);
    }
    /**
     * Checks if a key exists in the database.
     * @param {string} key - The key to check.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key) {
        if (typeof key !== 'string') {
            throw new error_1.default({
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
    remove(key) {
        if (typeof key !== 'string') {
            throw new error_1.default({
                expected: 'string',
                message: `Expected 'string', but got '${typeof key}'.`
            });
        }
        //this.emitter.emit("dataremove", { key });
        this.elegant.cache.delete(key);
        return this.database.remove(key);
    }
    /**
      * Pushes a value or an array of values to an array in the data and saves it to the file.
      * @param {string} key - The key of the array.
      * @param {*} value - The value(s) to push to the array.
     */
    push(key, value) {
        this.database.push(key, value);
    }
    /**
     * Transfers Another Database values to ElegantDB
     * @params {object} database database
     * @example <db>.transfer(<otherdb>.all(), (data) => { console.log(data) })
    */
    transfer(database, callback) {
        if (typeof database !== "object") {
            throw new error_1.default({ expected: 'object', message: 'Input database must be an object.' });
        }
        for (const key in database) {
            const value = database[key];
            this.set(key, value);
        }
        if (typeof callback === 'function') {
            callback('transfered successfully!');
        }
    }
    /**
     * Creates a clone of the database instance.
     * @returns {Object} A new instance of the database.
     */
    clone() {
        //this.emitter.emit("clone", { dbPath: this.path });
        return this.database.clone(this.path);
    }
    /**
     * Get All Database values and keys
     * @returns {Object}
     * @readonly
     *
     */
    async all() {
        const data = await this.database.all();
        console.log(data);
        for (const [key, value] of data) {
            return { key, value };
        }
    }
    /**
     * Get All Cache
     * @returns {Object} data of cache
     * @readonly
    */
    getCache() {
        const cache = this.elegant.cache;
        for (const [key, value] of cache) {
            return {
                key: key,
                value: value
            };
        }
    }
}
exports.Database = Database;
//# sourceMappingURL=index.js.map