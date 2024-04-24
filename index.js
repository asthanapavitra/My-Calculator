var button =document.querySelectorAll(".btn1")
for(var i=0;i<button.length;i++){
    button[i].addEventListener("click", function(){
        var num=this.innerHTML;
        if(this.classList.contains("num")){
            writeDisplay(num);
        }
        else{
            switch(num){
                case "DEL":
                    var str= document.querySelector("#display").innerHTML;
                    document.querySelector("#display").innerHTML= str.slice(0,str.length-1);
                    break;
                case "AC":
                    document.querySelector("#display").innerHTML= "";
                    break;
                case "=":
                   var expression=document.querySelector("#display").innerHTML;
                   var postFix=convertToPostfix(expression);
                   var result=solve(postFix);
                   document.querySelector("#display").innerHTML= result.toString();
            }
        }
    })
}

function writeDisplay(num){
    
    
    var str= document.querySelector("#display").innerHTML;
    
    document.querySelector("#display").innerHTML= str + num;

}

function isDigit(char) {
    return /\d/.test(char)||char==='.';
}

function precedence(operator) {
    switch (operator) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}

function convertToPostfix(infixExpression) {
    let output = '';
    let stack = [];

    for (let i = 0; i < infixExpression.length; i++) {
        let token = infixExpression[i];

        if (isDigit(token)) {
            let number = '';
            while (i < infixExpression.length && isDigit(infixExpression[i])) {
                number += infixExpression[i++];
            }
            output += number + ' '; // Append operand to output with a space separator
            i--; // Move the index back by 1 to account for the extra increment in the loop
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output += stack.pop() + ' ';
            }
            stack.pop(); // Remove '(' from the stack
        } else { // Operator
            while (stack.length > 0 && precedence(stack[stack.length - 1]) >= precedence(token)) {
                output += stack.pop() + ' ';
            }
            stack.push(token);
        }
    }

    while (stack.length > 0) {
        output += stack.pop() + ' ';
    }

    return output.trim(); // Remove any trailing whitespace
}
function solve(postfixExpression) {
    let stack = [];
    let operand = '';

    for (let i = 0; i < postfixExpression.length; i++) {
        let char = postfixExpression[i];

        if (!isNaN(parseInt(char))|| char === '.') {
            operand += char; // Accumulate digits to form operand
        } else if (operand !== '') {
            stack.push(parseFloat(operand)); // Push operand to stack
            operand = ''; // Reset operand
        }
        
        if (char === '+' || char === '-' || char === '*' || char === '/') {
            let b = stack.pop();
            let a = stack.pop();
            let result;
            switch (char) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = a / b;
                    break;
            }
            stack.push(result);
        }
    }

    if (stack.length !== 1) {
        throw new Error("Invalid postfix expression");
    }

    return stack.pop();
}
