// Global variables
var storedNum, storedOp, currentNum;

// Query selectors go here
const numberClick = document.querySelectorAll(".number");
const clearClick = document.querySelector(".clear");
const operatorCLick = document.querySelectorAll(".operator");

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

// const operate = (a, b, op) => {

// 

// This function takes a value and adds it to the display
const populateDisplay = (a, type) => {
	var display = document.querySelector(".calculator-display");

	if (type == "num") {
		if(checkZero() == "zero state"){
			console.log("zero state")
			display.innerText = a;
			storeNum(display.innerText);
		} else {
			console.log( a + " this is a");
			display.innerText += a;
			storeNum(display.innerText);
		}
	} else if (type == "op") {
		display.innerText += a;
		storeOp(a);
	}
	
}

const checkState = () => {
	checkZero();
	
}

const checkZero = () => {
	var display = document.querySelector(".calculator-display");
	if (display.innerText == "0") {
		return "zero state";
}};

const checkOp = () => {
	var opList = [];
	var display = document.querySelector(".calculator-display");
	// check if operator present
	operatorArray.forEach(operator => {
		opList.push(operator.value);
	});
	if (opList.includes(storedOp)) {
		return "operator present";
	}	
}


// This function retains the selected user value in a variable
const storeNum = (num) =>{
 storedNum = parseInt(num);
}

const storeOp = (op) => {
	storedOp = op;
}

// This function clears the calculator display
const clearDisplay = () => {
	document.querySelector(".calculator-display").innerText = "0";
	storeNum(0);
	storeOp(0);
}



for(i = 0; i < numberArray.length; i++) {
	let value = numberArray[i].value; 
	
	numberArray[i].addEventListener("click", () => {
		console.log(value);
		populateDisplay(value, "num");
	})
};

operatorArray.forEach((operator) => {
	let value = operator.innerText;
	console.log(value);
	operator.addEventListener("click", () =>{
		populateDisplay(value, "op");
	})
});

clearClick.addEventListener("click", () => {
	clearDisplay();
})







