/**
 * g10-using-symbols
 * Explain
 *
 * #Goal:
 * Learning about a new primitive type - Symbol - present in JS since 2015 (ES6).
 */


// The symbol is a specific primitive type, where each call gives us a completely new unique value:

const mySymbol = Symbol();

// Each call is unique:
console.log(mySymbol);
console.log(mySymbol === Symbol())
console.log(Symbol() === Symbol())

// Symbol cannot be instantiated:
// cannot be invoked with the `new` keyword!
try {
	new Symbol();
} catch ( e ) {
	console.error(e);
}

// So the call to Symbol () - is a global "factory function" for symbols.

// When calling a new symbol you can give string value as its "description"
// however this is only for "debugging" purposes

const mySuperSymbol = Symbol('hello world')
console.log(mySuperSymbol)

// description has absolutely no influence on the symbol behavior:
console.log(Symbol('ok') === Symbol('ok'))


// The symbol can be used to obtain a pseudo-private property in an object:
// It will be visible on the outside - and there is a way to get to it,
// However, it is not obvious - and probably no one will touch our property

// In our scope, we would make a constant "salary" under which we hide the symbol
const salary = Symbol();
const myUser = {
	name: 'Roy',
	// the symbol from `salary` will be used to make an object property:
	[salary]: 3000
}
// in private scope:
console.log(myUser[salary])

// MEANWHILE, OUTSIDE:

// So, doing console.log - I can see that something is there, some `Symbol()`
console.log(myUser)

// This is not how I can get into it - because each call to `Symbol()` - is a new symbol value
console.log(myUser[Symbol()])

// Check if it lives in the object's keys - and if it is OwnProperty ...
Object.keys(myUser) //=
Object.getOwnPropertyNames(myUser) //=


// We can get without having a constant `salary`, by inspecting fields - symbols for the object:
Object.getOwnPropertySymbols(myUser) //=
const [hack] = Object.getOwnPropertySymbols(myUser);
console.log(myUser[hack]);
// GOT IT!


// Symbols help in the so-called meta programming:
// For example, we can define a method responsible for the possibility of iterating an object:

const myNonIterableObject = {}

// Normally this is impossible:
try {
	for(let x of myNonIterableObject) {
		 console.log(x)
	}
} catch (e) {
	console.error(e)
}

// But with the help of a constant field - Symbol:
// `Symbol.iterator`
const myIterableObject = {
	name: 'Mike',
	*[Symbol.iterator]() {
		yield '😊';
		yield '😀';
		yield '😁';
		// yield this;
	}
}
for(let smile of myIterableObject) {
	console.log(smile)
}
