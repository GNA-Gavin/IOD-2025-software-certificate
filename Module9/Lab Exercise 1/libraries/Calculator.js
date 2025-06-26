const Logger = require("./Logger");

class Calculator {
  constructor() {
    this.id = Date.now();
  }
//   #log = (value) => {
//     console.log(`[Calculator :${this.id}]:${value}`);
//   };

  add(num1, num2) {
    const value = num1 + num2;
    // this.#log(value);
    Logger.log(this.id, `Addition: ${num1} + ${num2}`, value);
    return value;
  }

  subtract(num1, num2) {
    const value = num1 - num2;
    // this.#log(value);
    Logger.log(this.id, `Subtraction: ${num1} - ${num2}`, value);
    return value;
  }

  multiply(num1, num2) {
    const value = num1 * num2;
    // this.#log(value);
    Logger.log(this.id, `Multiplication: ${num1} × ${num2}`, value);
    return value;
  }

  divide(num1, num2) {
    const value = num1 / num2;
    // this.#log(value);
    Logger.log(this.id, `Division: ${num1} ÷ ${num2}`, value);
    return value;
  }
}

module.exports = Calculator;
