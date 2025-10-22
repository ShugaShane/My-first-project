let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;
let formula = '';
let justCalculated = false;

function updateDisplay() {
    const display = document.getElementById('display');
    // Show formula if it exists, otherwise show the current value
    display.textContent = formula || displayValue;
}

function appendNumber(num) {
    // If we just calculated, start fresh
    if (justCalculated) {
        displayValue = num;
        formula = num;
        justCalculated = false;
    } else if (waitingForSecondOperand) {
        displayValue = num;
        formula += num;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
        if (formula === '' || formula.endsWith(' ')) {
            formula += num;
        } else {
            formula += num;
        }
    }
    updateDisplay();
}

function appendOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    // If we just calculated, continue from the result
    if (justCalculated) {
        justCalculated = false;
        formula = displayValue;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
        if (formula === '') {
            formula = displayValue;
        }
    } else if (operator) {
        const result = performCalculation();
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
        // Update formula with the result for chained operations
        formula = displayValue;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    formula += ' ' + nextOperator + ' ';
    updateDisplay();
}

function performCalculation() {
    const inputValue = parseFloat(displayValue);

    if (operator === '+') {
        return firstOperand + inputValue;
    } else if (operator === '-') {
        return firstOperand - inputValue;
    } else if (operator === '×') {
        return firstOperand * inputValue;
    } else if (operator === '÷') {
        return firstOperand / inputValue;
    }

    return inputValue;
}

function calculate() {
    if (operator && !waitingForSecondOperand) {
        const result = performCalculation();
        const resultValue = parseFloat(result.toFixed(7));
        // Show complete calculation with result
        formula += ' = ' + resultValue;
        displayValue = `${resultValue}`;
        updateDisplay();

        // Reset for next calculation but remember we just calculated
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        justCalculated = true;
        formula = '';
    }
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    formula = '';
    justCalculated = false;
    updateDisplay();
}

// Initialize display
updateDisplay();
