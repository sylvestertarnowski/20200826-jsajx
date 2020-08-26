import { assertThat } from '../../j4b1-assert'
/**
 * b30-based-on-prototype
 * Challenge
 *
 * It is 2030, cars are hovering above the ground, and we eat food from 1 pill a day.
 * ChromeSpaceX version 1287 already has 99.00009% of the market.
 * Everything went ahead except ... our project.
 * Business came up with support for legacy!
 * We need support for 2020 browser: Chrome version 83
 * It uses the ancient ES11 syntax.
 * Where String has no methods: `capitalize` and` last`, which came in 2025 - (ES16)
 * Unfortunately we have used them in our project so far!!
 *
 * We need to add polyfills to these methods.
 * Because there is no daredevil - to correct 12,938 places in our code where we potentially use these methods.
 *
 * * Rules:
 * - No rules .... this project just has to work.
 * - You obviously just can't touch the code with assertions!
 */

// console.log(String)
// console.log(Boolean)
// console.log(Number)

// const myLuckyNumber = new Number(7);
// const myLuckyNumber2 = 7;

// console.log(myLuckyNumber + 10)
// console.log(myLuckyNumber2 + 10)

// Extending native proptotype === Pollyfiling 
String.prototype.last = function() {
    return this.slice(-1); 
    // this is safer than this below:
    // return this[this.length -1 ]; 
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
    // this is safer than this below:
    // return this[0].toUpperCase();
}

''.capitalize() //

// In day-to-day life do not try to extend Native prototypes on your own !

// #Rule:
// You must not change code below:
assertThat(
	'Last letter of Stefan suppose to be "n"',
	expect => expect('Stefan'.last()).toBe('n')
)  //=
assertThat(
	'Last letter of Hello worlD suppose to be "D"',
	expect => expect('Hello worlD'.last()).toBe('D')
)  //=
// --------------------------------:
assertThat(
	'Name "zbigniew" suppose to be capitalized to "Zbigniew"',
	expect => expect('zbigniew'.capitalize()).toBe('Zbigniew')
)  //=
assertThat(
	'Name "bianca" suppose to be capitalized to "Bianca"',
	expect => expect('bianca'.capitalize()).toBe('Bianca')
)  //=

// What we've done here is professionally called "Polyfill"
// https://developer.mozilla.org/en-US/docs/Glossary/Polyfill

// The situation itself is imaginary - but what if we were about to e.g. support IE?,
// We won't find the existing ES7 method `.includes()` in String and Array:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes

// In order for make it work in IE, we need to use Polyfill!
