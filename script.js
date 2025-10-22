let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;
let formula = '';
let justCalculated = false;
let calculationHistory = [];

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
        const completeFormula = formula + ' = ' + resultValue;
        formula = completeFormula;
        displayValue = `${resultValue}`;
        updateDisplay();

        // Add to history
        addToHistory(completeFormula);

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

function toggleHistory() {
    const panel = document.getElementById('historyPanel');
    panel.classList.toggle('open');
}

function addToHistory(formula) {
    calculationHistory.push(formula);
    updateHistoryDisplay();
}

function clearHistory() {
    calculationHistory = [];
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');

    if (calculationHistory.length === 0) {
        historyList.innerHTML = '<p class="no-history">No calculations yet</p>';
    } else {
        historyList.innerHTML = '';
        // Display in reverse order (newest first)
        for (let i = calculationHistory.length - 1; i >= 0; i--) {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.textContent = calculationHistory[i];
            historyList.appendChild(historyItem);
        }
    }
}

// Initialize display
updateDisplay();
