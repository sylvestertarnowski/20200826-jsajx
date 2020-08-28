// "use strict";
/**
 * f10-2nd-memory-explain
 * Explain
 *
 * #Goal:
 * Summary of all dependencies related to memory allocation and how it works in JS
 */

// A high-level language - such as JavaScript - automates the memory management process.
// This is due to some mechanisms:

// 1. Automatic memory allocation - the one you need
// .....
// 2. program operation, memory use, writing, reading etc.
// ......
// 3. Free unnecessary memory with Garbage Collector

// Here are examples of how memory is allocated for particular data types in JS:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Allocation_in_JavaScript


// We know that JS memory is allocated dynamically, even for arrays - we don't have to declare their size,
// the number of elements contained in it - may change over time.

// let's see the references in JS to explain how Garbage Collector works:

// 1. Declare a variable and assign it a new object:
let person = { name: 'Jen' };

// What is happening here is:
// a) Memory has been allocated space for {name: 'Jen'}
// b) the reference `person` leads us to the object {name: 'Jen'}

// 2. We add a new reference to the object:
let personLinker = person;

// What happened:
// a) `person` leads us to the memory location with the object: {name: 'Jen'}
// b) `personLinker` also leads us to the same object in memory: {name: 'Jen'}
console.log(person)
console.log(personLinker)

// Confirmation of this dependency is e.g. object change - adding a field:
personLinker.lastName = 'Barber'

console.log(person)
console.log(personLinker)

// 3.
// Now, we can change the object that person points to:
person = { name: 'Moss' }

// What happened:
// a) `person` leads us to the newly declared memory location with the object: {name: 'Moss'}
// b) `personLinker` continues to the same object in memory: {name: 'Jen', lastName: 'Barber'}
console.log(person)
console.log(personLinker)

// 4.
// We change the place where personLinker shows:
personLinker = person;

// What happened:
// a) `person` continues to this" new "object in memory: {name: 'Moss'}
// b) `personLinker` takes us to the same place as` person`!
console.log(person)
console.log(personLinker)

// 5.
// This means that nothing leads to the place {name: 'Jen', lastName: 'Barber'}
// This object in this case (because it has no references) - will be marked as collectible or "garbage"

// Automatic Mechanism - Garbage Collector will clear this object from memory
// because we don't know how to use it - it is no longer needed, nothing leads to it


// A more complex example where we have an object inside another object:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#Reference-counting_garbage_collection


// what are: MEMORY LEAKS?

// A memory leak is an area of memory that we no longer need from the point of view of our application
// However, it was not freed (put into the free memory pool)

// How to cause such a memory leak in practice:

// 1)
// Imagine any component rendered on the page.
function myDummyComponent() {

	let second = 0;
	let fireRerender = () => { };
	const inter = setInterval(() => {
		second++;
		fireRerender()
	}, 1000)

	return {
		onRerender(callback) {
			fireRerender = callback
		},
		onDestroy() {
			clearInterval(inter)
		},
		render() {
			return `
				<h1>Hello World</h1>
				<main>
				   <div> ${second} </div>
				</main>
			`
		}
	}
}

// Uncomment the code below to see this implementation
const myComponent = myDummyComponent();

myComponent.onRerender(() => {
	console.log(myComponent.render())
	myComponent.onDestroy();
})

// What are our problems here?

// Imagine we don't need this component anymore, for example -
// We go to another page.
// Unfortunately, all the rerender functionality will be performed all the time,
// because we're not releasing `setInterval` anywhere
// It runs around in memory all the time whether we need a component or not.
// Garbage collector - has nothing "to say" here because fireRerender still references the callback,
// which is executed in `setInterval` - and that is just one of the reasons!

// Summarizing:
// This is why frameworks - deal with this issue by using the so-called
// lifecycle methods
// This is (`destroy()`, `unmount()`, etc ...) - we will place release logic, timers, iterations
// whatever will cause a memory leak if not released (`clearTimeout`, `clearInterval`)


// 2)
// We can have a pointer to the DOM element, made after by:
// let $element = document.querySelector('#someID');

// then the '#someID' element can be removed from the DOM tree, but if we do have a pointer to that element
// ($element) - in this case Garbage Collector - cannot remove this object from memory
// Whereas with point view of the application - it is no longer on the DOM, it is not needed...

// 3)
// Global values
// If we write such a code and we are not in "use strict";

function hello() {
	python_like = 'Hello World'
}
hello()
console.log(global.python_like);

// The python_like variable - will be written to the global object, we will probably never need it,
// or otherwise - our intention would be that it would be a local variable and it would be picked up by GC as soon as
// our hello function will be executed
// this will not happen python_like - it will be written to the global space (it will be available at: globalThis.python_like)

// The problem here is not adding the `let` or` const` keywords
// However, let's recall a relationship with the keyword `this`:

function trickyHello() {
	console.log(this);
	this.greetings = 'Hello Mike !'
}

// what happens if we run this function "just like that" and not on a specific object?
// uncomment the line below
const tricky = new trickyHello();

// see the effect:
console.log(tricky.greetings)

// That's why you need to be aware of this - because trickyHello is valid for JS.
// The problem will be the execution context!
// You have to watch it.

// Fortunately, in this case add "use strict" to the beginning of this script; - takes care of the matter, for both!
