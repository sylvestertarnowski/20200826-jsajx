import { assertThat } from '../../j4b1-assert'
/**
 * e10-simplest-async
 * Challenge
 *
 * And we thought the world would be full of sun, rainbow and unicorns.
 * Our brave contribution to the JJ-Query open-source - has a minor bug.
 * We assume that each Ajax query to the server from the "getJSON" method,
 * will be resolved correctly and bring you the data!
 *
 * We did not assume that:
 * - the address could be incorrect
 * - the server could not respond with the data
 * - the server responds with an error
 *
 * We already have an idea for fix 0.2.101283 - you need to add 2 values for the callback
 * One - it will just give us data as before.
 * The second will be "error" - set to null if everything is OK,
 * if not - we will give an error there and the data will be set to null.
 *
 * Help us put it together please.
 *
 * * Rules:
 * - Only change the code inside the `getJSON()` implementation
 */

const DZej = {
	getJSON(url, callback) {
		// #Rule:
		// Code can be written and change only inside this block.
	}
}

// #Rule:
// You must not change code below:
let firstAjaxResult = {};
DZej.getJSON('https://reynholm-industries.com/it', (data, error) => {
	firstAjaxResult = { error, data }
})
assertThat(
	'',
	expect => expect(firstAjaxResult).toEqual({
		error: null,
		data: { message: 'did you try?' }
	})
)//=

let secondAjaxResult = {};
DZej.getJSON('https://reynholm-industries.com/not-existing', (data, error) => {
	secondAjaxResult = { error, data }
})
assertThat(
	'',
	expect => expect(secondAjaxResult).toEqual({
		error: {status: 404, message: 'Invalid URL!'},
		data: null
	})
)//=
