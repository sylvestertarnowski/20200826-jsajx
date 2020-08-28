import { List } from 'immutable'
import { assertThat } from '../../j4b1-assert'
/**
 * c11-non-mutable-with-immutable-js
 * Explain
 *
 *
 * #Goal:
 * Getting to know immutable.js library - which offers "immutable" data collections.
 * Where data modification creates a new object instance instead of mutating the existing one.
 */

const original = List([1, 2, 3, 4, 5]);
const result = original.push(900);

// #Rule:
// You must not change code below:
assertThat(
	'Should not mutate original data',
	expect => expect(original).notToBe(result)
)  //=

assertThat(
	'Original data stays intact',
	expect => expect(original.toArray().toString()).toBe('1,2,3,4,5')
)  //=

assertThat(
	'New data should be with number 900',
	expect => expect(result.toArray().toString()).toBe('1,2,3,4,5,900')
)  //=


// ---------------------------------------------------------------------------------------------------------------------
// POP FUNCTIONALITY:

const withAllElements = List(['mangoes', 'strawberries', 'blueberries']);
const poppedElements = withAllElements.pop();

assertThat(
	'Should not mutate original data',
	expect => expect(withAllElements).notToBe(poppedElements)
)  //=

assertThat(
	'Original data stays intact',
	expect => expect(withAllElements.toArray().toString()).toBe('mangoes,strawberries,blueberries')
)  //=

assertThat(
	'New data should be without blueberries fruit',
	expect => expect(poppedElements.toArray().toString()).toBe('mangoes,strawberries')
)  //=

