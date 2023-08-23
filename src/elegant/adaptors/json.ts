import * as fs from 'node:fs/promises';
import { createWriteStream } from 'graceful-fs'
import ElegantError from '../managers/error'

/**
 * Represents a JSON Adaptor for storing data using fs-extra.
 */
 
class JSONAdaptor {
  private path: string;
  private data: { [key: string]: any };
  private cache: any;
  /**
   * Creates a new instance of the JSON class.
   * @param {Object} options - The options for the adaptor.
   * @param {string} options.path - The path to the JSON data file.
   */
  constructor(options: { path: string, cache?: any }) {
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
   * Pushes a value or an array of values to an array in the data and saves it to the file.
   * @param {string} key - The key of the array.
   * @param {*} value - The value(s) to push to the array.
   */
  push(key: string, value: any): void {
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
  clone(path: string): JSONAdaptor {
    const clonedAdaptor = new JSONAdaptor({ path });
    clonedAdaptor.data = { ...this.data };
    return clonedAdaptor;
  }
  
 async all(): Promise<any> {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return data;
    } catch (err) {
      console.error(err)
    }
 }
 

 
  /**
   * Loads data from the file.
   * @private
   */
  private async loadData(): Promise<void> {
    try {
      /*if (!(await fs.access(this.path).catch(() => false))) {
        this.data = {};
        return;
      }*/
      const cachedData = this.cache;
      const data = await fs.readFile(this.path, 'utf-8');
      if(this.cache) { 
        this.cache = cachedData;
      } else {
      this.data = JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
  
  /**
   * Saves data to the file.
   * @private
   */
  private async saveData(): Promise<void> {
    try {
     if(this.cache) {
       const dataToWrite = JSON.stringify(this.cache, null, 2);

        await fs.writeFileSync(this.path, dataToWrite, 'utf-8');
     } else {
       const writter = await createWriteStream(this.path); 
       writter.write(JSON.stringify(this.data, null, 2), 'utf-8')
       writter.end()
     }
    } catch (error) {
      console.error('Error saving data:', error);
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