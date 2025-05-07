function calculate() {
  let num1 = parseFloat(document.getElementById("number1").value);
  let num2 = parseFloat(document.getElementById("number2").value);
  let operator = document.getElementById("operatorSelect").value;
  let result;

  if (isNaN(num1) || isNaN(num2)) {
    alert("Please enter valid numbers!");
    return;
  }

  let endpoint;
  switch (operator) {
    case "+":
      endpoint = "add";
      break;
    case "-":
      endpoint = "subtract";
      break;
    case "x":
      endpoint = "multiply";
      break;
    case "/":
      endpoint = "divide";
      break;
    default:
      alert("Invalid operation!");
      return;
  }

  // Call the appropriate API endpoint
  fetch(`/calculator/${endpoint}?num1=${num1}&num2=${num2}`)
    .then((response) => response.json())
    .then((data) => {
      result = parseFloat(data.res);
      let formattedResult = result.toFixed(10);

      console.log(formattedResult);
      displayResult(formattedResult);
    });
}

function displayResult(value) {
  let resultBox = document.getElementById("resultBox");
  if (!resultBox) {
    resultBox = document.createElement("div");
    resultBox.id = "resultBox";
    resultBox.className = "result-box";
    document.body.appendChild(resultBox);
  }
  resultBox.innerText = value;
}

function clearFields() {
  document.getElementById("number1").value = "";
  document.getElementById("number2").value = "";
  let resultBox = document.getElementById("resultBox");
  if (resultBox) {
    resultBox.style.display = "none";
  }
}

// Add event listeners for keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculate();
  } else if (event.key.toLowerCase() === "c") {
    clearFields();
  }
});
