/**
 * b31-prototype-chain
 * Explain
 *
 * In order to check an example - uncomment the code one by one.
 *
 * #Goal:
 * Checking how the prototype chain behaves when dealing with inheritance.
 * The way and order of JavaScript search for methods when using `.prototype`
 *
 */

// Base class
class Vehicle {
	constructor (name = '') {
		this.name = name;
	}
	// shoutMyName() {
	// 	console.log(this.name);
	// }
}

// Class that inherits from the base class
class Car extends Vehicle {

	constructor (name = '') {

		super(name);
	}

	// shoutMyName() {
	// 	console.log(this.name);
	// }
}

function shoutMyName() {
	console.log(this.name);
}

Vehicle.prototype.shoutMyName = shoutMyName;

const car = new Car('Audi');
console.log(car);

car.shoutMyName() //= 'Hello Audi !'
