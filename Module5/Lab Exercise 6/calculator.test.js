const request = require("supertest");
const app = require('./app');
// const express = require("express"); // this was all before I made app.js which I still don't understand why we do add that?
// const calculatorRoutes = require("./routes/calculatorroutes");

// const app = express();
// app.use("/calculator", calculatorRoutes);

describe("Calculator Routes", () => {
  // generate some random numbers to test the calculator
  let number1 = Math.floor(Math.random() * 1000);
  let number2 = Math.floor(Math.random() * 1000);

  console.log("Test numbers:", number1, number2);
  
  test("GET /calculator/add => sum of numbers", () => {
    return request(app)
      .get(`/calculator/add?num1=${number1}&num2=${number2}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log("Addition - Actual response:", response.body);
        console.log("Addition - Expected:", { res: number1 + number2 });
        expect(response.body).toEqual({
          res: number1 + number2,
        });
      });
  });

  test("GET /calculator/subtract => difference of numbers", () => {
    return request(app)
      .get(`/calculator/subtract?num1=${number1}&num2=${number2}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log("Subtraction - Actual response:", response.body);
        console.log("Subtraction - Expected:", { res: number1 - number2 });
        expect(response.body).toEqual({
          res: number1 - number2,
        });
      });
  });

  test("GET /calculator/multiply => product of numbers", () => {
    return request(app)
      .get(`/calculator/multiply?num1=${number1}&num2=${number2}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log("Multiplication - Actual response:", response.body);
        console.log("Multiplication - Expected:", { res: number1 * number2 });
        expect(response.body).toEqual({
          res: number1 * number2,
        });
      });
  });

  test("GET /calculator/divide => quotient of numbers", () => {
    return request(app)
      .get(`/calculator/divide?num1=${number1}&num2=${number2}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        console.log("Division - Actual response:", response.body);
        console.log("Division - Expected:", { res: number1 / number2 });
        expect(response.body).toEqual({
          res: number1 / number2,
        });
      });
  });
});
