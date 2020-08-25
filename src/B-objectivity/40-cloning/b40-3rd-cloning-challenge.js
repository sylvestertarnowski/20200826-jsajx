import { assertThat } from '../../j4b1-assert'
/**
 * b40-cloning
 * Challenge
 *
 * The problem with the state of the data!
 *
 * We have downloaded a new "superLib" for JavaScript in the company - for state data management,
 * It supposedly has "Detection watchers", so according to the documentation,
 * We do this:
 * 1. We prepare actions
 * 2. We send the actions as `update`
 *
 * Expected behavior:
 * Should bring us a new state in the `.subscribe` callback !!
 * But it doesn't start - and we don't know why?! So we get components in the DOM not re-rendering :((
 *
 * We want these 2 actions to work:
 * 1. Add "Robusta" to the coffee list - it should appear on the status tree
 * 2. Make one coffee - then 150ml of water and 50g of coffee are going down + set the "WORKING" status on the machine
 *
 * After 3 days of debugging - we know one thing.
 * We are preparing all these "ACTIONS" wrong.
 * But we don't know why - because everything should work; /
 *
 * HELP! Make callbacks with `.subscribe()` work.
 * Correct both cases
 *
 * * Rules:
 * - Only change the code within "PERFORM the ACTION" area.
 */

// #Rule:
// Mustn't change code in changeDetectionWatcher - it's a separate library!
// Cannot change anything below up to "PERFORM the ACTION" (note: there are 2 such places)
function changeDetectionWatcher(state) {

	let listener = (info, currentState) => {};

	return {
		update(newState, updateKey) {
			// Detection watchers:
			if(state[updateKey] && newState !== state[updateKey]){
				state[updateKey] = newState;
				listener(`${updateKey} has changed`, state)
			}
		},
		subscribe(callbackFn) {
			listener = callbackFn;
		}
	}
}

// Initial data state:
const stateTree = {
	coffeeBeans: ['Arabica', 'Liberica'],
	coffeeMachine: { water: 200, coffee: 300, status: 'AWAITING' }
}

// Initialize the data in the library
const stateWatch = changeDetectionWatcher(stateTree);

// 1) Add new kind of coffee:
// PERFORM the ACTION: Add new type of coffee:
// #Rule:
// Code can be written / changed here
const coffeeBeans = stateTree.coffeeBeans;
coffeeBeans.push('Robusta');
// ----

// #Rule:
// You must not change code below:
// WATCHER + result:
let myCoffees = [];
stateWatch.subscribe((info, currentState) => {
	console.log(info);
	myCoffees = currentState.coffeeBeans;
	// Update the DOM tree - there's a change!;
})
stateWatch.update(coffeeBeans, 'coffeeBeans')

// #Rule:
// You cannot change the assertion below:
assertThat(
	'New kind of coffee beans should be added to the state: +"Robusta"',
	expect => expect(myCoffees.toString()).toBe('Arabica,Liberica,Robusta')
)  //=

// #2 !! -----------------------------------------------------------------------------

// 2) Make a coffee:
// PERFORM the ACTION: Make a coffee
// #Rule:
// Code can be written / changed here
const coffeeMachine = stateTree.coffeeMachine;
coffeeMachine.status = 'WORKING';
coffeeMachine.water -= 150;
coffeeMachine.coffee -= 50;
// ------------

// #Rule:
// You must not change code below:
// WATCHER + result:
let myCoffeeMachine = {};
stateWatch.subscribe((info, currentState) => {
	console.log(info);
	myCoffeeMachine = currentState.coffeeMachine;
	// Update the DOM tree - there's a change!;
})
stateWatch.update(coffeeMachine, 'coffeeMachine')

// #Rule:
// You cannot change the assertion below:
assertThat(
	'Making a coffee will result Coffee Machine in status: WORKING',
	expect => expect(myCoffeeMachine.status).toBe('WORKING')
)  //=
assertThat(
	'Making a coffee will decrease amount of coffee in machine by 50g',
	expect => expect(myCoffeeMachine.coffee).toBe(250)
)  //=
assertThat(
	'Making a coffee will decrease amount of water in machine by 150ml',
	expect => expect(myCoffeeMachine.water).toBe(50)
)  //=
