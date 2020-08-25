/**
 * d40-generators-iterators
 * Explain
 *
 * #Goal:
 * Getting to know iterable collections in JavaScript, the API for Iterator.
 * Learning about special functions - generators
 */


// Let's start with fact 1:
// The simplest iterable collection in JavaScript - is String, this is proved by the following notation:
for(const l of 'letters') {
	console.log(l);
}

// No less easy to get through the contents of the array:
for(const num of [100, 200, 300]) {
	console.log(num);
}

// It will be the same with - Set, Map etc.
for(const [key, value] of new Map([['id-1', 'HOT'], ['id-2', 'COFFEE'], ['id-1', 'OVERWRITTEN']])){
	console.log(key)
	console.log(value)
}

// We can also iterate over the so-called Generators, and we'll come to this simple fact in a moment.

// GENERATORS:
// Functions that can "stop" their execution and return a value.

function *generate4Numbers() {
	yield 100;
	yield 200;
	yield 300;
	yield 400;
}

// First, let's treat the generator as a standard function:
generate4Numbers() //=

// You can see that the returned value is an iterator, not - as we might expect - a value e.g. 100.
// To get more values, you need to refer to the API for the iterator
// Exactly extract it with `.next()`

// So let's see:
generate4Numbers().next() //=
generate4Numbers().next() //=
generate4Numbers().next() //=

// Ok, we get the value in the object format with the `done` flag and our desired `value`
// But something is wrong ... we get 1 value all the time and not the next ?!
// This is because each generate4Numbers() call creates a new iterator!
// In this case we have a new iterator pointer - and it starts iteration "from the beginning"
// To get the numbers one by one - we have to use the same reference:

const iterator = generate4Numbers();
iterator.next() //=
iterator.next() //=
iterator.next() //=
iterator.next() //=
iterator.next() //=
iterator.next() //=

// Cool, now works as it should. At the end - as there is no yield anymore - we get
// {value: undefined, done: true}
// which simply means - iterator is finished, no more value

// This simple example shows us how an iterator works.
// It lets you walk through the collection in one direction, one by one through the items
// Cannot be undone or restarted and iterated over again.
// to do the "iteration from the beginning" - we need to call `generate4Numbers()` again;

// However, since Generator - returns an iterator, it can be treated as
// Iterable collection !!!:
for(const num of generate4Numbers()) {
	console.log(num)
}

// The way that `next()` works with an iterator causes some benefits
// We can get the same traversal INTERFACE from any iterable collection:
const myTracks = new Set(['track1', 'track2', 'track3'])

const setIterator = myTracks.values();
setIterator.next() //=
setIterator.next() //=
setIterator.next() //=
setIterator.next() //=

// We can get the same thing from any collection that implements the iterator interface!
// we just have to use the appropriate symbol:

const myString = 'Hi! 🤩';

// Note the notation below.
// In JavaScript meta-programming, Symbol.iterator - allows you to refer to a method,
// which will return an iterator - if only the given object has it.
// Similarly, we ourselves can define these types of collections!
const stringIterator = myString[Symbol.iterator]();

stringIterator.next() //=
stringIterator.next() //=
stringIterator.next() //=
stringIterator.next() //=
stringIterator.next() //=
stringIterator.next() //=

// Back to the generators:
// After using the .next() method we can communicate with them !!!
function *coffeeMachine() {
	const coffeeAmount = yield 'Enter the amount of coffee in the machine';
	const numberOfCups = yield 'How many cups should I make?';
	const maxCups = Math.floor(coffeeAmount / 20); // 20g for a cup
	const coffeeMade = Math.min(maxCups, numberOfCups);
	if(coffeeMade < 1) {
		return 'well.... a day without a coffee?'
	}
	return `Here your are, it is your ${coffeeMade} ${ coffeeMade > 1 ? 'cups' : 'cup'} of coffee!`;
}

const iter = coffeeMachine();

console.log(iter.next().value)
const amount = 222;
console.log(iter.next(amount).value)
const cups = 3;
console.log(iter.next(cups).value)

// Thanks to the iteration process - we can automate it:
const goForCoffee = coffeeMachine();
for(const x of [0, 300, 30]) {
	console.log(goForCoffee.next(x).value)
}

// Going one step further and using closure, it looks even better:
function iNeedCoffee(amountOfCoffeeBeans = 100) {
	const goForCoffee = coffeeMachine();
	return (numberOfCups) => [0, amountOfCoffeeBeans, numberOfCups].forEach((amount) => {
		console.log(goForCoffee.next(amount).value)
	})
}

iNeedCoffee(1)(1)
iNeedCoffee(200)(15)
iNeedCoffee(2000)(15)


// And another example from the world of generators:
// Their ability to stop executions with the `yield` word means that we can create a custom logic
// e.g. with an infinite loop:

function *endlessGenerator() {
	for(let x = 0;;x++) {
		yield x;
	}
}

const numIterator = endlessGenerator();
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=
numIterator.next() //=

// ...(), ...(), ...()





// Going back to `Symbol.iterator`, we can use it for example:
const myUser = {
	name: 'Roy',
	fruits: ['apples', 'mangoes', 'cherries']
}
// By default, JS doesn't know how to iterate over something "non-iterable" like an object:
// for(const sth of myUser) {
// 	console.log(sth)
// }

// But with help and implementation `Symbol.iterator` + generator:
const myIterableUser = {
	name: 'Roy',
	fruits: ['apples', 'mangoes', 'cherries'],
	// We can decide what happens after the object will be iterated with the loop:
	*[Symbol.iterator]() {
		 for(const fruit of this.fruits) {
		 	  yield fruit;
		 }
	}
}

for(const sth of myIterableUser) {
	console.log(sth)
}
