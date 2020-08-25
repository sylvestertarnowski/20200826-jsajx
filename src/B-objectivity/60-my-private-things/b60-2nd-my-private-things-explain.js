/**
 * b60-my-private-things
 * Explain
 *
 * #Goal:
 *
 * Learning the different ways to achieve data privacy.
 * This is not an obvious thing in the JavaScript World,
 * as in class definitions as well as prototypes a solution or modifier "private" that allows:
 *    changing the value of an instance property only inside the class itself
 * does not exist* at the moment
 *
 * * (Currently proposal - Stage 2)
 */

// We'll go through different kinds and ways of simulating that a given value should be, or is, private

// 1) Science fiction / conventions:
const person = {
	_name: 'Maurice'
}

console.log(person);
person._name = 'Roy'

// Not so private though:
console.log(person)


// 2) Using closure with factory function
function laptopFactory(producer, model, ramAmount) {
	let extendableRam = ramAmount;
	return {
		producer,
		model,
		// Here we could use a getter:
		memory() {
			return extendableRam + ' GB';
		},
		extendMemory(extendBy) {
			extendableRam += extendBy;
		}
	}
}

const myLaptop = laptopFactory('Dell', 'Precision 5530', 4)

console.log(myLaptop)
console.log(myLaptop.memory())

myLaptop.extendMemory(4)
myLaptop.extendMemory(4)

console.log(myLaptop.memory())

// 3) using closure in constructor function
function MyPerson (name, salary) {
	  let _salary = salary;
	  this.name = name;
	  this.changeSalary = function (riseAmount = 0) {
		   _salary += riseAmount;
	  }
	  this.getSalary = function () {
		   return _salary;
	  }
}

const myWorker = new MyPerson('Jen', 6000);
myWorker.getSalary(); //=
myWorker.changeSalary(2500);
myWorker.getSalary(); //=


// In the current phase 2 there is a proposal to create classic private fields,
// But to make it backwards compatible - a "pretty strange" syntax has been proposed:
// 4) hot news
class Person {
	name = 'John';

	// private field inside the class:
	#salary = 3000;

	makeARise() {
		this.#salary += 1000;
	}

	showMySalary() {
		return this.#salary;
	}
}

const mrJohn = new Person();
console.log(mrJohn);
console.log(mrJohn.showMySalary());
mrJohn.makeARise();
console.log(mrJohn.showMySalary());
