"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorette_1 = require("colorette");
class ElegantError extends Error {
    /**
     * @param {Object} options - The error options.
     * @param {string} options.expected - The expected type or value.
     * @param {string} options.message - The custom error message.
     */
    constructor({ expected, message }) {
        const errorMessage = (0, colorette_1.bold)((0, colorette_1.bgMagenta)((0, colorette_1.whiteBright)("ElegantError:"))) + (0, colorette_1.yellow)(` ${message}`);
        super(errorMessage); // Pass the error message directly to the super constructor
        this.name = "ElegantError"; // Assign a name to the error
        this.date = new Date().getTime();
        this.expected = expected;
    }
    async asBox() {
        return this.message;
    }
}
exports.default = ElegantError;
