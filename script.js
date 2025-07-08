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
                resetValues();
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
    haveMultipleOperators = false;
}

function getResult() {
    rightOperand = parseFloat(display.textContent);
    return parseFloat(operate(operator, leftOperand, rightOperand).toFixed(3));
}

const display = document.querySelector(".display");
let leftOperand, rightOperand, operator, result, haveMultipleOperators = false; 

const numberPad = document.querySelectorAll("button.numbers");
numberPad.forEach(button => {
    button.addEventListener('click', () => {
        if (haveMultipleOperators) {
            clearDisplay();
            haveMultipleOperators = false;
        }
        display.textContent += button.textContent;
    });
});

const operatorPad = document.querySelectorAll("button.operators");
operatorPad.forEach(button => {
    button.addEventListener('click', () => {
        // Case when leftOperand or operator is not defined (1 +)
        if (leftOperand === undefined && operator === undefined && display.textContent !== "") {
            leftOperand = parseFloat(display.textContent);
            operator = button.textContent;
            clearDisplay();
        // Case when have multiple operators (1+1+)    
        } else if (leftOperand !== undefined && operator !== undefined && display.textContent !== "" && !haveMultipleOperators) {
            result = getResult();
            clearDisplay();
            display.textContent += result;
            haveMultipleOperators = true;
            leftOperand = result;
            operator = button.textContent
         // Case when operators pressed continuosly, uses last operator pressed (1+-)   
        } else if (leftOperand !== undefined && operator !== undefined && display.textContent === "") {
            operator = button.textContent;
        }
    })
});

const decimalKey = document.querySelectorAll("#decimal");
decimalKey.forEach(button => {
    button.addEventListener('click', () => {
        //Prevents having multiple decimal points
        if (!display.textContent.includes('.')) {
            // Displays 0 with . if no number before that
            if (display.textContent === "") {
                display.textContent += '0.';
            } else {
                display.textContent += button.textContent;
            }
        }
    })
});

const equalKey = document.querySelector("#equal");
equalKey.addEventListener('click', () => {
    // Case when there is a leftOperand and operator
    if (leftOperand != undefined && operator != undefined && display.textContent != "") {
        result = getResult();
        clearDisplay();
        display.textContent += result;
        resetValues();
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

//Keyboard Support
let clickEvent = new Event("click");

window.addEventListener('keydown', function(e) {
    let currentKey;

    switch (e.key) {
        case '0':
            currentKey = this.document.querySelector("#zero");
            break;
        case '1':
            currentKey = this.document.querySelector("#one");
            break;
        case '2':
            currentKey = this.document.querySelector("#two");
            break;
        case '3':
            currentKey = this.document.querySelector("#three");
            break;
        case '4':
            currentKey = this.document.querySelector("#four");
            break;
        case '5':
            currentKey = this.document.querySelector("#five");
            break;
        case '6':
            currentKey = this.document.querySelector("#six");
            break;
        case '7':
            currentKey = this.document.querySelector("#seven");
            break;
        case '8':
            currentKey = this.document.querySelector("#eight");
            break;
        case '9':
            currentKey = this.document.querySelector("#nine");
            break;
        case '+':
            currentKey = this.document.querySelector("#add");
            break;   
        case '-':
            currentKey = this.document.querySelector("#substract");
            break;
        case '*':
            currentKey = this.document.querySelector("#multiply");
            break;
        case '/':
            currentKey = this.document.querySelector("#divide");
            break;
        case '.':
            currentKey = this.document.querySelector("#decimal");
        case '=':
        case 'Enter':
            currentKey = this.document.querySelector("#equal");
            break;
        case 'Backspace':
            currentKey = this.document.querySelector("#delete");  
    }
    if (currentKey) {
        currentKey.dispatchEvent(clickEvent);
    }
});
