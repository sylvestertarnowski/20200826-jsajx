/**
 * d30-weak-collections
 * Explain
 *
 * #Goal:
 * Explanation of WeakMap / WeakSet objects and their dependence on GarbageCollector
 */

// Let's start with a few things:
// 1: JavaScript has a mechanism called Garbage Collector
// Its behavior is as follows:

let myItGuy = {name: 'Moss'};
myItGuy = null;

// At this point there is no reference to {name: 'Moss'}
// This arrangement causes the Garbage Collector to collect (remove) from memory {name: 'Moss'}
// Because GC sees that we don't need it.
// That's how it works.

// 2:
// WeakSet - It is called "Weak" because when an object is inside of it
// It does not stop Garbage Collector from clearing up this object from the memory.

// Example:

let myExample = {hello: 'World'};
const classicSet = new Set([myExample]);
myExample = null;

// In this example, Garbage Collector will not clear the {hello: 'World'} object from memory
// Because this object is stored in classicSet.
// classicSet - has a reference to it.

// It contrasts with this behavior:
let myOtherExample = {goodbye: 'World'};
const weakSet = new WeakSet([myOtherExample]);
myOtherExample = null;

// In this arrangement, GC - will remove the {goodbye: 'World'} object from memory.
// This is because Set is "Weak" - that is his job.
// We can only put OBJECTS into it - you can't add to WeakSet - primitive types.
// additionally, WeakSet cannot be iterated!
// If the last reference to an object is removed, then WeakSet will not stop GC from collecting that object!

// In that case in WeakSet, we only have methods:
// .add
// .delete
// .has

// So, what WeakSet can help us with?
// WeakSet - is still a Set, its values, although they must be objects - are to remain unique.
// In all operations where we don't want to e.g. reprocess the same object,
// We can control that it has already been added by us and is present inside the set - `.has()`

// WORKING EXAMPLE:
const today = new Date();
const setCollection = new WeakSet([{}, today, today, [], {}, new Date()])

console.log(setCollection.has(today))

// WEAK MAP
//

// WeakMap has very similar rules to SET but of course it's a map.
// WeakMap keys can ONLY OBJECTS - you cannot have a primitive type key
// The values can be anything.
// You can't iterate over the WeakMap keys or values.

const myHoldOn = {};
const collection = new WeakMap([[{}, 2], [myHoldOn, 'Hello World!']])

console.log(collection.get(myHoldOn))

// Similar to Set - WeakMap will not stop you from deleting objects,
// which will be used as keys in the WeakMap

// If the given object - WeakMap key will have no other reference
// Will be clean up by GC.
// What's more - what we have entered as the map value will also be deleted,

// In that case, we can consider e.g. another data privacy concept in a JavaScript object

function Person(name, age) {
	const privates = new WeakMap();
	privates.set(this, {});
	privates.get(this).somethingPrivate = 'cash';

	this.name = name;
	this.age = age;
	this.insertPrivate = function(name, value) {
		privates.get(this)[name] = value;
	}
	this.readPrivate = function(name) {
		return privates.get(this)[name];
	}
}

let myPerson = new Person('Mike', 40);
myPerson = null;

// in this case both the myPerson instance and its private variables are collected
// by Garbage Collector
