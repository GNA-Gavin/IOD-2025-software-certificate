class Logger {

  static log(callerId, message, result = null) {
    const timestamp = new Date().toISOString();
    const resultPart = result !== null ? `, Result: ${result}` : "";
    console.log(`[${timestamp}][${callerId}]: ${message}${resultPart}`);
  }
  
}

module.exports = Logger;
