import { assertThat } from '../../j4b1-assert'
/**
 * e20-timer-events
 * Warm up
 *
 *
 * * Rules:
 * - You can change and overwrite myValue
 * - You can write wherever you want - besides the obvious #Rule :)
 */

let myValue = 0;

// #Rule:
// You must not change code below:
assertThat(
	'should be 0 on start',
	expect => expect(myValue).toBe(0)
)  //=
setTimeout(() => {
	assertThat(
		'should be 0 just before 2s',
		expect => expect(myValue).toBe(0)
	)  //=
}, 1990)
setTimeout(() => {
	assertThat(
		'should be 1 after 2s',
		expect => expect(myValue).toBe(1)
	)  //=
}, 2010)
