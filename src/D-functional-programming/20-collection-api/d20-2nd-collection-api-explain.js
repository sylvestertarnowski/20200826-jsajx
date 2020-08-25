/**
 * d20-collection-api
 * Explain
 *
 * #Goal:
 * Learning the most common and useful structures from the Collection API: Map and Set.
 * Map: has the syntax 'key' => 'value' where the keys are unique (if we repeat the key, we will overwrite the value)
 * Set: has unique values, if we try to insert existing values - they will not be saved.
 */

// In classic JS (before 2015) - the standard data collection is of course Array.
// Programmers using the Object property - as a "hashmap" - to dynamically access the object's fields
// Imitate - Map.
// Additionally, the rule that does not allow in the Object - the existence of two the same field names, makes
// that at least for primitive types - we can easily imitate Set

// Long log time ago... before golden ages od JS:

// MAP:
const myMap = {};

console.log(myMap['key']);

myMap['key'] = 'value';
console.log(myMap['key']);

myMap['key'] = 'overwrite value';
console.log(myMap['key']);

delete myMap['key'];
console.log(myMap['key']);

// we don't have any helper methods here (you would have to make them yourself, like `.has`,` .remove` etc.)

// SET:
const mySet = {};

mySet[0] = true;
mySet[10] = true;
mySet[10] = true;
mySet[200] = true;
console.log(Object.keys(mySet));

delete mySet[0];
console.log(Object.keys(mySet));

// again: no helper methods, we also have to be careful about changing the data type (number ==> string) etc.



// Only after 2015 to native language are added: Map and Set.
// They require polyfilling - because they are constructions with full sets of functionalities
// tl; dr - this is the whole new API - so the transpiler alone is not enough.

const myRealMap = new Map();

myRealMap.set( 'hello', 'World' );
myRealMap.set( 'hello', 'World 2' );
myRealMap.set( 'myName', 'Maurice Moss' );
myRealMap.set( 'myOtherName', 'Roy' );

console.log( myRealMap );
console.log( myRealMap.get( 'non-existing' ) );
console.log( myRealMap.get( 'hello' ) );

// Deleting an item:
myRealMap.delete('hello') //=
console.log(myRealMap)

// Create a new Map from an existing (two-dimensional) array:
console.log(
	new Map([['key', 'value'], ['key2', 800]])
)
// Convert Map to Array:
// Here comes the static method: `Array.from`
console.log(Array.from(myRealMap))
// Array of keys:
console.log(Array.from(myRealMap.keys()))
// Array of values:
console.log(Array.from(myRealMap.values()))

// Iterating:
for(const key of myRealMap.keys()) {
	console.log(key)
}
for(const value of myRealMap.values()) {
	console.log(value)
}
for(const entry of myRealMap) {
	console.log(entry)
}

// Trick:
const theItGuy = Object.fromEntries(myRealMap);
console.log(theItGuy)
console.log(theItGuy.myName)

// Check if a given key exists in the Map:
myRealMap.has('myName') //=

// Put a new value into the map:
myRealMap.set('name', 'James') //=

// Number of elements in the map:
myRealMap.size //=

const myRealSet = new Set();

myRealSet.add( 'apple' );
myRealSet.add( 'cherry' );
myRealSet.add( 'banana' );
myRealSet.add( 'banana' );
myRealSet.add( 'banana' );
myRealSet.add( 'cherry' );
myRealSet.add( 'mango' );

console.log( myRealSet );

myRealSet.delete('mango') //=

console.log( myRealSet );

// Create a new Set from an existing array
console.log(
	new Set([1, 2, 3, 4, 4, 5, 6, 6, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8])
)
// Convert Set to Array:
// Static method: `Array.from` becomes handy here:
console.log(Array.from(myRealSet))

// Iterating:
for(const fruit of myRealSet) {
	console.log(fruit)
}

// Check if a given value exists in Set:
myRealSet.has('apple') //=
myRealSet.has('strawberry') //=

// Put a new value into the set:
myRealSet.add('strawberry') //=

// Number of elements in the set:
myRealSet.size //=
