function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}
    
function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate (operator, leftNum, rightNum) {
    let answer;
    switch(operator) {
        case '+': {
            answer = add(leftNum, rightNum);
            break;
        }    
        case '-': {
            answer = substract(leftNum, rightNum);
            break;
        }    
        case '*': {
            answer = multiply(leftNum, rightNum);
            break;
        }    
        case '/': {
            if (rightNum != 0) {
                answer = divide(leftNum, rightNum);
            } else {
                alert("You cannot divide by zero!")
                answer = 0;
            }
        }     
    }
    return answer;   
}

function clearDisplay() {
    display.textContent = '';
}

function resetValues() {
    leftOperand = undefined;
    rightOperand = undefined;
    operator = undefined;
    result = undefined;
}

const display = document.querySelector(".display");
let leftOperand, rightOperand, operator, result, haveMultipleOperators = false; 

const numberPad = document.querySelectorAll("button.numbers");
numberPad.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent += button.textContent;
    });
});

const operatorPad = document.querySelectorAll("button.operators");
operatorPad.forEach(button => {
    button.addEventListener('click', () => {
        if (leftOperand === undefined && operator === undefined && display.textContent !== "") {
            leftOperand = parseFloat(display.textContent);
            operator = button.textContent;
            clearDisplay();
        }
    })
});

const decimalKey = document.querySelectorAll("#decimal");
decimalKey.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent += button.textContent;
    })
});

const equalKey = document.querySelector("#equal");
equalKey.addEventListener('click', () => {
    if (leftOperand != undefined && operator != undefined && display.textContent != "") {
        rightOperand = parseFloat(display.textContent);
        result = parseFloat(operate(operator, leftOperand, rightOperand));
        clearDisplay();
        display.textContent += result;
    }
});

const clearKey = document.querySelector("#clear");
clearKey.addEventListener('click', () => {
    clearDisplay();
    resetValues();
})

const deleteKey = document.querySelector("#delete");
deleteKey.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0,-1); 
});

