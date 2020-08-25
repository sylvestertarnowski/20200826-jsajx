import { assertThat } from '../../j4b1-assert'
/**
 * d30-weak-collections
 * Challenge
 *
 * The company's canteen serves meals upon a special coupon shown.
 * Unfortunately, he has no control over who has picked up how many meals
 *
 * Clever Roy by collecting a few extra coupons from his friends on the 7th floor,
 * queues several times (going to the end of the queue)
 * picks up lunch several times in this way.
 *
 * Taking into account the fact that we cannot change the Person class,
 * and add additional "fields" to the instance - in other words: people are untouchable
 * we also cannot change the way meals are served,
 * we can only add additional verification methods.
 *
 * Suggest costless from the point of view of memory - solution to the problem
 *
 * * Rules:
 * - You cannot delete the existing code
 * - You cannot add fields and methods to the class, and you cannot modify instances
 */

class Person {
	mealsCollected = 0;

	collectMeal() {
		this.mealsCollected++;
	}
}
const moss = new Person();
const roy = new Person();
let canteenQueue = [roy, new Person(), roy, moss, new Person(), roy, new Person(), roy];
;(function serveMeals() {
	// #Rule:
	// Code can be written only inside this block.
	// You can only add / insert new
	canteenQueue.forEach(person => {
		person.collectMeal();
	})
})();
canteenQueue = [];

// #Rule:
// You must not change code below:
assertThat(
	'Moss should collect just one meal',
	expect => expect(moss.mealsCollected).toBe(1)
)  //=

assertThat(
	'Roy should collect just one meal',
	expect => expect(roy.mealsCollected).toBe(1)
)  //=
