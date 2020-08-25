/**
 * b20-what-is-this
 * Explain
 *
 * #Goal:
 * Understanding the meaning of the `this` keyword in JS and the source of its "strange behavior" and "dangers" related to its use.
 * Learn methods of escaping these dangers using the `.bind` or arrow functions
 */


// This depends on the context!
// What does this mean in practice?
// That we can't be sure what is under the `this` keyword until we know who calls the method and under what circumstances.

// Let's look at the warm-up example a bit differently:
function sayYourName() {
	return this.fullName;
}

const personRoy = {
	fullName: 'Roy Trenneman',
	profession: 'The IT Guy',
	sayYourName
}

const personJen = {
	fullName: 'Jen Barber',
	profession: 'IT Manager',
	sayYourName
}

// The function is simply called - then the `this` keyword points to the global object
sayYourName(); //=

// Now we call the method on the object, this points to the instances of this object:
personJen.sayYourName(); //=

// It's very similar here:
personRoy.sayYourName(); //=


// The same will happen if we borrow a method from the object:
const personMaurice = {
	name: 'Maurice',
	getName() {
		return this.name;
	}
}

personMaurice.getName(); //=

const borrowName = personMaurice.getName;

borrowName(); //=
// Wait ... wait ... "nodejs" how so ??!

// Because now under `this` we've got a global object.
// See:
console.log(global.name);

// By declaring the constant borrowName - we made a pointer to the method, but now we call it outside the object.
// This causes a problem. As the context of the call changes.
// If the method with `this` is called outside the object, it gets the global context.
// It can also get the context of another object - if this is called on it, example:

const myCar = {
	name: 'Audi',
	whatIsYourName: borrowName
}

myCar.whatIsYourName(); //=

// Sometimes this behavior:
borrowName() //=

// It may not be exactly what we would expect,
// That is why we can forcibly attach the context to a given method.
// This is done with a static method within the function - named: .bind()

// See:
const bindBorrowName = borrowName.bind(myCar);

borrowName(); //=
bindBorrowName() //=
bindBorrowName() //=

const otherCar = {
	name: 'BMW',
	bindBorrowName
}
// Even now the context won't change [!]
// we did .bind() before and this will still work
otherCar.bindBorrowName() //=


// With the so-called. arrow functions introduction in 2015 - apart from the shortened text, they have one more functionality:
// Don't change the calling context.
// If they are not declared on the object - the keyword `this` will not show the global object, but just an empty object.
// Arrow (lambda) functions do not rely on context!

const myThisInsideAnArrow = () => {
	return this;
}

myThisInsideAnArrow() //=

const adminUser = {
	role: 'SuperAdmin',
	getRole: () => this.role
}

adminUser.getRole(); //=

// ?? WHY?
// Remember: the place of declaration counts
// when we declare adminUser we are in a global context - and since we use arrow function - we get an empty object under `this`.

// To get this functionality, we have to go level down, for example:

const otherUser = {
	role: 'NormalUser',
	getRole() {
		// note that getRole is now the standard method, so here `this` will DEPEND ON THE CONTEXT
		const showYourRole = () => this.role;
		return showYourRole();
	}
}

console.log(otherUser.getRole());

// Compare this to the following situation:

const otherUserWithFunction = {
	role: 'NormalUser',
	getRole() {
		// note that getRole is now the standard method, so here `this` will DEPEND ON THE CONTEXT
		// console.log (this)
		function showYourRole() {
			// the word `this` showYourRole, also depends on the calling context,
			// because showYourRole is not a method on the object, but a local function, guess what is really sitting under `this`
			// console.log (this.name)
			this.role;
		}
		return showYourRole();
	}
}

console.log(otherUserWithFunction.getRole());


// Conclusion:
// Arrow function is perfect for callbacks and as a way of making local helper functions.
// thanks to which we "do not lose" the context. However, we must pay attention:
// - what can be found under the keyword `this` at the moment we declare arrow function!

