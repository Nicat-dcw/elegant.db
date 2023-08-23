"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONAdaptor = void 0;
const fs = __importStar(require("node:fs/promises"));
const graceful_fs_1 = require("graceful-fs");
const error_1 = __importDefault(require("../managers/error"));
/**
 * Represents a JSON Adaptor for storing data using fs-extra.
 */
class JSONAdaptor {
    path;
    data;
    cache;
    /**
     * Creates a new instance of the JSON class.
     * @param {Object} options - The options for the adaptor.
     * @param {string} options.path - The path to the JSON data file.
     */
    constructor(options) {
        const { path, cache } = options;
        this.path = path || "./elegant.json";
        this.data = {};
        this.cache = cache ?? false;
        // Load data from file if it exists
        this.loadData();
    }
    /**
     * Sets a value in the data and saves it to the file.
     * @param {string} key - The key to set.
     * @param {*} value - The value to set.
     */
    set(key, value) {
        this.data[key] = value;
        this.saveData();
    }
    /**
     * Adds a value to the data and saves it to the file.
     * @param {string} key - The key to set.
     * @param {number} value - The value to add.
     */
    add(key, value) {
        if (typeof value !== "number") {
            throw new error_1.default({
                expected: typeof value,
                message: "Value isn't a number. If you're using '+', then you might not write it."
            });
        }
        if (!this.data[key]) {
            this.data[key] = 0;
        }
        this.data[key] = Number(this.get(key) || 0) + value;
        this.saveData();
    }
    /**
     * Gets a value from the data.
     * @param {string} key - The key to retrieve.
     * @returns {*} The value associated with the key.
     */
    get(key) {
        return this.data[key];
    }
    /**
     * Checks if a key exists in the data.
     * @param {string} key - The key to check.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key) {
        return key in this.data;
    }
    /**
     * Removes a key from the data and saves it to the file.
     * @param {string} key - The key to remove.
     */
    remove(key) {
        if (this.data.hasOwnProperty(key)) {
            delete this.data[key];
            this.saveData();
        }
    }
    /**
     * Pushes a value or an array of values to an array in the data and saves it to the file.
     * @param {string} key - The key of the array.
     * @param {*} value - The value(s) to push to the array.
     */
    push(key, value) {
        if (!Array.isArray(this.data[key])) {
            this.data[key] = [];
        }
        const valuesToAdd = Array.isArray(value) ? value : [value];
        this.data[key].push(...valuesToAdd);
        this.saveData();
    }
    /**
     * Creates a clone of the JSON instance.
     * @param {string} path - The path for the cloned instance's data file.
     * @returns {JSONAdaptor} A new instance of the JSON.
     */
    clone(path) {
        const clonedAdaptor = new JSONAdaptor({ path });
        clonedAdaptor.data = { ...this.data };
        return clonedAdaptor;
    }
    async all() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return data;
        }
        catch (err) {
            console.error(err);
        }
    }
    /**
     * Loads data from the file.
     * @private
     */
    async loadData() {
        try {
            /*if (!(await fs.access(this.path).catch(() => false))) {
              this.data = {};
              return;
            }*/
            const cachedData = this.cache;
            const data = await fs.readFile(this.path, 'utf-8');
            if (this.cache) {
                this.cache = cachedData;
            }
            else {
                this.data = JSON.parse(data);
            }
        }
        catch (error) {
            console.error('Error loading data:', error);
        }
    }
    /**
     * Saves data to the file.
     * @private
     */
    async saveData() {
        try {
            if (this.cache) {
                const dataToWrite = JSON.stringify(this.cache, null, 2);
                await fs.writeFile(this.path, dataToWrite, 'utf-8');
            }
            else {
                const writter = await (0, graceful_fs_1.createWriteStream)(this.path);
                writter.write(JSON.stringify(this.data, null, 2), 'utf-8');
                writter.end();
            }
        }
        catch (error) {
            console.error('Error saving data:', error);
        }
    }
    /**
     * Shows Adaptor Name
     * @readonly
     */
    adaptor() {
        return "JSON";
    }
}
exports.JSONAdaptor = JSONAdaptor;
//# sourceMappingURL=json.js.map