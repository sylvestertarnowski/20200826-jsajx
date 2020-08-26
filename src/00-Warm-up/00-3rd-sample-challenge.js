import { assertThat } from '../j4b1-assert'
/**
 * 00-sample
 * #1 Challenge
 *
 * Without changing the code written so far, only adding a new one
 * Make the function return the expected results
 *
 * "Thank you ... for such - 'warm-ups' ..."
* */

// #Rule:
// You can only add new code without touching the old one
function myWordList() {
    return 'It is so easy...'.split(' ')
    // return ['It', 'is', 'so', 'easy...']
}

// #Rule:
// You must not change code below:
const [,,,lastWord] = myWordList();

assertThat(
	'LastWord suppose to be "easy..."',
	expect => expect( lastWord ).toBe('easy...')
) //=

/**
 * #2 Challenge
 * */

// #Rule:
// You cannot add new code only - swap it and add comments
function sendMeProperValue() {
	return 300;
    // return 100;
	// return 100;
}

// #Rule:
// You must not change code below:
const value = sendMeProperValue();

assertThat(
	'value should equal 300',
	expect => expect( value ).toBe(300)
) //=
