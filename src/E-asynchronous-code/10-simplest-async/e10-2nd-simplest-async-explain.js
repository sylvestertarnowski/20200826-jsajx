/**
 * e10-simplest-async
 * Explain
 *
 * #Goal:
 * Getting to know the callback.
 * The function accepts a function - and decides with what arguments and when the passed function will be called.
 */

// The easiest way to get async is with a function.
//
// We just need to enclose a piece of code in its definition.
// Nothing has been done yet:

function greetings() {
	console.log('Welcome on board!')
}

// now, a function definition can be passed to another function call.
// or can be "reached" from the so-called outer scope.

// Let's Consider Case 1)
// Using the outer scope:

function makeSomethingWhenYouRReady() {
	//can be setTimeout or so...
	//... wait
	//... not yet
	//... ok - NOW!
	greetings();
}

// The code is ready, it's time to call it:
makeSomethingWhenYouRReady();

// What are our problems here:
// 0. So far this is of course a simulation - so the fact that `greetings()` starts asynchronously - you have to imagine
// 1. All this construction is "hardcoded"
// and here's all the pain ...
// Lots of things can fall apart here:
// - the greetings function will rename
// - the greetings function will change the scope or another variable name will hide greetings
// - finally: we can't change the code call from makeSomethingWhenYouRReady, greetings will always be called there



// Let's Consider Case 2)
// pass to another function call
// otherwise known as: "Callback"

function iWIllGiveYouSomethingToMakeWhenYouRReady(something) {
	//can be setTimeout or so...
	//... wait
	//... not yet
	//... ok - NOW!
	something();
}

// The code is ready, it's time to call it:
iWIllGiveYouSomethingToMakeWhenYouRReady(() => {
	console.log('hello')
});

// In this case we solve all the problems - the cons of the previous solution.
// We pass a function to be executed (`something`)
// Additionally - we can communicate and "pass" from inside `iWIllGiveYouSomethingToMakeWhenYouRReady`
// to function `something` parameters - arguments from inside the function` iWIllGiveYouSomethingToMakeWhenYouRReady`

// The equivalent of this example would be to register an eventHandler for a "click" event on a button in the DOM.
