let operands = [];
let operator = null;

const operatorButtons = document.querySelectorAll(".operator");
const displayDiv = document.querySelector(".display");
const operatorsDiv = document.querySelector(".operators");
const equalsButton = document.querySelector(".equals");
const numButtons = document.querySelectorAll(".number");

onOperatorClick();
onNumClick();
onEqualsClick();

function onOperatorClick() {
    operatorButtons.forEach(operatorButton => {
        operatorButton.addEventListener("click", () => {

            if (!(operatorButton.classList.contains("active"))) {
                if (operatorsDiv.classList.contains("active")) {
                    operatorButtons.forEach(operatorButton => operatorButton.classList.remove("active"));
                }
                operatorButton.classList.add("active");
            }
            if (!(operatorsDiv.classList.contains("active"))) {
                operatorsDiv.classList.add("active");
            }
            
            if (operator == null) {
                operator = operatorButton.id;
            }
            if (displayDiv.id == "reset") {
                operator = operatorButton.id;
                return;
            }
            operands.push(Number(displayDiv.textContent));

            displayResults();

            operator = operatorButton.id;
            displayDiv.id = "reset";
            
        })
    });
}

function onEqualsClick() {
    equalsButton.addEventListener("click", () => {
        disableOperators();

        if (operator == null || displayDiv.id == "reset") {
            return;
        }
        operands.push(Number(displayDiv.textContent));

        displayResults();

        operator = null;
        displayDiv.id = "reset";
    });
}

function displayResults() {
    if (operands.length === 2) {
        let results = operate(operator, operands[0], operands[1]);
        display(results);
        operands.pop();
        operands[0] = results;
    }
}

function disableOperators() {
    if (operatorsDiv.classList.contains("active")) {
        operatorButtons.forEach(operatorButton => operatorButton.classList.remove("active"));
        operatorsDiv.classList.remove("active");
    }
}

function onNumClick() {
    numButtons.forEach(numButton => {
        numButton.addEventListener("click", () => {
            if (displayDiv.textContent == 0 || displayDiv.id == "reset") {
                display(numButton.textContent);
                if (displayDiv.id == "reset") {
                    displayDiv.id = numButton.textContent;
                    return;
                }
            } else {
                let newNum = displayDiv.textContent + numButton.textContent;
                display(newNum);
                displayDiv.id = newNum;
            }
        });
    });
}

function display(numText) {
    const displayDiv = document.querySelector(".display");
    displayDiv.textContent = numText;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "plus":
            return add(num1, num2);
        case "minus":
            return minus(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
    }
}

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function minus(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}