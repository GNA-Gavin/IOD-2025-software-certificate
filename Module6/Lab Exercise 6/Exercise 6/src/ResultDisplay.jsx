function ResultDisplay({ num1, num2, operator, result }) {
  const getOperatorSymbol = (op) => {
    switch (op) {
      case "*":
        return "×";
      case "/":
        return "÷";
      default:
        return op;
    }
  };

  return (
    <div className="result">
      <h3>Result:</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {num1} {getOperatorSymbol(operator)} {num2} = {result}
      </p>
    </div>
  );
}

export default ResultDisplay;
