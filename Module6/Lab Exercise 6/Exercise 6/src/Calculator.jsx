import { useState } from "react";
import NumberInput from "./NumberInput";
import Operator from "./Operator";
import ResultDisplay from "./ResultDisplay";

function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateResult = (e) => {
    e.preventDefault();

    // Validation logic remains the same
    if (num1 === "" || num2 === "") {
      setError("Please enter both numbers");
      return;
    }

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setError("Please enter valid numbers");
      return;
    }

    setError("");

    // Calculation logic
    let calculatedResult;
    switch (operator) {
      case "+":
        calculatedResult = number1 + number2;
        break;
      case "-":
        calculatedResult = number1 - number2;
        break;
      case "*":
        calculatedResult = number1 * number2;
        break;
      case "/":
        if (number2 === 0) {
          setError("Cannot divide by zero");
          return;
        }
        calculatedResult = number1 / number2;
        break;
      default:
        setError("Invalid operator");
        return;
    }

    setResult(calculatedResult);
  };

  return (
    <div
      className="calculator">
      <h2>Simple Calculator</h2>

      <form onSubmit={calculateResult}>
        <NumberInput
          value={num1}
          onChange={setNum1}
          placeholder="Enter first number"
        />

        <Operator value={operator} onChange={setOperator} />

        <NumberInput
          value={num2}
          onChange={setNum2}
          placeholder="Enter second number"
        />

        <button
          type="submit"
          style={{
            backgroundColor: "green",
            color: "white",
            marginTop: "10px"
          }}
        >
          Calculate
        </button>
      </form>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

      {result !== null && !error && (
        <ResultDisplay
          num1={num1}
          num2={num2}
          operator={operator}
          result={result}
        />
      )}
    </div>
  );
}

export default Calculator;
