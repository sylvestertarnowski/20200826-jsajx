import { assertThat } from '../../j4b1-assert'
/**
 * b10-object-initialization
 * Warm up
 *
 * Look at it, how strange this JavaScript is ...
 * Here, even classes are not needed for the objects to work 😯
 *
 * * Rules:
 * - you have to add all the code needed for the test cases to be "PASS"
 */

// console.log(['Maurice', 'Jen', 'Roy'])
// console.log(['Maurice', 'Jen', 'Roy'].toString())

const myItCrowd = {
    characters: {
        list: ['Maurice', 'Jen', 'Roy']
    },
    office: {
        answerPhone: () => 'Did you try to turn it off and on again?'
    }
};

// #Rule:
// You must not change code below:
assertThat(
	'myItCrowd should have a list of [Maurice, Jen, Roy] present',
	expect => expect(myItCrowd.characters.list.toString()).toBe('Maurice,Jen,Roy')
)  //=
assertThat(
	'myItCrowd should have answerPhone method with proper text returned',
	expect => expect(myItCrowd.office.answerPhone()).toBe('Did you try to turn it off and on again?')
)  //=
