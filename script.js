start();

function start() {
    onOperatorClick();
    onNumClick();
    onEqualsClick();
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

            if (displayDiv.id == "reset") {
                operator = operatorButton.id;
                return;
            }
            operands.push(Number(displayDiv.textContent));

            if (operands.length == 2) {
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
    const operatorsDiv = document.querySelector(".operators");
    const operatorButtons = document.querySelectorAll(".operator");
    const displayDiv = document.querySelector(".display");

    equalsButton.addEventListener("click", () => {

       // Stop it from doing anything if didnt add anything new

        if (operatorsDiv.classList.contains("active")) {
            operatorButtons.forEach(operatorButton => operatorButton.classList.remove("active"));
            operatorsDiv.classList.remove("active");
        }

        if (operator == null) {
            return;
        }

        operands.push(Number(displayDiv.textContent));

        if (operands.length == 2) {
            console.log("operating");
            let results = operate(operator, operands[0], operands[1]);
            display(results);
            operands.pop();
            operands[0] = results;
        }
    });
}

function onNumClick() {
    const numButtons = document.querySelectorAll(".number");
    const displayDiv = document.querySelector(".display");

    numButtons.forEach(numButton => {
        numButton.addEventListener("click", () => {
            if (displayDiv.textContent == 0 || displayDiv.id == "reset") {
                display(numButton.textContent);
                if (displayDiv.id == "reset") {
                    displayDiv.id = numButton.textContent;
                    console.log(displayDiv.id);
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