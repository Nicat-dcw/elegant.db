/**
 * Represents a JSON Adaptor for storing data using fs-extra.
 */
declare class JSONAdaptor {
    private path;
    private data;
    private cache;
    /**
     * Creates a new instance of the JSON class.
     * @param {Object} options - The options for the adaptor.
     * @param {string} options.path - The path to the JSON data file.
     */
    constructor(options: {
        path: string;
        cache?: any;
    });
    /**
     * Sets a value in the data and saves it to the file.
     * @param {string} key - The key to set.
     * @param {*} value - The value to set.
     */
    set(key: string, value: any): void;
    /**
     * Adds a value to the data and saves it to the file.
     * @param {string} key - The key to set.
     * @param {number} value - The value to add.
     */
    add(key: string, value: number): void;
    /**
     * Gets a value from the data.
     * @param {string} key - The key to retrieve.
     * @returns {*} The value associated with the key.
     */
    get(key: string): any;
    /**
     * Checks if a key exists in the data.
     * @param {string} key - The key to check.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key: string): boolean;
    /**
     * Removes a key from the data and saves it to the file.
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
     * Creates a clone of the JSON instance.
     * @param {string} path - The path for the cloned instance's data file.
     * @returns {JSONAdaptor} A new instance of the JSON.
     */
    clone(path: string): JSONAdaptor;
    all(): Promise<any>;
    /**
     * Loads data from the file.
     * @private
     */
    private loadData;
    /**
     * Saves data to the file.
     * @private
     */
    private saveData;
    /**
     * Shows Adaptor Name
     * @readonly
     */
    adaptor(): string;
}
export { JSONAdaptor };
//# sourceMappingURL=json.d.ts.map