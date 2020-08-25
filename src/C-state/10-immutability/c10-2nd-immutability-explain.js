import { assertThat } from '../../j4b1-assert'
/**
 * c10-immutability
 * Explain
 *
 * #Goal:
 * Non-muting of input data or existing data in memory - turns out to be crucial in some point for growing application.
 *
 * This applies e.g. to the state where, for example, after filtering the data list, we do not want to leave them in this filtered form afterwards.
 * Also when writing functions and methods in the application - we do not want to change the input data (arguments), so that our code behaves predictably.
 */

// Not muting data - it's a concept.
// It works eg when maintaining the state of the application - the only question is: why?

// Let's start from the beginning 😀

// First, let's explain under what circumstances mutating data is wrong:

// Example 1:
// Function that adds an exclamation mark to each sentence:
function addBang(sentence) {
	return sentence + '!';
}

const mySentence = 'Hello World';
const otherSentence = addBang(mySentence);

assertThat(
	'otherSentence should have exclamation sign on the end',
	expect => expect(otherSentence).toBe('Hello World!')
); //=
assertThat(
	'mySentence should stay intact',
	expect => expect(mySentence).toBe('Hello World')
); //=
assertThat(
	'both sentences should not be the same',
	expect => expect(mySentence).notToBe(otherSentence)
); //=

// No Mutation Here ?!
// Exactly, it's because you can't "mutate" primitive types
// They are passed by values

// Example 1 - the right one
// We talk about muting at the moment when we pass data by the so-called reference
// Remember the information contained in ../B-objectivity/b40-cloning-example.js
// By slightly changing the example - we can already notice the mutation:

function addBangToWord(objectWithWord) {
	objectWithWord.word += '!';
	return objectWithWord;
}

const myObject = { word: 'Hello' };
// now call:
const myOtherObject = addBangToWord(myObject);

// Check if they show the same memory location:
console.log(myObject === myOtherObject);
// Check out if we have a mutation:
console.log(myObject);
console.log(myOtherObject);

// Unfortunately the `myObject` and` myOtherObject` objects are the same memory location.
// This is because inside our `addBangToWord` function
// We read the field from the object reference and added data to it.

// Note that our addBangToWord function behaves "nondeterministic" in this context.
// We may not really want an argument to be modified after passing it to the function.
// The function better return new object with word and exclamation mark

// We improve the implementation:

function nonMutatingAddBangToWord(objectWithWord) {
	return {
		...objectWithWord,
		word: objectWithWord.word + '!'
	};
}

const myObject2 = { word: 'Hello' };
// now call:
const myOtherObject2 = nonMutatingAddBangToWord(myObject2);

// Check if they show the same memory location:
console.log(myObject2 === myOtherObject2);
// Check out if we have a mutation:
console.log(myObject2);
console.log(myOtherObject2);


// Everything is predictable now.
// We do not mutate the provided data.


// So here - our #1 motivation for "not mutating" data.


// But what's the deal with the state of the data?
// Here we have to imagine the data state as an object - a tree, e.g.:

const myCoffeeState = {
	coffeeBeans: ['Arabica', 'Robusta'],
	coffeeMachine: {
		water: 200,
		coffee: 300,
		status: 'AWAITING',
		groundContainer: {
			status: 'EMPTY'
		}
	},
}

// Remember the problem from the task: ./b40-3rd-cloning-challenge.js

// In the application, we want to modify the state of data, change it.
// But if we do this directly on an object, how do we know if anything has changed?

// In other words - what if we needed information - what has changed?
// It seems simple - after all, we can add a proper mechanism to observe changes.
// But in the long run with a more complicated state tree - it will turn out that we need to check branch by branch
// what changed...

// It will be very expensive. Could it be easier to define what has changed?

// Yes, it can be done with: !==
// It is enough - that we replace objects nested in the state with new ones instead of mutations.

// So here arises - our #2 motivation to "not mutate" data.
// If we want to know what has changed in the data tree.

// Consider the mutating groundContainer state change to status: FULL

// MANUAL, STATE CHANGE (here we can imagine some action):
const changedState = myCoffeeState;
const previousGroundContainer = myCoffeeState.coffeeMachine.groundContainer;
changedState.coffeeMachine.groundContainer.status = 'FULL';
const activeGroundContainer = changedState.coffeeMachine.groundContainer;
console.log(activeGroundContainer.status)

// Programming we don't know about the change:
console.log(
	previousGroundContainer !== activeGroundContainer
)

// Now we know what has changed if we can see it from this side.

// But the component presenting the groundContainer data in the view will not refresh.
// We can solve it - costly:
// a) refreshing all components - everyone will get information that it is supposed to re-render!
// b) checking manually field by field what has changed in the state tree ..

// Both of these solutions will be expensive.
// a) - inefficient recalculation and redrawing of applications
// b) - as long as the state tree is small - no problem, but if it develops (larger applications),
// compare each value in every field by field - will get us out of breath

// Now consider the same state transition without mutating the slice of the state:
const changedStateAgain = myCoffeeState;
const previousGroundContainer2 = myCoffeeState.coffeeMachine.groundContainer;
changedStateAgain.coffeeMachine.groundContainer = {...previousGroundContainer2, status: 'ALMOST_FULL'};
const activeGroundContainer2 = changedStateAgain.coffeeMachine.groundContainer;
console.log(activeGroundContainer2.status)

// Programmatically (WOW) We know what has changed:
console.log(
	previousGroundContainer2 !== activeGroundContainer2
)

// Thanks to this, we can save state change actions and state slices,
// Do time travel debugging
// And save "logs" of our events
// Finally, it allows us to "rebuild" the state of the application.
