/**
 * b30-based-on-prototype
 * Explain
 *
 * #Goal:
 * showing and explaining how the prototypes works in JS
 */

// At this point, we know that:
// Each class (i.e. in JS - function) can have its own static fields, for example:
function MyDepartment(placement) {
	this.placement = placement;
	this.showYourself = function () {
		// Here `this` will refer to the instance of the MyDepartment object
		return this;
	}
}
MyDepartment.showStatic = function() {
	// The static method cannot access the instance !!
	// `this` can be used here, but is the same as using:
	// return MyDepartment;
	// so `this` - it's actually a MyDepartment function indication here!
	return this;
}
MyDepartment.otherStaticField = 'hello';

const it = new MyDepartment('Last Floor IT');

console.log(it.showYourself())
console.log(it.showStatic)
console.log(MyDepartment.showStatic())
console.log(MyDepartment.otherStaticField)

// The same can be written in a more modern way:
class Department {
    
    static otherStaticField = 'hello';
    
	constructor (placement) {
		this.placement = placement
	}
	showYourself() {
		return this;
	}
	static showStatic() {
		return this;
	}
}
// Department.otherStaticField = 'hello';

const newIt = new Department('Last Floor IT');

console.log(newIt.showYourself())
console.log(newIt.showStatic)
console.log(Department.showStatic())
console.log(Department.otherStaticField)


// We also know other static properties with functions - so the code above shouldn't surprise us ...
// For example, you can use something like this when constructing objects:
const otherIT = new Department('Top floor');
console.log(otherIT.showYourself())
const hijacker = {secret: 'room'}
// Note that the `showYourself` method has another static `.bind()` method within it - which we already know
const boundShow = otherIT.showYourself.bind(hijacker);
console.log(boundShow)
console.log(boundShow())


// With that in mind, there are a few more static fields in JavaScript meta-programming
// one of them in the case of constructors created from functions - is the field:
// `.prototype`

// Let's see how it behaves:
// Suppose we have a coffee machine:
class CoffeeMachine {
	coffeeBeans = 200;
	groundCollector = 0;
	makeACoffee() {
		this.coffeeBeans -= 20;
		this.groundCollector += 20;
		return 'Coffee Cup'
	}
}


const myMachine = new CoffeeMachine();
myMachine.makeACoffee();
myMachine.makeACoffee();
myMachine.makeACoffee();

console.log(myMachine)
// Suddenly we "remembered" that we don't have a method for cleaning coffee grounds from the tray
// What now ?
// Suppose we can't touch the CoffeeMachine class inside.
// How to deal with this ?

// Add a method to the prototype:
CoffeeMachine.prototype.cleanGroundCollector = function () {
	this.groundCollector = 0;
}

// Now we can invoke it on an instance !!!
myMachine.cleanGroundCollector();

// and we have an empty coffee grounds container:
console.log(myMachine)
console.log(myMachine.groundCollector)

// Wait a minute?! - how come, after all CoffeeMachine instance (myMachine)
// had already been made at the moment we added the new cleanGroundCollector method!

// moreover, new instances will also have access to it

const myOtherMachine = new CoffeeMachine();
console.log(myOtherMachine)
myOtherMachine.makeACoffee();
myOtherMachine.makeACoffee();
myOtherMachine.makeACoffee();
myOtherMachine.makeACoffee();
console.log(myOtherMachine)
console.log(myOtherMachine.groundCollector)
// Proof that it is not "static":
myMachine.cleanGroundCollector()
console.log(myOtherMachine.groundCollector)
// CHECKING!:
myOtherMachine.cleanGroundCollector();
console.log(myOtherMachine.groundCollector)
// It works 😎.

// OK - but how?
// Each constructor (made using functions in JS) - can have its own prototype.
// This is a static value that can be extended like an object.
// What's important - it cannot be overwritten, so don't do this:

// SomeConstructor.prototype = {};

// Then JS will "lose" the pointer to the prototype.


// But how is it that instances "know about the prototype"?
// Moreover - they know about it even when it is "out of time" and the instance has already been created,
// we extend the prototype after that - remember?!

// This is what happens - because that's the way JavaScript works.
// When we instantiate an object in memory, it gets there with all the fields and methods defined in the class.

// However, if we call a method on the instance that has not been physically entered into the class definition,
// THIS DOESN'T CAUSE AN IMMEDIATE ERROR!

// JS goes instead to the prototype of this class (which lives in one place in memory)
// As indicated by its syntax - `prototype` is a static field.
// If the method exists in the prototype,
// under the keyword `this` we will see the object instance we want to call this method on!

// But what if the method doesn't exist?
// Then there is still no error if one class inherits from another one.
// Then its methods are searched, and what if they are not in this class?
// This JS checks the prototype of the class after which the inheritance is done

// This is how we create a "prototype chain" - a linking between the prototypes,
// after which it will be checked if a given method exists and if so -
// will be called on the "instance" from which we called it.

// The amazing performance of prototypes is that the methods we want to call
// are not created in memory with the object instance. They sit in one place
// in memory.
// This fact is used, among others, by transpilers, changing our syntactic sugar,
// from `class` to writing functions with constructors - transferring methods and put them inside the prototype.
