import { assertThat } from '../../j4b1-assert'
/**
 * a10-the-need-of-modularity
 * Challenge
 *
 * You need to improve the code performance without touching the variable `maxValue`.
 *
 * "... but how are we going to get to this ancient module!?"
 *
 * * Rules:
 * - you can insert arguments to the function
 * - you can add the code below the function
 * - you mustn't change the code inside the function range
 * - you mustn't reference and overwrite the maxValue variable
 */

 function nameOfUnction(parameter) {
     console.log(parameter)
 }
 
 nameOfUnction('agrument');
 Math.max(200, 100, 200, 900) //=
 Math.max(...[200, 100, 200, 900]) //=
 
let maxValue = 0;
;((ex, calculations = () => [0]) => {
	// #Rule:
  // You mustn't change the code inside this scope
	console.log('Welcome', ex);

	maxValue = Math.max(...calculations());
})('lol', () => [8000]);

// function calculate(ex, calculations = () => [0]) {
// 	// #Rule:
//   // You mustn't change the code inside this scope
// 	console.log('Welcome', ex);

// 	maxValue = Math.max(...calculations());
// }
// calculate('Michael', function() {
//     return [8000]
// })

// #Rule:
// You must not change code below:
assertThat(
	'Max value from calculations should be equal 8000',
	expect => expect(maxValue).toBe(8000)
)  //=
