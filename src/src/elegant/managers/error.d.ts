declare class ElegantError extends Error {
    date: number;
    expected: string;
    /**
     * @param {Object} options - The error options.
     * @param {string} options.expected - The expected type or value.
     * @param {string} options.message - The custom error message.
     */
    constructor({ expected, message }: {
        expected: string;
        message: string;
    });
    asBox(): Promise<string>;
}
export default ElegantError;
//# sourceMappingURL=error.d.ts.map