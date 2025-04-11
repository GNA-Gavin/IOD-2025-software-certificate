function calculate() {
    let num1 = parseFloat(document.getElementById("number1").value);
    let num2 = parseFloat(document.getElementById("number2").value);
    let operator = document.getElementById("operatorSelect").value;
    let result;

    if (isNaN(num1) || isNaN(num2)) {
        alert("Please enter valid numbers!");
        return;
    }

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            result = num1 / num2;
            break;
        default:
            alert("Invalid operation!");
            return;
    }

    result = Math.round(result * 1e20) / 1e20; // Round result to maximum 20 decimal places 
    displayResult(result);
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
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calculate();
    } else if (event.key.toLowerCase() === "c") {
        clearFields();
    }
});