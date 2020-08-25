import { assertThat } from '../../j4b1-assert'

/**
 * a30-special-async-import
 * Warm up
 *
 * * Rules:
 * - you need to import and use `importMe` from ./a30-1st-lucky-color-provider
 * - you mustn't manually change `luckyColor` value
 */

let luckyColor = '';

// #Rule:
// You must not change code below:
Promise.resolve()
	.then(() => {

	assertThat(
		'importMe should be used inside the scope',
		expect => expect.toThrow(() => importMe).message('No error !')
	)  //=

	assertThat(
		'luckyColor suppose to be: crimson',
		expect => expect(luckyColor).toBe('crimson')
	)  //=
})

