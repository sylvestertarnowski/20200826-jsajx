import { assertThat } from '../../j4b1-assert'
/**
 * a30-special-async-import
 * Challenge
 *
 * A new coffee machine has arrived in the office, unfortunately it is only able to make 5 cups.
 * The problem is that the coffee grounds container clogs up too quickly.
 * Unfortunately, no one in the company wants to clean the container manually.
 * Coffee machine supplier - allows you to install a new cleaning module
 * However, there is another problem: it needs to be installed in professional way.
 * Inside the coffee machine!
 *
 * * Rules:
 * - you cannot use the `import` syntax in the main scope of this file
 * - you cannot refer to the `.grounds` field yourself and overwrite it
 * - you need to use external provider "emptyGroundsContainer" - see: './a30-3rd-professional-cleaners'
 * - your code can only be written in a designated place in the middle of the "makeACoffee" method
 */


function coffeeMachine() {
	const GROUNDS_CONTAINER_CAPACITY = 5;
	return {
		grounds: 0,
		makeACoffee(coffeeCupCallback) {
			if(this.grounds === GROUNDS_CONTAINER_CAPACITY) {
				// #Rule:
				// Code can only be written in this block.
				coffeeCupCallback('Sorry.. coffee cannot be made, please empty the grounds container.')
			} else {
				this.grounds++;
				coffeeCupCallback('Coffee served!')
			}
		}
	}
}

// #Rule:
// You must not change code below:
const machine = coffeeMachine();
const collector = [];
for(let x = 1; x <= 5;x++) {
	machine.makeACoffee(r => collector.push(r))
}
assertThat(
	'5 coffee cups should be served',
	expect => expect(collector.every(value => value === 'Coffee served!')).toBe(true)
) //=

let the6thCup;
machine.makeACoffee(r => the6thCup = r)
assertThat(
	'6th cup should not be served - we need empty the grounds container',
	expect => expect(the6thCup).toBe('Sorry.. coffee cannot be made, please empty the grounds container.')
) //=

// A guarantee detector built by the company, which checks whether the module has been installed correctly:
assertThat(
	'emptyGroundsContainer should not be defined in this scope',
	expect => expect.toThrow(() => emptyGroundsContainer).message('emptyGroundsContainer is not defined')
) //=

// OTHER customers:
setTimeout(() => {
	const collector = [];
	machine.makeACoffee(coffeeCup => collector.push(coffeeCup))
	machine.makeACoffee(coffeeCup => collector.push(coffeeCup))
	assertThat(
		'After a while, next 2 cups should be served as well !',
		expect => expect(collector.toString()).toBe('Coffee served!,Coffee served!')
	) //=
}, 100)


