import * as fs from 'node:fs/promises';
import ElegantError from '../managers/error'

/**
 * Represents a JSON Adaptor for storing data using fs-extra.
 */
class JSONAdaptor {
  private path: string;
  private data: { [key: string]: any };

  /**
   * Creates a new instance of the JSON class.
   * @param {Object} options - The options for the adaptor.
   * @param {string} options.path - The path to the JSON data file.
   */
  constructor(options: { path: string }) {
    const { path } = options;
    this.path = path || "./elegant.json";
    this.data = {};

    // Load data from file if it exists
    this.loadData();
  }

  /**
   * Sets a value in the data and saves it to the file.
   * @param {string} key - The key to set.
   * @param {*} value - The value to set.
   */
  set(key: string, value: any): void {
    this.data[key] = value;
    this.saveData();
  }

  /**
   * Adds a value to the data and saves it to the file.
   * @param {string} key - The key to set.
   * @param {number} value - The value to add.
   */
  add(key: string, value: number): void {
    if (typeof value !== "number") {
      throw new ElegantError({
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
  get(key: string): any {
    return this.data[key];
  }

  /**
   * Checks if a key exists in the data.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has(key: string): boolean {
    return key in this.data;
  }

  /**
   * Removes a key from the data and saves it to the file.
   * @param {string} key - The key to remove.
   */
  remove(key: string): void {
    if (this.data.hasOwnProperty(key)) {
      delete this.data[key];
      this.saveData();
    }
  }

  /**
   * Creates a clone of the JSON instance.
   * @param {string} path - The path for the cloned instance's data file.
   * @returns {JSONAdaptor} A new instance of the JSON.
   */
  clone(path: string): JSONAdaptor {
    const clonedAdaptor = new JSONAdaptor({ path });
    clonedAdaptor.data = { ...this.data };
    return clonedAdaptor;
  }

  /**
   * Loads data from the file.
   * @private
   */
  private async loadData(): Promise<void> {
    try {
      if (!(await fs.access(this.path).catch(() => false))) {
        this.data = {};
        return;
      }

      const data = await fs.readFile(this.path, 'utf-8');
      this.data = JSON.parse(data);
      // console.log('Data loaded successfully.');
    } catch (error) {
      throw new ElegantError({
        expected: typeof error,
        message: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Saves data to the file.
   * @private
   */
  private async saveData(): Promise<void> {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.data, null, 4), 'utf-8');
      //  console.log('Data saved successfully.');
    } catch (error) {
      throw new ElegantError({
        expected: typeof error,
        message: error instanceof Error ? error.message : String(error)
      });
    }
  }

  /**
   * Shows Adaptor Name
   * @readonly
   */
  adaptor(): string {
    return "JSON";
  }
}

export { JSONAdaptor };