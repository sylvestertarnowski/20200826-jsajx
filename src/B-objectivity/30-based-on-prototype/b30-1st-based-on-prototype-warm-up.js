import { assertThat } from '../../j4b1-assert'
/**
 * b30-based-on-prototype
 * Warm up
 *
 * This time I "forgot" to add one method but in the class ... will you help?
 *
 * * Rules:
 * - You cannot add code inside the Person "class"
 * - Try to apply the principle of "DRY" - Don't Repeat Yourself 😎
 */

function Person(fullName = '') {
	this.fullName = fullName;
}

const actor = new Person('Richard Ayoade');
const theItGuy = new Person('Maurice Moss');
const theBoss = new Person('Douglas Reynholm');

// #Rule:
// You must not change code below:
assertThat(
	'Actor should be able to introduce himself',
	expect => expect(actor.introduce()).toBe('My name is Richard Ayoade')
)  //=
assertThat(
	'It Guy should be able to introduce himself',
	expect => expect(theItGuy.introduce()).toBe('My name is Maurice Moss')
)  //=
assertThat(
	'Boss should be able to introduce himself',
	expect => expect(theBoss.introduce()).toBe('My name is Douglas Reynholm')
)  //=
