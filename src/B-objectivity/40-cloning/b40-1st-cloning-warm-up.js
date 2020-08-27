import { assertThat } from '../../j4b1-assert'
/**
 * b40-cloning
 * Warm up
 *
 * Object cloning
 *
 * * Rules:
 * - You can write code only in the local scope of the function `cloner`
 */

const myFirstObject = {
	name: 'August Oetker',
	age: 56,
	title: 'Dr.'
}

const myClone = myFirstObject;

console.log(myClone === myFirstObject);

Object.keys(myFirstObject) //=

const myFirstImpressiveObject = {
	name: 'John Wick',
	age: 55,
	address: {
		zip: 11765,
		street: 'Horseshoe Road',
		neighbourhood: 'Long island',
		city: 'New York'
	}
}

function cloner(objectToClone) {
	// #Rule:
    // Code can only be written in this block.
    const myObject = {};
    
    Object.keys(objectToClone) //= + for..of loop
    
    for(let key in objectToClone) {
        // console.log(key);
        
        // that suppose to be used with for in loop !
        if (objectToClone.hasOwnProperty(key)) {

        }
        
        if(typeof objectToClone[key] === 'object') {
            myObject[key] = {...objectToClone[key]};
        } else {
            myObject[key] = objectToClone[key];
        };
    }
    
	return myObject;
}


// #Rule:
// You must not change code below:

const clonedFirstObject = cloner(myFirstObject);

// Primitives - those are assigned by value
console.log('abc' === 'abc');
console.log(12 === 12);

// Complex types (object) - those are assigned by reference (pointer in memory)
console.log(new Date() === new Date());
console.log({} === {});
console.log([] === []);

const myArray = [];
const myNewArray = myArray;

console.log(myArray === myNewArray);

console.log(clonedFirstObject === myFirstObject)

const clonedFirstImpressiveObject = cloner(myFirstImpressiveObject);

assertThat(
	'clonedFirstObject > both suppose to be an objects',
	expect => expect(typeof clonedFirstObject).toBe(typeof myFirstObject)
)  //=
assertThat(
	'clonedFirstObject > not being the same instance in memory!',
	expect => expect(clonedFirstObject).notToBe(myFirstObject)
)  //=
assertThat(
	'clonedFirstObject > objects structure should be the same',
	expect => expect(JSON.stringify(clonedFirstObject)).toBe(JSON.stringify(myFirstObject))
)  //=

assertThat(
	'clonedFirstImpressiveObject > both suppose to be an objects',
	expect => expect(typeof clonedFirstImpressiveObject).toBe(typeof myFirstImpressiveObject)
)  //=
assertThat(
	'clonedFirstImpressiveObject > has same structure but not being the same instance in memory!',
	expect => expect(clonedFirstImpressiveObject).notToBe(myFirstImpressiveObject)
)  //=
assertThat(
	'clonedFirstImpressiveObject > clone suppose to be deep !',
	expect => expect(clonedFirstImpressiveObject.address).notToBe(myFirstImpressiveObject.address)
)  //=
assertThat(
	'clonedFirstImpressiveObject > object structure should be the same',
	expect => expect(JSON.stringify(clonedFirstImpressiveObject)).toBe(JSON.stringify(myFirstImpressiveObject))
)  //=
