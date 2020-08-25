import { assertThat } from '../../j4b1-assert'
/**
 * b20-what-is-this
 * Warm up
 *
 * I "forgot" to add one method in two objects ... can you help?
 *
 * * Rules:
 * - Correct the code to make it work
 * - Try to follow the "DRY" rule - Don't Repeat Yourself
 */

const personJen = {
	fullName: 'Jen Barber',
	profession: 'IT Manager',
}

const personRoy = {
	fullName: 'Roy Trenneman',
	profession: 'The IT Guy',
}

// #Rule:
// You must not change code below:
assertThat(
	'Jen should be able to introduce herself',
	expect => expect(personJen.sayYourName()).toBe('Jen Barber')
)  //=
assertThat(
	'Roy should be able to introduce himself',
	expect => expect(personRoy.sayYourName()).toBe('Roy Trenneman')
)  //=
