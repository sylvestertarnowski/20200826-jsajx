import { assertThat } from '../j4b1-assert'
/**
 * 00-sample
 * Warm up
 *
 * How to - synchronously, you can take calculations from function output.
 *
 * * Rules:
 * - you can add new code.
 * - you can modify function parameters
 * - you mustn't increase / decrease number of parameters
 * - you mustn't change existing code
 */

function giveMeLargestNumber(a, b) {

}

// #Rule:
// You must not change code below:
assertThat(
	'Should give me number 40 when 40 and 10 given',
	expect => expect( giveMeLargestNumber(40, 10) ).toBe(40)
) //=
assertThat(
	'Should give me number 500 when the same number 500 given',
	expect => expect( giveMeLargestNumber(500, 500) ).toBe(500)
) //=
assertThat(
	'Should give me number 789 when 80 and 789 given',
	expect => expect( giveMeLargestNumber(80, 789) ).toBe(789)
) //=
assertThat(
	'Should be undefined proof',
	expect => expect( giveMeLargestNumber(undefined, undefined) ).toBe(0)
) //=
assertThat(
	'Should be undefined proof - more lifelike example',
	expect => expect( giveMeLargestNumber() ).toBe(0)
) //=
assertThat(
	'Should work with numbers below 0',
	expect => expect( giveMeLargestNumber(-9000, -90) ).toBe(-90)
) //=

