import { assertThat } from '../../j4b1-assert'
/**
 * c10-immutability
 * Warm up
 *
 * Implement push and pop functions for arrays - from the beginning
 * They should create new arrays every time - not mutating the existing ones!
 *
 * Rules:
 * - Write code only inside `push` and `pop`
 */

// 1) PUSH FUNCTIONALITY:

function push (element, array) {
	// #Rule:
    // Code can be written inside this block.
  
	return [...array, element];
}

const original = [1, 2, 3, 4, 5];
const result = push(900, original);

// #Rule:
// You must not change code below:
assertThat(
	'Should not mutate original data (original and result should point to different place in memory)',
	expect => expect(result).notToBe(original)
)  //=

assertThat(
	'Original data stays intact',
	expect => expect(original.toString()).toBe('1,2,3,4,5')
)  //=

assertThat(
	'New data should be with number 900',
	expect => expect(result.toString()).toBe('1,2,3,4,5,900')
)  //=


// ---------------------------------------------------------------------------------------------------------------------
// 2) POP FUNCTIONALITY:

/**
 * 
 * @param {any[]} array 
 */
function pop(array) {
	// #Rule:
    // Code can be written inside this block.
  const excludeLastElement = (el, index) => index === array.length - 1 ? false : true
	return array.filter(excludeLastElement);
}

const withAllElements = ['mangoes', 'strawberries', 'blueberries'];
const poppedElements = pop(withAllElements);

assertThat(
	'Should not mutate original data',
	expect => expect(poppedElements).notToBe(withAllElements)
)  //=

assertThat(
	'Original data stays intact',
	expect => expect(withAllElements.toString()).toBe('mangoes,strawberries,blueberries')
)  //=

assertThat(
	'New data should be without blueberries fruit',
	expect => expect(poppedElements.toString()).toBe('mangoes,strawberries')
)  //=



