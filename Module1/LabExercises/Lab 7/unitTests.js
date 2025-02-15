// this function returns a minus b
function minus(a, b) {}

// Create the Test
if (minus(4, 2) != 2) {
  throw new Error("Test failed");
}
if (minus(6, 3) != 3) {
  throw new Error("Test failed");
}
if (minus(10, 5) == 5) {
  console.log("Test Passed");
}

// Write the Code
function minus(a, b) {
  return a - b;
}
console.log("All minus tests passed.");

// this function returns a divided by b
function divide(a, b) {}

// Create the Test
if (divide(4, 2) != 2) {
  throw new Error("Test failed");
}
if (divide(6, 3) != 2) {
  throw new Error("Test failed");
}
if (divide(10, 5) == 2) {
  console.log("Test Passed");
}

// Write the Code
function divide(a, b) {
  return a / b;
}
console.log("All divide tests passed.");

// this function returns a times b
function multiply(a, b) {}

// Create the Test
if (multiply(4, 2) != 8) {
  throw new Error("Test failed");
}
if (multiply(6, 3) != 18) {
  throw new Error("Test failed");
}
if (multiply(10, 5) == 50) {
  console.log("Test Passed");
}

// Write the Code
function multiply(a, b) {
  return a * b;
}
console.log("All multiply tests passed.");

// this function returns string "Hello" with the string stored in a appended
function helloName(a) {}

// Create the Test
if (helloName("Gavin") != "Hello Gavin") {
  throw new Error("Test failed");
}
if (helloName("Mirza") != "Hello Mirza") {
  throw new Error("Test failed");
}
if (helloName("Graham") == "Hello Graham") {
  console.log("Test Passed");
}

// Write the Code
function helloName(a) {
  return "Hello " + a;
}
console.log("All helloName tests passed.");
