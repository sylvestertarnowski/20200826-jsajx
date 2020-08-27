import { assertThat } from '../../j4b1-assert'

/**
 * b40-cloning
 * Explain
 *
 * #Goal:
 * Explanation of how to clone data structures and the problems about it in JavaScript.
 */

// Cloning in JS is useful when we have an instance of a given object
// and we want an independent copy of it

// This is very often needed for storing and updating the state,
// Especially where we don't want to mutate the data.

// Consider an example:
const reference = {};
const myNewObject = reference;

reference.name = 'Mike';
myNewObject.lastName = 'Kowalsky';

console.log(reference === myNewObject);
console.log(reference);
console.log(myNewObject);

// Example above should come as no surprise.

// Only the simple types "primitives" - i.e. String, Number, Boolean, BigInt, Symbol - will be assigned by value
// All other types inherit from JS from Object and they are assigned as a reference.
console.log(typeof {})
console.log(typeof [])
console.log(typeof new Date())
console.log(typeof new RegExp(''))

// Complex types reserve memory space, in this case, assigning to a new variable / constant an existing object in memory
// Create a "pointer" to this object.

// So comparing 2 references - pointing to the same memory location, returns `true`
console.log(reference === myNewObject);


// This is well illustrated (reference) in the following example.
let myHelloObject = {hello: 'World'}
const otherReference = myHelloObject;

myHelloObject = {};

console.log(myHelloObject);
console.log(otherReference);

// Making: {hello: 'World'} reserves memory space for a new object.
// myHelloObject - points to this object (reference to the object)
// later declare `otherReference` to point to the same place as myHelloObject
// Making: const otherReference = myHelloObject;

// next, making:
// myHelloObject = {};
// does not "clear" the object at all !!!
// It just makes the variable `myHelloObject` point to the new memory location: {} (empty object).

// Now our constant `otherReference` is the only connection to a place: {hello: 'World'};


// Back to cloning ....

// We saw at the top that just making:
// const myNewObject = reference;
// does not create a new object ...
// not to mention - it does not copy its contents to a new location.

// Shallow COPY - to the rescue!
// It might seem that the following modern toys will do the trick:
// = new Person()
const user = {name: 'Mike'};

const newUser = {...user};
// OR:
const assignedUser = Object.assign({}, user);

// This will preserve constructor and make shallow copy
const newUserWithConstructorPreserved = Object.create(user);

console.log(user)
console.log(newUser)
console.log(assignedUser)
console.log(user === newUser);
console.log(user === assignedUser);
console.log(assignedUser === newUser);

// Actually, this is fine until we get to the nesting of the object within the other object
const myHouse = { name: 'Small loft', address: { street: 'Raspberry', number: 8} };
const myCopyHouse = { ...myHouse };

console.log(myHouse);
console.log(myCopyHouse);
myCopyHouse.name = 'Changed house name !'
console.log(myHouse);
console.log(myCopyHouse);

// Show time:
myCopyHouse.address.street = 'Bakery Street';

console.log(myHouse);
console.log(myCopyHouse);
console.log(myCopyHouse.address === myHouse.address);

// That's why using the spread operator {...} or the method Object.assign({}, o);
// It's called: Shallow Copy.

// We can only clone an object that does not have complex types (array, objects ...)
// However, if there are such constructions - we need something more.
// We need Deep Copy ....

// >------
// DEEP COPY - CLONING:
// --------------------------------
// It's not as easy as in warm-up, though. Several different scenarios need to be considered:

class Car {
	name = 'Audi A6'
}

const complicatedObject = {
	myDate: new Date(),
	myString: 'some string',
	myFunction() {
		console.log('Hello World')
	},
	myNumber: NaN,
	myArrayOfObjects: [{ name: 'John !'}],
	myRegExp: /./,
	myNullValue: null,
	myOtherNumber: 10292,
	address : {
		hello: 'WORLD'
	} ,
	car: new Car()
}

// the buggy problem:
console.log(typeof null)
console.log(typeof complicatedObject.car)
console.log(complicatedObject.car instanceof Car)
console.log(complicatedObject.car instanceof Object)

export function professionalCloner(toClone) {
	switch(typeof toClone) {
		case 'string':
		case 'symbol':
		case 'undefined':
		case 'boolean':
		case 'number':
		case 'bigint':
			return toClone;
		case 'function':
			return function(...args) {
				return toClone.apply(this, args)
			};
	}

	// need a separate entry for null (because `typeof null` is - `object`!)
	if(toClone === null) {
		return toClone;
	}
	if(toClone instanceof Date) {
		return new Date(toClone);
	}
	if(toClone instanceof RegExp) {
		return new RegExp(toClone);
	}
	if(Array.isArray(toClone)) {
		return toClone.map(e => professionalCloner(e));
	}
	// If no `if` fires
	// it means that we are dealing with a different kind - an object.
	// It's worth copying it initially as `shallow`, but using the` Object.create` method
	// We then save the constructor for the new object
	// later we clone each of the keys for the object and overwrite it - we use recursion for that.
	const newObject = Object.create(toClone);
	for(const key of Object.keys(toClone)) {
		newObject[key] = professionalCloner(toClone[key]);
	}
	return newObject
}

const clonedComplicated = professionalCloner(complicatedObject);

assertThat(
	'has same structure but not being the same instance in memory!',
	expect => expect(clonedComplicated).notToBe(complicatedObject)
)  //=
assertThat(
	'clone suppose to be deep !',
	expect => expect(clonedComplicated.address).notToBe(complicatedObject.address)
)  //=
assertThat(
	'should clone the array',
	expect => expect(clonedComplicated.myArrayOfObjects).notToBe(complicatedObject.myArrayOfObjects)
)  //=
assertThat(
	'should clone even objects inside an array',
	expect => expect(complicatedObject.myArrayOfObjects[0]).notToBe(clonedComplicated.myArrayOfObjects[0])
)  //=
assertThat(
	'should clone the NaN for numeric value',
	expect => expect(complicatedObject.myNumber).notToBe(clonedComplicated.myNumber)
)  //=
assertThat(
	'Car object should be cloned',
	expect => expect(complicatedObject.car).notToBe(clonedComplicated.car)
)  //=
assertThat(
	'Copied Car object should preserve its constructor',
	expect => expect(clonedComplicated.car.constructor.name).toBe(complicatedObject.car.constructor.name)
)  //=

if(complicatedObject.car instanceof Car) {
    console.log('yey')
}

if(clonedComplicated.car instanceof Car) {
    console.log('yey')
}


assertThat(
	'cloned functions should not lead to the same point in memory',
	expect => expect(complicatedObject.myFunction).notToBe(clonedComplicated.myFunction)
)  //=
assertThat(
	'serialized object structure should be the same',
	expect => expect(JSON.stringify(complicatedObject)).toBe(JSON.stringify(clonedComplicated))
)  //=


// JSON.parse(JSON.stringify(objectToClone));
