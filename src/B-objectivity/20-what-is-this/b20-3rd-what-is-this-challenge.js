import { assertThat } from '../../j4b1-assert'
/**
 * b20-what-is-this
 * Challenge
 *
 * Something is not going well for us, the whole "new super JS framework" that we were recommended on the web recently
 * It is such a hype and we cannot cope with the usual "onClick" on the button 😐.
 * Will you help?
 *
 * * Rules:
 * - You cannot delete the existing code
 * - You can only add a code
 * - You cannot change the onClick assignment from line: 29
 * - You can add code in ShowDepartmentButton
 */

class ShowDepartmentButton {

	name = 'IT Department'

	printMyName() {
		return this.name;
	}

	render() {
		return {
			type: 'button',
			name: 'Gotcha !',
      onClick: this.printMyName,
			innerHTML: 'Show your department'
		}
	}
}


// #Rule:
// You must not change code below:
const myComponent = new ShowDepartmentButton();
const renderedComponent = myComponent.render();

assertThat(
	'renderedComponent should be a button',
	expect => expect(renderedComponent.type).toBe('button')
)  //=
assertThat(
	'renderedComponent should have onCLick handler attached',
	expect => expect(typeof renderedComponent.onClick).toBe('function')
)  //=
assertThat(
	'renderedComponent when Clicked should show name of the Department',
	expect => expect(renderedComponent.onClick()).toBe('IT Department')
)  //=
