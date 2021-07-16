let operands = [];
let operator = null;

const operatorButtons = document.querySelectorAll(".operator");
const displayDiv = document.querySelector(".display");
const operatorsDiv = document.querySelector(".operators");


onOperatorClick();
onNumClick();
onEqualsClick();

// Bug: becoming empty after doing equals then operator
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

            if (displayDiv.id == "reset") {
                operator = operatorButton.id;
                return;
            }
            operands.push(Number(displayDiv.textContent));

            if (operands.length == 2) {
                console.log("operator = " + operator);
                console.log("operands[0] = " + operands[0]);
                console.log("operands[1] = " + operands[1]);
                let results = operate(operator, operands[0], operands[1]);
                display(results);
                operands.pop();
                operands[0] = results;
            }
            operator = operatorButton.id;

            displayDiv.id = "reset";
        })
    });
}

function onEqualsClick() {
    const equalsButton = document.querySelector(".equals");

    equalsButton.addEventListener("click", () => {

        if (operatorsDiv.classList.contains("active")) {
            operatorButtons.forEach(operatorButton => operatorButton.classList.remove("active"));
            operatorsDiv.classList.remove("active");
        }

        if (operator == null) {
            return;
        }

        if (displayDiv.id == "reset") {
            return;
        }
        operands.push(Number(displayDiv.textContent));

        if (operands.length == 2) {
            let results = operate(operator, operands[0], operands[1]);
            display(results);
            operands.pop();
            operands[0] = results;
        }
        displayDiv.id = "reset";
        operator = null;
    });
}

function onNumClick() {
    const numButtons = document.querySelectorAll(".number");

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
            console.log(displayDiv.id);
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