// Global variables 
// firstNum is initial num entry, secondNum is the entry after operator selection
// storedOp is the display text value, opAction is the value per HTML
var firstNum, storedOp, opAction, secondNum;

// Query selectors go here
const numberClick = document.querySelectorAll(".number");
const clearClick = document.querySelector(".clear");
const operatorCLick = document.querySelectorAll(".operator");
const display = document.querySelector(".calculator-display");
const equalsClick = document.querySelector(".equals");

let numberArray = Array.from(numberClick);
let operatorArray = Array.from(operatorCLick);

// Functions for basic math operations
const add = (a,b) => {
	return a + b;
}

const subtract = (a,b) => {
	return a - b;
}

const multiply = (a,b) => {
	return a * b;
}

const divide = (a,b) => {
	return a / b;
}

const squareRoot = (a) => {
	return math.squareRoot(a);
}

const operate = (a, b, op) => {
	console.log("a,b & op and types: " + a,b,op, typeof(a), typeof(b), typeof(op));
	var result;
	switch (op) {
		case "add":
			result = add(a,b);
			setDisplayText(result);
			clearValues(result);	
			break;
		case "subtract":
			result = subtract(a,b);
			setDisplayText(result);
			clearValues(result);
			break;
		case "multiply":
			result = multiply(a,b);
			setDisplayText(result);
			clearValues(result);
			break;
		case "divide":
			if (b == 0) {
				setDisplayText("Ah ah, we don't divide by zero here...")
				clearValues(null);
				console.log("trigger check");
				console.log("a,b & op and types: " + a,b,op, typeof(a), typeof(b), typeof(op));
			} else if (b != 0) {
				result = divide(a,b);
				setDisplayText(result);
				clearValues(result);
				console.log("no trigger");
			}
			break;
	}
}

// This function takes a value and adds it to the display
const populateDisplay = (a, type, opValue = null) => {

	if (type == "num") {
		console.log(checkZero());
		if(checkZero()){
			zeroState(a);
		} else {
			//check if op present storeNum if it is, if not store as secondNum
				if (checkOp()) {
					console.log( a + " is a second number");
					addDisplayText(a);
					// let splitDisplay = display.innerText.split(storedOp);
					storeScndNum(a);
				} else {
					console.log( a + " is a first number");
					addDisplayText(a);
					storeNum(a);
				}
		}
	} else if (type == "op") {
		console.log(checkOp());
		if(checkScndNum()){
			operate(firstNum, secondNum, opAction);
		} else {
			// if operator present - ovveride it, otherwise simply add 
			if(checkOp()){
				display.innerText = display.innerText.slice(0, -1);
				display.innerText += a;
				storeOp(a, opValue);
			} else if (checkOp() == false) {
				display.innerText += a;
				storeOp(a, opValue);
			}
		}
	}
	
}

const setDisplayText = (value) => {
	display.innerText = value;
}

const addDisplayText = (value) => {
	display.innerText += value;
}

const checkState = () => {
	var check;
	if (checkOp()) {
		check = checkOp();
	} return check;
}

const checkZero = () => {
	if (display.innerText == "0") {
		return "zero state";
	} else {
		return false;
	}
};

// This is a subfunction of populating the display for the zero state
const zeroState = (a) => {
	setDisplayText(a);
	storeNum(display.innerText);
	console.log( a + " is a first number");
};

const checkOp = () => {
	var opList = [];
	// check if operator present
	operatorArray.forEach(operator => {
		opList.push(operator.innerText);
	});
	if (opList.includes(storedOp)) {
		return "operator present";
	} else {
		return false;
	}
}

const checkNum = () => {
	if (firstNum){
		return "number stored";
	} else {
		return false;
	}
}

const checkScndNum = () => {
	if (secondNum){
		return "number stored";
	} else {
		return false;
	}
}


// This function saves the selected user value in a variable
const storeScndNum = (num) => {
	if(secondNum){
		secondNum += "" + num;
		console.log("This is the secondNum: " + secondNum);
		secondNum = parseInt(secondNum);
	} else if (num == null) {
		secondNum = null;
	}  else {
 		secondNum = parseInt(num);
}};

const storeNum = (num) =>{
	if(firstNum){
		firstNum += "" + num;
		console.log("This is the firstNum: " + firstNum);
		firstNum = parseInt(firstNum);
	} else if (num == null) {
		firstNum == null;
	} else {
 		firstNum = parseInt(num);
	}
}


const storeOp = (opText, opValue) => {
	storedOp = opText;
	opAction = opValue;
}

// This function clears the calculator display
const clearDisplay = () => {
	document.querySelector(".calculator-display").innerText = "0";
	storeNum(null);
	storeOp(null, null);
	storeScndNum(null);
}

// This function clears the stored values and makes previos result the new firstNum
const clearValues = (result) => {
	firstNum = result;
	storeOp(null, null);
	secondNum = null;
}



for(i = 0; i < numberArray.length; i++) {
	let value = numberArray[i].value; 
	
	numberArray[i].addEventListener("click", () => {
		console.log(value);
		populateDisplay(value, "num");
	})
};

operatorArray.forEach((operator) => {
	let textValue = operator.innerText;
	operator.addEventListener("click", () =>{
		populateDisplay(textValue, "op", operator.value);
	})
});

// This defines functionality of the clear button
clearClick.addEventListener("click", () => {
	clearDisplay();
	clearValues();
})

// This defines functionality of the equals button
equalsClick.addEventListener("click", () => {
	operate(firstNum, secondNum, opAction);
})






