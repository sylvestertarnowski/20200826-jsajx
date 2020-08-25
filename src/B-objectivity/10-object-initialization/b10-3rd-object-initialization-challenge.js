import { assertThat } from '../../j4b1-assert'

/**
 * b10-object-initialization
 * Challenge
 *
 * Our IT department - must dress appropriately for the weather.
 * Additionally, each person carries 1 extra item.
 *
 * * Rules:
 * - You can write the code only in the designated place
 */

function dressUpAccordingToWeather(weatherProvider, props) {
	// #Rule:
	// You can only here write the code

}


const person1 = dressUpAccordingToWeather('windy', {name: 'Jen', lastName: 'Barber', has: 'keys'})
const person2 = dressUpAccordingToWeather('sunny', {name: 'Maurice', lastName: 'Moss', has: 'duck'})
const person3 = dressUpAccordingToWeather('cloudy', {name: 'Roy', lastName: 'Trenneman', has: 'mug'})

// #Rule:
// You must not change code below:
assertThat(
	'person1 is Jen Barber',
	expect => expect(person1.name + ' ' + person1.lastName).toBe('Jen Barber')
)  //=
assertThat(
	'she has keys and wears coat',
	expect => expect(person1.keys + ' ' + person1.wearing).toBe('true coat')
)  //=
//----------
assertThat(
	'person2 is Maurice Moss',
	expect => expect(person2.name + ' ' + person2.lastName).toBe('Maurice Moss')
)  //=
assertThat(
	'he has duck and wears t-shirt',
	expect => expect(person2.duck + ' ' + person2.wearing).toBe('true t-shirt')
)  //=
//----------
assertThat(
	'person3 is Roy Trenneman',
	expect => expect(person3.name + ' ' + person3.lastName).toBe('Roy Trenneman')
)  //=
assertThat(
	'he has mug and wears coat',
	expect => expect(person3.mug + ' ' + person3.wearing).toBe('true coat')
)  //=
