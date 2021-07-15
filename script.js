start();

function start() {
    onNumClick();

    let value = 0;
}

function onNumClick(value) {
    const numButtons = document.querySelectorAll(".number");
    const displayDiv = document.querySelector(".display");

    numButtons.forEach(numButton => {
        numButton.addEventListener("click", () => display(
            displayDiv.textContent == 0 ? numButton.textContent : displayDiv.textContent + numButton.textContent));
    });
}

function display(numText) {
    const displayDiv = document.querySelector(".display");

    displayDiv.textContent = numText;
}

function operate(operator, num1, num2) {
    operator(num1, num2);
}

function add(num1, num2) {
    return num1 + num2;
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