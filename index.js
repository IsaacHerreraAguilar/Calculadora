// Obtención del input de la calculadora

let displayInput = document.getElementById("number-input");

// Variables para guardar operandos y operador

let firstOp = null;
let secondOp = null;
let operand = null;

// Variable para saber si la ultima operación fue un simbolo '='

let solved = false;

// Función para resetear el display de la calculadora y poner los operandos vacíos

function resetCalculator(){
    displayInput.value = '0';
    firstOp = null;
    secondOp = null;
}

// Obtención de los diferentes botones

let numButtons = document.getElementsByClassName("number-button");
let funcButtons = document.getElementsByClassName("func-button");
let acButton = document.getElementById("ac-button");
let resultButton = document.getElementById("result-button");

// Adición de listeners a los botones de número

for(let i=0; i<numButtons.length; i++){
    numButtons[i].addEventListener('click', () => displayNumber(numButtons[i].value));
}

// Adición de listeners a los botones de operadores

for(let i=0; i<funcButtons.length; i++){
    funcButtons[i].addEventListener('click', () => displaySymbol(funcButtons[i].value));
}

// Adición de listeners a botones 'AC' y '='

acButton.addEventListener('click', () => resetCalculator());
resultButton.addEventListener('click', () => giveResult());

// Función para ir mostrando en pantalla los números a calcular

function displayNumber(number){
    if(solved){
        solved = false;
        displayInput.value = '0';
    }
    if(displayInput.value == '0'){
        if(number == '0'){
            return;
        }
        displayInput.value = number;
    } else if(displayInput.value.split(' ').length == 1 
    && displayInput.value.includes('.') && number == '.'){
        return;
    } else if(displayInput.value.split(' ').length == 3 
    && displayInput.value.split('.').length == 3 && number == '.') {
        return;
    } else {
        displayInput.value += number;
    }
}

// Función para mostrar en pantalla el símbolo de la operación correspondiente

function displaySymbol(symbol){
    if(displayInput.value == '0'){
        return;
    }

    if(displayInput.value.split(' ').length == 3){
        let lastIndex = displayInput.value.lastIndexOf(' ');
        secondNumber = displayInput.value.substring(lastIndex);
        secondOp = parseFloat(secondNumber);

        operate();

        displayInput.value += ' ' + symbol + ' ';
        solved = false;

        return;
    }

    firstOp = parseFloat(displayInput.value);
    displayInput.value += ' ' + symbol + ' ';
    solved = false;
    operand = symbol;
}

// Función para realizar la operación de los dos operandos

function operate(){
    let result;
    switch(operand){
        case '+':
            result = firstOp + secondOp;
            break;
        case '-':
            result = firstOp - secondOp;
            break;
        case 'x':
            result = firstOp * secondOp;
            break;
        case '/':
            result = firstOp / secondOp;
            break;
    }

    firstOp = result;
    secondOp = null;

    displayInput.value = result;
}

// Función para desplegar resultado al presionar el botón '='

function giveResult(){

    if(firstOp != null && displayInput.value.split(' ').length == 3 
    && !displayInput.value.slice(-1).includes(' ') 
    && !displayInput.value.slice(-1).includes('.')){

        let lastIndex = displayInput.value.lastIndexOf(' ');
        secondNumber = displayInput.value.substring(lastIndex);
        secondOp = parseFloat(secondNumber);

        if(secondOp != null){
            operate();
        }

        firstOp = parseFloat(displayInput.value);
        solved = true;
    }
}