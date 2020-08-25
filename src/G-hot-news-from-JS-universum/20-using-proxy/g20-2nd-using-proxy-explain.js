/**
 * g20-using-proxy
 * Explain
 *
 * #Goal:
 * Getting to know the functionality of Proxy - a wrapper for the base object (target),
 * allowing you to manipulate it and decide on its further way of work.
 */

// Base object:
const person = {
	name: 'Michał'
}

// It can be extended e.g. with additional fields dynamically:
person.lastName = 'Kowalsky'

console.log(person);

// So far no revelation ....
// But what if we package it in a Wrapper - allowing us to totally control what happens to the object?

// For example, every time you request a property in an object - I will return the value "TROLL" 😁.

const myTroll = new Proxy(person, {
	get ( target, propertyKey ) {
		// console.log(propertyKey)
		// console.log(target[propertyKey])
		return 'TROLL'
	}
})

console.log(myTroll.name)
console.log(myTroll.lastName)
console.log(myTroll.any)
console.log(myTroll.nonExsitent)
console.log(JSON.stringify(myTroll));

// This is because the person gets wrapped in a Proxy object,
// This object has 2 parameters:
// - target -> here we pass the object we want to wrap
// - handler -> is a special object that has a so-called TRAPS - these are methods that allow you to control an object

// Documentation:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#Syntax

// Possible TRAPS to set up:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#Handler_functions

// Let's examine what happens to the object above.
// The assumed trap "get" will be triggered for each "property" on the object - which we are getting for.

// Yes, it's like the principle of how "getter" works - but note that the getter is defined for a particular property
// here I will get ANY FIELD - that the developer wants to read from the object - even those that don't exist

// That allows us to decide what to return.
// In `traps` we always have a` target` available - that is the object that was originally wrapped.
// We can return the original value or the modified value then.


// The important thing is that just "setting up" a trap - without even giving logic - has a side effect:
const someOtherSample = {
	hello: 'WORLD',
	say: 'Hello !'
}

const sideEffects = new Proxy(someOtherSample, {
	get ( target, propertyKey ) {
		console.log(propertyKey)
		// note that the trap works, but we don't return any value
		// that's why the object properties have to give us "undefined"
	}
})

console.log(someOtherSample.say)
console.log(someOtherSample.hello)

console.log(sideEffects.say)
console.log(sideEffects.hello)

// Let's see other traps, for example delete:

const myProject = new Proxy({}, {
	deleteProperty(target, propertyKey) {
		if (propertyKey in target){
			// really delete:
			delete target[propertyKey]
			console.log('deleting...:',propertyKey)
			return true
		}
		console.log('not found:', propertyKey)
		return false
	}
})

myProject.name = 'testing by';
myProject.startDate = new Date();

console.log(myProject);

delete myProject.startDate;

console.log(myProject);

delete myProject.startDate;

