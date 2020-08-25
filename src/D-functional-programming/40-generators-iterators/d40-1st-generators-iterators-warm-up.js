import { assertThat } from '../../j4b1-assert'
/**
 * d40-generators-iterators
 * Warm up
 *
 * * Rules:
 * - You can change the code where it is clearly written that you can do so or where there are no rules preventing it.
 */

const splitter = [];
for(const x of 'Latte') {
	// Code can be written only inside this block:
}
// #Rule:
// You must not change this code:
assertThat(
	'splitter should collect the word Latte - after join',
	expect => expect(splitter.join('')).toBe('Latte')
)  //=

// You cannot change the value in `numeric`
const numeric = [[1, 2], [3, 4]];
// You can change assignments in num1
let num1 = '';
let num2 = '';
// the loop must stay and iterate over `numeric`, but you can modify its contents
for(const placeholder of numeric) {
	num1 += placeholder[0];
	num2 += placeholder[1];
}
// #Rule:
// You must not change this code:
assertThat(
	'num1 suppose to equal "13"',
	expect => expect(num1).toBe('13')
)  //=
assertThat(
	'num2 suppose to equal "24"',
	expect => expect(num2).toBe('24')
)  //=
// ------------------------------

// You can edit this entry
const DYNAMIC_KEY = 'showMeSomeNumbers';

// You cannot add new methods to this class!
// You can edit the method names
class MyIterableConcept {

	['thisIsSimple']() {
		return 'FUN';
	}

	[DYNAMIC_KEY]() {
		// You can write the code here
		return [90, 10, 20]
	}
}

const iterables = new MyIterableConcept();

// #Rule:
// You must not change this code:
assertThat(
	'MyIterableConcept instance should have method thisIsSimple() which return "FUN" ',
	expect => expect(iterables.thisIsSimple()).toBe('FUN')
)  //=
assertThat(
	'MyIterableConcept instance should have method showMeSomeNumbers() which return [90, 10, 20] ',
	expect => expect(iterables.showMeSomeNumbers().toString()).toBe('90,10,20')
)  //=
