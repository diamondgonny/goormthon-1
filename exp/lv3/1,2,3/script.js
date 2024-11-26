// 1
function calculate(expression) {
    const parts = expression.trim().split(" ");
    if (parts.length !== 3) {
        console.log("올바른 형식으로 입력하세요. (예: \"1 + 2\")");
        return;
    }

    let result;
    const num1 = parseFloat(parts[0]);
    const operator = parts[1]
    const num2 = parseFloat(parts[2]);
    if (isNaN(num1) || isNaN(num2)) {
        console.log("올바른 숫자를 입력하세요.");
        return;
    }

    switch(operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 !== 0) {
                result = num1 / num2;
                console.log(`몫   : ${parseInt(result)}`)
                console.log(`나머지: ${num1 % num2}`)
            } else {
                console.log("0으로 나눌 수 없습니다.")
                return;
            }
            break;
        default:
            console.log("올바른 수식을 입력하세요.");
            return;
    }

    console.log(`${num1} ${operator} ${num2} = ${result}`);
    return result
}

// 2
function arrExercise() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr.push(11);
    console.log(arr);
    arr.pop(11);
    console.log(arr);
    arr.unshift(0);
    console.log(arr);
    arr.shift(0);
    console.log(arr);
    arr.splice(2, 3);
    console.log(arr);
    arr.splice(2, 2, "a", "b");
    console.log(arr);
    arr.forEach(function(num) {
        console.log(num);
    });

    let slicedArr = arr.slice(0, 3);
    console.log("slicedArr: ", slicedArr);
    let concatArr = arr.concat(slicedArr);
    console.log("concatArr: ", concatArr);
    let isNumber = function(num) {
        return typeof num === "number" && !isNaN(num);
    }
    console.log(arr.every(isNumber));
    console.log(arr.some(isNumber));
}

function strExercise() {
    let str = "Hello World";
    console.log(str.length);
    console.log(str.slice(0, 5));
    console.log(str.slice(6));
    console.log(str.slice(-5));
    console.log(str.substring(0, 5));
    console.log(str.substring(-5));

    let spacedStr = "   Hello World   ";
    console.log(spacedStr.trim());
    console.log(spacedStr.trimStart());
    console.log(spacedStr.trimEnd());
    console.log(str.toUpperCase());
    console.log(str.toLowerCase());
}

// 3
function ifForExercise() {
    let arr = [];
    for(let i = 1; i <= 50; i++) {
        arr.push(i);
    }

    let isEven = function(num) {
        return num % 2 === 0;
    };
    console.log("isEven: ", arr.filter(isEven));
    console.log("multiplesOfFive: ", arr.filter(x => x % 5 === 0));

    let primeArr = [];
    let isPrime = function(num) {
        if (num <= 1) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        const sqrt = Math.sqrt(num);
        for (let i = 3; i <= sqrt; i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    };
    for (let num of arr) {
        if (isPrime(num)) {
            primeArr.push(num);
        }
    }
    console.log("isPrimeNumber: ", primeArr);
}
