import { produce } from 'immer'
import { assertThat } from '../../j4b1-assert'
/**
 * c20-data-state
 * Explain
 *
 * #Goal:
 * Reminder of the concept and meaning of "application state" in the context of building the front-end.
 * Getting to know the immer library offering a very interesting API for data modification without mutating it.
 */

// The state of data in our application can be defined as a certain information resource
// - around which our web app works at all.

// For example, if we were making a front-end showing a shopping list,
// Our "global" data state could look like this:

const state = {
	shoppingList: [
		{name: 'carrots', amount: '2kg', value: 10}
	]
}

// The whole "problem" with the state of the data is its change.  z
// Certainly the presentation of "Graphic representation" - what we see above
// Using framework + components, or even pure HTML - it will be fairly simple for everyone.
// It's just a matter of "wrapping" this data into some GUI

// Changing this data over time, however, is associated with the need to update:
// Make sure (which will be relatively easy) and inform all interested e.g. components
// Every component that uses this data must be updated in some way.

// Consider an example where we add an item to a shopping list:

function mutableAddProduct(product = {}) {
	state.shoppingList.push(product);
	return state;
}

// In the example above, we mutate the data
// This can be very costly in terms of updating and detecting state changes
// What we discussed in c10.

// Non-muting data would look like this:

function addProduct(product = {}) {
	// state.shoppingList.push(product);
	return {
		...state,
		shoppingList: [
			...state.shoppingList,
			product
		]
	};
}

// With such a small data structure - we have a lot of complex writing,
// Every change as a reference - we have to copy it.
// `addProduct` does this as shallow copy.

// Immer library tasks can be compared to part of Redux reducer tasks.
// We have a defined state tree and want to update part of it - returned as a new (not mutated) part.

// Let's see how this state update - it will look like in Immer:
function immerAddProduct(product = {}) {
	return produce(state, (draft) => {
		draft.shoppingList.push(product);
	});
}

// Wait a minute - this looks just like we are mutating the `shoppingList` array
// But note that the tests done below show something else:

const previousState = state;

const nextState = immerAddProduct({ name: 'Lego', amount: '1kg', value: 200})

assertThat(
	'Previous state suppose to have 1 product',
	expect => expect(previousState.shoppingList.length).toBe(1)
)  //=
assertThat(
	'Next state suppose to have 2 products',
	expect => expect(nextState.shoppingList.length).toBe(2)
)  //=
assertThat(
	'We should be able to detect state change somehow!',
	expect => expect(previousState).notToBe(nextState)
)  //=
assertThat(
	'We suppose to have new shoppingList !',
	expect => expect(previousState.shoppingList).notToBe(nextState.shoppingList)
)  //=
assertThat(
	'both shoppingList should have same values',
	expect => expect(previousState.shoppingList).notToBe(nextState.shoppingList)
)  //=

// All "Magic" - what happens inside "produce".
// What we pass on to it is the current status, and in the callback we get the so-called draft.
// Best of all - we can proceed freely with the draft, even mutate.
// Perform all known methods - trying to determine the new state.

// Immer will finally return us a new state, but as a cloned structure:

console.log(nextState)

// Moreover, it will be secured as "read only" by default:
// Uncomment the line below to find out:
// nextState.shoppingList = []


// This makes it possible for us to use known methods inside `produce` without fear to get a new state at the end as a new object
// Also note that we can keep track of what has changed because the data in the array - which we haven't modified
// remain intact:
console.log(previousState === nextState)
console.log(previousState.shoppingList === nextState.shoppingList)
// added a new object, but the old one remains intact:
console.log(previousState.shoppingList[0] === nextState.shoppingList[0])

// Produce can work for state slice as well:
// Together with actions, for example:

const myFruitListState = { fruits: ['bananas'] };

const fruitReducer = produce((draft, action) => {
	switch(action.type) {
		case 'ADD_FRUIT':
			draft.fruits.push(action.payload);
			break;
	}
}, { fruits: [] })

console.log(myFruitListState)
const myNextFruitListState = fruitReducer(myFruitListState, {type: 'ADD_FRUIT', payload: 'cherries'})

// NEXT STATE:
console.log(myNextFruitListState);
// PREVIOUS STATE (remains intact):
console.log(myFruitListState);
// This creates a lot of different interesting ideas:

// Immer can, for example, be combined with Redux - to simplify creation of reducers:
// https://immerjs.github.io/immer/docs/example-reducer
