import { assertThat } from '../../j4b1-assert'
/**
 * a10-the-need-of-modularity
 * Warm up
 *
 * Light years before ES6 (2015) ....
 *
 * All such mixed up in these scopes of JavaScript ...
 *
 * * Rules:
 * - you can add new code.
 * - existing code should work as before (console.log etc.)
 * - you mustn't reference or assign new value to the variable `myValue` in the new code
 * - you mustn't change existing code.
 */

var myValue = 2000;
console.log('Current value is', myValue);

/*
let myValue = 2000;
console.log('Current value is', myValue);

{
    let myValue = 3000;
    console.log( 'Current value is', myValue );
}
*/
// Possible solution 1:
function hello() {
    var myValue = 3000;
    console.log( 'Current value is', myValue );
}
hello();

// Possible solution 2:
(function () {
    var myValue = 3000;
    console.log( 'Current value is', myValue );
})();

// Possible solution 3:
(() => {
    var myValue = 3000;
    console.log( 'Current value is', myValue );
})();

(100 + 200).toString() //=

// IIFE Immedietly Invoked Function Expression

// myValue = 2000;

// #Rule:
// You must not change code below:
assertThat(
	'myValue suppose to be 2000',
	expect => expect(myValue).toBe(2000)
)  //=
