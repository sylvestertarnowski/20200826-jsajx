import { assertThat } from '../../j4b1-assert'
/**
 * b50-setters-getters
 * Warm up
 *
 * * Rules:
 * - You cannot change the code anywhere except in the instance - inside `person`
 */
const person = {
	// #Rule:
	// Code can be written only inside this block.
}

// #Rule:
// You must not change code below:
assertThat(
	'Person name + lastName should be Janusz Kowalsky',
	expect => expect([person.name, person.lastName].join(' ')).toBe('Janusz Kowalsky')
)  //=
assertThat(
	'Person email should be janusz.kowalsky@workload.com',
	expect => expect(person.email).toBe('janusz.kowalsky@workload.com')
)  //=
// Po zmianie imienia i nazwiska powinien zmienić się email:
person.name = 'Grazyna';
person.lastName = 'Nowak';
assertThat(
	'Person email from now - should be grazyna.nowak@workload.com',
	expect => expect(person.email).toBe('grazyna.nowak@workload.com')
)  //=
