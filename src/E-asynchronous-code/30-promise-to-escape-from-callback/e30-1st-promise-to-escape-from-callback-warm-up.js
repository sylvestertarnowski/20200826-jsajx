import { assertThat } from '../../j4b1-assert'
/**
 * e30-promise-to-escape-from-callback
 * Warm up
 *
 *
 * * Rules:
 * - you mustn't change the existing code
 * - you mustn't manually assign the values "Roy" or "Trenneman" (they must come from the promise)
 */

let name = '';
Promise.resolve('Roy')

let lastName = '';
Promise.reject('Trenneman')

// #Rule:
// You must not change code below:
assertThat(
	'name should be empty before promise resolve',
	expect => expect(name).toBe('')
)  //=
assertThat(
	'lastName should be empty before promise rejects',
	expect => expect(lastName).toBe('')
)  //=

queueMicrotask(() => {
	assertThat(
		'name should be Roy',
		expect => expect(name).toBe('Roy')
	)  //=
	assertThat(
		'lastName should be Trenneman',
		expect => expect(lastName).toBe('Trenneman')
	)  //=
})


