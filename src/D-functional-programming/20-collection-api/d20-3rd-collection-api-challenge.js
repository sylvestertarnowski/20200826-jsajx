import { assertThat } from '../../j4b1-assert'
/**
 * d20-collection-api
 * Challenge
 *
 * * Rules:
 * - Code can be written only inside myLittleDB
 */

function myLittleDB() {
	// #Rule:
	// Code can be written only inside this block.
	const myLittleDb = new Map();
	return {
		insertItem(tableName, item) {},
		getAll(tableName) {},
		getItemById(tableName, itemId) {},
		getItem(tableName, queryFn) {},
	}
}

const dbInstance = myLittleDB();

dbInstance.insertItem('coffee', {id:1, name: 'Mocha'})
dbInstance.insertItem('coffee', {id:2, name: 'Espresso'})

dbInstance.insertItem('barista', {id:1, name: 'Maurice', lastName: 'Moss'})
dbInstance.insertItem('barista', {id:2, name: 'Jen', lastName: 'Barber'})
dbInstance.insertItem('barista', {id:3, name: 'Jen', lastName: 'Doe'})

// #Rule:
// You must not change code below:
assertThat(
	'Should have 2 coffees inserted',
	expect => expect(dbInstance.getAll('coffee').length).toBe(2)
)  //=
assertThat(
	'1st coffee should be Mocha',
	expect => expect(dbInstance.getAll('coffee')[0].name).toBe('Mocha')
)  //=

assertThat(
	'Id=1 barista should be Maurice Moss',
	expect => expect(dbInstance.getItemById('barista', 1).lastName).toBe('Moss')
)  //=
assertThat(
	'We should be able to query DB e.g. all barista named "Jen"',
	expect => expect(dbInstance.getItem('barista', b => b.name === 'Jen').length).toBe(2)
)  //=

assertThat(
	'should return null for not existing entry',
	expect => expect(dbInstance.getItemById('barista', 100)).toBe(null)
)  //=
assertThat(
	'should return null for not existing table',
	expect => expect(dbInstance.getAll('some-table')).toBe(null)
)  //=
