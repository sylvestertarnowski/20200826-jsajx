import { assertThat } from '../../j4b1-assert'
import { stringHelper, numberHelper } from './a20-challenge-project/czesuaf-util';

/**
 * a20-import-export-variants
 * Challenge
 *
 * Czesiek is a pragmatic programmer.
 * Alongside with good practices and the poetic craft of a programmer, he prepares a whole lot of so-called helper-functions.
 * They meet all good requirements, are pure, solid and generally cool.
 * However, a mess has crept into his code - there is a lot of helper functions (util), some of them cannot be reuse - because no access possible.
 * Additionally, they are located in different places and take care of different things.
 * For example: some help with only Strings and others help with Numbers
 *
 * Time to bring order here !!!
 *
 * The project is in the folder: a20-challenge-project
 * Your task is to find and collect all helper-functions in one place:
 * czesuaf-util.js
 *
 * * Rules:
 * - You cannot use the copy-paste, the functions originally stay in their place (in their files)
 * - [!] Imports to this file can only come from `. /a20-challenge-project/czesuaf-util.js`
 * - Functions must be divided into specific categories - details in test cases below
 * - In other design files you mainly use the import / export keywords
 * - In this file (challenge) you can only use import entry (import syntax)!
 */

 
// #Rule:
// You mustn't change code below:
const sampleString = 'Hello World';

assertThat(
	'lastLetter should give the last letter of the string',
	expect => expect(stringHelper.lastLetter(sampleString)).toBe('d')
)  //=
assertThat(
	'numberOfChars should give length of the given string',
	expect => expect(stringHelper.numberOfChars(sampleString)).toBe(sampleString.length)
)  //=
assertThat(
	'numberOfChars should give length of the given string',
	expect => expect(stringHelper.countWords('Hello World ! ?')).toBe(2)
)  //=
assertThat(
	'numberOfChars should give length of the given string',
	expect => expect(stringHelper.capitalize('janusz')).toBe('Janusz')
)  //=


assertThat(
	'addNumbers',
	expect => expect(numberHelper.addNumbers(1000,210,20,0)).toBe(1230)
)  //=

assertThat(
	'averageFrom',
	expect => expect(numberHelper.averageFrom(30,40,100,20)).toBe(47.5)
)  //=

assertThat(
	'toSecondPower',
	expect => expect(numberHelper.toSecondPower(12)).toBe(144)
)  //=
