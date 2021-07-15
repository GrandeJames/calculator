start();

function start() {
    onOperatorClick();
    onNumClick();
}

let operands = [];
let operator = null;

function onOperatorClick() {
    const operatorButtons = document.querySelectorAll(".operator");
    const displayDiv = document.querySelector(".display");
    const operatorsDiv = document.querySelector(".operators");

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
            
            operands.push(Number(displayDiv.textContent));

            if (operands.length == 2) {
                let results = operate(operator, operands[0], operands[1]);
                display(results);
                operands.pop();
                operands[0] = results;
            }
            operator = operatorButton.id;
        })
    });
}

function onNumClick() {
    const numButtons = document.querySelectorAll(".number");
    const displayDiv = document.querySelector(".display");
    const operatorsDiv = document.querySelector(".operators");

    numButtons.forEach(numButton => {
        numButton.addEventListener("click", () => {
            display( (displayDiv.textContent == 0 || (operatorsDiv.classList.contains("active"))) ? numButton.textContent :
            displayDiv.textContent + numButton.textContent);            
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