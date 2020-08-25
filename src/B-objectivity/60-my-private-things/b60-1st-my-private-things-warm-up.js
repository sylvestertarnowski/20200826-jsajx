import { assertThat } from '../../j4b1-assert'
/**
 * b60-my-private-things
 * Warm up
 *
 * * Rules:
 * You can add a new code
 * Hard mode:
 * - You cannot delete the existing code
 * Easy mode:
 * - You can delete / comment one line of code
 */

const myGreetingObject = {
	_welcomeMessage: 'Hello there',
	name: 'Roy',
	welcome() {
		return `${this._welcomeMessage} ${this.name} !😃`;
	}
}

const welcomeRoy = myGreetingObject.welcome();

myGreetingObject._welcomeMessage = 'Troll'

myGreetingObject.name = 'Moss';
const welcomeMoss = myGreetingObject.welcome();

myGreetingObject.name = 'Jen';
const welcomeJen = myGreetingObject.welcome();

// #Rule:
// You must not change code below:
assertThat(
	'Welcome message for Roy should be like: "Hello there... " ',
	expect => expect(welcomeRoy).toBe('Hello there Roy !😃')
)  //=

assertThat(
	'Welcome message for Moss should be like: "Hello there... " ',
	expect => expect(welcomeMoss).toBe('Hello there Moss !😃')
)  //=

assertThat(
	'Welcome message for Jen should be like: "Hello there... " ',
	expect => expect(welcomeJen).toBe('Hello there Jen !😃')
)  //=
