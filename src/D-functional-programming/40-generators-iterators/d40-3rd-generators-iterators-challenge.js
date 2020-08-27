import { assertThat } from '../../j4b1-assert'
/**
 * d40-generators-iterators
 * Challenge
 *
 * * Rules:
 * - Write your code in the GuestList class
 * - At the right moment of implementation, uncomment the block with for loop
 */

class GuestList {

	signGuest(name, lastName) {
        
    }
}

// #Rule:
// You must not change code below:
const myGuests = new GuestList();

myGuests.signGuest('Jane', 'Doe');
myGuests.signGuest('Joe', 'Doe');
myGuests.signGuest('Jan', 'Doe');
myGuests.signGuest('Janina', 'Doe');

const collector = [];
// uncomment the block below when some of solution will be implemented:
// for(const guestName of myGuests) {
// 	collector.push(guestName);
// }

// #Rule:
// You must not change code below:
assertThat(
	'should have 4 guest on myGuests GuestList',
	expect => expect(myGuests.guests.length).toBe(4)
)  //=
assertThat(
	'second guest should be Joe',
	expect => expect(myGuests.guests[1]).toEqual( {name: 'Joe', lastName: 'Doe'})
)  //=
assertThat(
	'collector should have all the names from GuestList',
	expect => expect(collector).toEqual(['Jane','Joe','Jan','Janina'])
)  //=
