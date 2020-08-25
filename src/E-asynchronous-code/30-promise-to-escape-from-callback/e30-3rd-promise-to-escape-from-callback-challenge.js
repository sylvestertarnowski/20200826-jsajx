import { assertThat } from '../../j4b1-assert'
/**
 * e30-promise-to-escape-from-callback
 *
 * We already know that the world is not colorful,
 * Our latest version of lib for Ajax - it must be modern
 *
 * Thanks for the help with callbacks, however in version 0.3.1
 * We want to move from callbacks to - promises!
 *
 * * Rules:
 * - Only change the code inside the `getJSON()` implementation
 */


const DZej = {
	getJSON(url) {
		// #Rule:
		// Code can be written and change only inside this block.

	}
}

// #Rule:
// You must not change code below:
DZej.getJSON('https://reynholm-industries.com/it').then((ajaxResult) => {
		assertThat(
			'Should resolve with did you try message - object',
			expect => expect(ajaxResult).toEqual({ message: 'did you try?' })
		)//=
	})

DZej.getJSON('https://reynholm-industries.com/not-existing').catch(err => {
	assertThat(
		'should reject with error',
		expect => expect(err).toEqual({status: 404, message: 'Invalid URL!'})
	)//=
})

