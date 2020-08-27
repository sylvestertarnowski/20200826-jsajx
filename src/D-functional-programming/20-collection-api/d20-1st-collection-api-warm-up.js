import { assertThat } from '../../j4b1-assert'
/**
 * d20-collection-api
 * Warm up
 *
 *
 * * Rules:
 * - You mustn't delete the existing code
 * - You can add code to the right of the assignment to `distinctNumbers`
 * - You mustn't change the value in `numbers`
 */

 Array.from('abcd'); //=
 Array.from(new Set([1,2,1,1,1,1])); //=
 console.log([ ...'hello world' ] )
 
const numbers = [10, 20 , 30, 2, 2, 2, 30, 20, 2, 10, 8, 9, 0];
// const distinctNumbers = Array.from(new Set(numbers))
const distinctNumbers = [...new Set(numbers)]

// #Rule:
// You must not change code below:
assertThat(
	'distinctNumbers list should not have number repetitions',
	expect => expect(distinctNumbers.toString()).toBe('10,20,30,2,8,9,0')
)  //=
