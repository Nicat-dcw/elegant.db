import { bgRed, magentaBright, whiteBright, bgMagenta, yellow, bold } from 'colorette';

class ElegantError extends Error {
  date: number;
  expected: string;

  /** 
   * @param {Object} options - The error options.
   * @param {string} options.expected - The expected type or value.
   * @param {string} options.message - The custom error message.
   */
  constructor({ expected, message }: { expected: string; message: string }) {
    const errorMessage = bold(bgMagenta(whiteBright("ElegantError:"))) + yellow(` ${message}`);

    super(errorMessage); // Pass the error message directly to the super constructor
    this.name = "ElegantError"; // Assign a name to the error
    this.date = new Date().getTime();
    this.expected = expected;
  }

  async asBox(): Promise <string>{
    
    return this.message;
  }
}

export default ElegantError;