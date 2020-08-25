/**
 * 00-sample
 * Explain
 *
 * #Goal:
 * Know the `return` keyword that must exist in a function definition to be able to return a value.
 * The exceptions are the "arrow" functions - where this word is the "default" for a one-line function that computes to value (lambda).
 * However, the keyword `return` cannot exist outside the function definition (outside of our function code)
 * */

// Function can return any value that you want:
function giveMeAnyValue() {
	return Infinity; // 0 | undefined | NaN | true | () => {} | 'etc....'
}

// You must use the 'return` keyword inside the function to return a value.
// The returned value (or at least its beginning) must appear on the same line as the `return` keyword
function makeSomething() {
	return {
		some: 'Thing'
	}
}

makeSomething();

// Things outside of the "return" keyword are called "Unreachable code" will never be executed
function makeSomethingUnreachable() {
		return 'hello';

		const a = 10;
		const b = 20;
		console.log(10 + 20);
}
function makeSomethingUnreachable2() {
	return
	{
		iAm: 'Unreachable code 😥'
	}
}

makeSomethingUnreachable();
makeSomethingUnreachable2();

// What returns a function that returns nothing?
function makeSomeProcedure() {

	console.log('side effect...');
}

const value = makeSomeProcedure();
console.log(value);


// Is it possible to return 2 things in JS function?
// no .... but you can "get around" by returning values in the form of an array, eg. with 2 elements
function returnTwoThings() {
	return [9000, 1000]
}
const [number1, number2] = returnTwoThings();
console.log(number1, number2);

// Besides, destructuring the array, other iterable collections in JS can be destructed in that way too:
function returnStringThings() {
	return 'AB'
}

const [a, b] = returnStringThings();
console.log(a, b);

function returnTheSet() {
	return new Set([100, 200]);
}

const [setNum1, setNum2] = returnTheSet();
console.log(setNum1, setNum2);
