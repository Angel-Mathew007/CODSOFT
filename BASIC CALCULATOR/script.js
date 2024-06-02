// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = currentInput || '0';
    }

    function handleNumber(number) {
        if (waitingForSecondOperand) {
            currentInput = number;
            waitingForSecondOperand = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null && !isNaN(inputValue)) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            currentInput = `${result}`;
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    function calculate(first, second, operator) {
        if (operator === '+') return first + second;
        if (operator === '-') return first - second;
        if (operator === '*') return first * second;
        if (operator === '/') return first / second;
        return second;
    }

    function handleClear() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }

    function handleDelete() {
        currentInput = currentInput.slice(0, -1);
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { action } = button.dataset;
            const buttonContent = button.textContent;

            if (action === 'number') {
                handleNumber(buttonContent);
                updateDisplay();
                return;
            }

            if (action === 'operation') {
                handleOperator(buttonContent);
                updateDisplay();
                return;
            }

            if (action === 'decimal') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
                updateDisplay();
                return;
            }

            if (action === 'clear') {
                handleClear();
                updateDisplay();
                return;
            }

            if (action === 'delete') {
                handleDelete();
                updateDisplay();
                return;
            }

            if (action === 'equals') {
                handleOperator(operator);
                updateDisplay();
                waitingForSecondOperand = false;
                return;
            }
        });
    });

    updateDisplay();
});
