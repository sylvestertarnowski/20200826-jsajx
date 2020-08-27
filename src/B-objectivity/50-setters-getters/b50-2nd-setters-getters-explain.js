/**
 * b50-setters-getters
 * Explain
 *
 * #Goal:
 * Knowing the `set` and` get` used directly on an object - or in a class definition.
 * Allowing to invoke additional logic and special behavior when assigning `set`,
 * or read `get` - some value (instance field)
 *
 * It is often useful for determining the so-called "computed properties" - where the field value is calculated
 * based on other data contained within the object instance or within the class.
 */

// setter and getter behave in JS similar to other programming languages
// we get 2 keywords: `set` and` get`
// we can apply them before a method, saved in a specific format
// however on "the other side" an object instance has getter / setter served as a normal property field.

// An example of the profitability of this solution
// is the point at which the value of a given field is "recalculated" and depends on other fields
// in this way using getter we can compute this value
// that's why we say `computed properties` for this type of data
const person = {
	name: 'Maurice',
	lastName: 'Moss',
	get fullName() {
		return this.name + ' '+ this.lastName;
	}
}
console.log(person.fullName)

person.name = 'Roy';
console.log(person.fullName)

person.lastName = 'Trenneman';
console.log(person.fullName)

// Similarly, we can apply this in the class:
class MyItProfessional {
	constructor (name = '', ageOfWork = 0) {
		this.name = name;
		this.ageOfWork = ageOfWork;
	}

	get position() {
		return this.ageOfWork < 2 ? 'junior' : this.ageOfWork < 5 ? 'mid' : 'senior';
	}

	set position(value) {
		switch(value) {
			case 'junior':
				this.ageOfWork = 1;
			break;
			case 'mid':
				this.ageOfWork = 2;
			break;
			case 'senior':
				this.ageOfWork = 5;
			break;
			default:
				console.log('sorry, unknown position:', value);
		}
	}
}

const maurice = new MyItProfessional('Maurice', 10);
console.log(maurice.position);
console.log(maurice.ageOfWork);
maurice.position = 'mid';
console.log(maurice.ageOfWork);
maurice.position = 'expert';
console.log(maurice.ageOfWork);

// is iterable ?

// is it enumerable 
for(let key of Object.keys(maurice)) {
    console.log(key);
}

for(let key in maurice) {
    console.log(key);
}

// here we also added a setter - with which we can control the value of another field.

// The idea is simple here:

// SETTER:
// besides assigning a specific value, we can run logic
// just like someone used the method instead of simply typing a value into the field

// GETTER
// besides reading a specific value - again we have the possibility to run logic,
// to combine the value of a field from several other fields etc.

// Both setter and getter - on the other side - on the instance, look like "normal property field" and behave like that
// (not as the declaring syntax would suggest - methods!)
