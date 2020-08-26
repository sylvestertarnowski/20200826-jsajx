/**
 * b10-object-initialization
 * Explain
 *
 * #Goal:
 * In JS we can define objects in different ways, generally you don't need a class at all to initialize an object.
 * The characters {} are enough for this - it's a so-called: "object literal"
 *
 * However, how to deal with the moment when we need class-based behavior?
 * Eg we need to initialize more than one object and have a constructor.
 */

// 1) The easiest way to initialize ("construct") new objects is to use functions
// We can define the so-called "factory function" which will return a new object every time it is called.
function makePerson() {
	return {
		name: 'Michał',
		lastName: 'Kowalsky'
	}
}

// By setting right parameters, we can simulate the "constructor like" behavior:
function makePersonWith(name, lastName = 'Doe') {
	return {
		name,
		lastName
	}
}


// 2) Another way is to use the `this` keyword when DECLARING a function
// We then have to call the function with the keyword `new` - otherwise bad things will happen in our program
// Here we get the actual constructor - we can also pass parameters and add them to the instance
// `this` will here represent an instance of our newly created object.
function Person() {
	 this.name = 'Michał';
	 this.lastName = 'Kowalsky';
}
// const instance = new Person();
// console.log(instance.name)
// console.log(instance.lastName)

// 3) Another way is to use syntactic sugar with the `class` keyword - this is, by far, the most enjoyable option
// As long as we can use ES6 syntax (or we can transpile the code).
// Here if we forget the keyword `new` when creating object instances, we will be informed about it.
// Additionally - we can see exactly where the constructor is, and we can easily add methods
class MyPerson {
	 constructor () {
		 this.name = 'Michał';
		 this.lastName = 'Kowalsky';
	 }
}

// It is not required to use constructor method, from one of the versions up to ES6,
// the declaration of fields can take place outside the constructor
class MyOtherPerson {
	name = 'Michał';
	lastName = 'Kowalsky';
}

// You should know that entry 3) is really "syntactic sugar".
// Below, the class is still created by JS as in the case of #2. But 3) syntax is safer.
// It's worth copying it to e.g. https://babeljs.io/repl
// Check es2015, stage-3 options and see what our code looks like underneath.

const person1 = makePerson();
const person2 = new Person();
const person3 = new MyPerson();
const person4 = new MyOtherPerson();

console.log(person1);
console.log(person2);
console.log(person3);
console.log(person4);

// Only when using methods 2) and 3) We have access to a "meaningful" constructor
console.log(person1.constructor.name);
console.log(person2.constructor.name);
console.log(person3.constructor.name);
console.log(person4.constructor.name);
// The existence of the `constructor` property in the instance may seem strange to you.
// We've never defined such a field (especially in 1) and 2) example) - yet we have access to it.
// This will all be explained later - when we talk more about prototypes and meta-programming

// At this stage we can preview the inheritance chain:
console.log(person1 instanceof Object)
console.log(person4 instanceof Object, person4 instanceof MyOtherPerson)

// Because the function "inherits" its prototype from - Object.
// Adding static fields and methods is relatively simple:

// Imagine this situation:
function Car(name = '', engine = 2.0) {
	this.name = name;
    this.engine = engine;
}
Car.has4Wheels = true;

// We can further prepare instances:
const myAudi = new Car('Audi', 2.2);
const myAudi1 = new Car('BMW', 2.2);
const myAudi2 = new Car('Audi3', 2.2);
const myAudi3 = new Car('Audi4', 2.2);
const myAudi4 = new Car('Audi', 2.2);

myAudi1.has4Wheels //=

const myToyota = new Car('Toyota', 4);

console.log(myAudi)
console.log(myToyota)

// However the Car class also has a static field:
console.log(Car.has4Wheels)

// For now, ES6 syntax allows you to add static methods:
class MyStaticClass {
	// this field entry is not (yet) possible!
	// but the appropriate setting of the transpiler (Babel) allows us to do this:
	// static isSuperCool = true;

	// with a static method - no problem
	static showGreetings() {
		console.log('Hello World !')
	}
}

MyStaticClass.showGreetings() 
// MyStaticClass.isSuperCool //=


// In this way it seems that we have a full "basket" of functionalities,
// which allow us to freely write the code as OOP (Object Oriented Programming).
// However, this is just an introduction to this paradigm.
// We have to tell ourselves about inheritance and private fields in classes.

// SPECIFICATION OF JS - Continued:
// Regardless of how we created the object in JS - it is dynamic.
// This means that we can add new fields to it:

console.log(person4);
person4.age = 40;

console.log(person4);

// Obviously, this can create as much good as - unexpected behavior in your code.
// Let's go one step further, remembering the infamous JS name "The Hashmap of the Hashmaps".
// it is about the possibility of not only dynamic extension of the object with new fields
// but also that it can be done via "DYNAMIC PROPERTY NAME?!"

// it looks like this:
person4['otherField'] = 'otherValue';
console.log(person4);

// or using a constant:
const key = 'my-illegal-key';
person4[key] = '😎';

// const myObj = {
//     my-illegal-key: ''  
// }

console.log(person4);
// console.log(person4['my-illegal-key']);


// Note We Did Something That Wouldn't Be Possible Without this string-syntax !!! - object field, is now declared like this,
// how could not be declared without a string value provided!!!
// - you cannot use the '-' hyphen sign in the name of a variable / constant / in a field

// After 2015, it is also possible - a syntax giving the SAME EFFECT - but at the moment of object initialization,
// See:
const myOtherObject = {
	['someDynamicKey']: 'value'
}
console.log(myOtherObject);

// OR:
const age = 'myAge';
const user = {
	name: 'Michal',
	[age]: 30
}
console.log(user);

// Yes, no one wants to make their life difficult and apply such a syntax,
// It is more useful if we "dynamically" construct something inside some elegant wrapper function.

// however, in real applications you can still find the so-called "Array Like" objects
// we don't have to look far - the DOM tree is enough - there the Nodes are often returned in the form of an "array like" object

// Array like - means "almost like an array".
// Objects of this type contain fields as indexes, may have a .length field - returning a value,
// but they might not be iterable - just like an array is (the for loop won't work)

// example of a elegant syntax:
const arrayLike = {
	0: 'Hello',
	1: 'World',
	2: 'of',
	3: 'JavaScript',
	4: '!',
	length: 5
}

// such reference to the field is not possible:
// console.log (arrayLike.0)
// however we can get to the value like this:
console.log(arrayLike[0], arrayLike[1]);

// for(let x of arrayLike) {
//     console.log(x)
// }
