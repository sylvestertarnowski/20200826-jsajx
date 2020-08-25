import { assertThat, fireCount } from '../../j4b1-assert'
/**
 * e20-timer-events
 * Challenge
 *
 * We need a factory with functionality that allows us to define
 * for what time the function will be called and how many times it will happen.
 *
 * for example:
 * runAfter(() => {}, {delay: 1000, interval: 2000, times: 3});
 *
 * Call the function in 1 second, every 2 seconds - only 3 times.
 * After that, it won't work anymore.
 *
 * * Rules:
 * - change and add code only in the middle of the `runAfter` implementation
 */

function runAfter( callback = () => {}, {delay, interval, times}) {
	// #Rule:
	// Code can be written and change only inside this block.

}

// #Rule:
// You must not change code below:
const my1stCollector = [];
const my1stCallback = () => {
	fireCount(my1stCallback);
	my1stCollector.push(1);
}
runAfter( my1stCallback, {delay: 100, interval: 200, times: 5} )

setTimeout(() => {
	assertThat(
		'my1stCollector should still collect 1 number 1 after 315ms',
		expect => expect(my1stCollector).toEqual([1])
	)  //=
	assertThat(
		'my1stCallback should be fired 1 times after 315ms',
		expect => expect(my1stCallback.fired).toEqual(1)
	)  //=
}, 315)

setTimeout(() => {
	assertThat(
		'my1stCollector should collect 5 numbers 1',
		expect => expect(my1stCollector).toEqual([1,1,1,1,1])
	)  //=
	assertThat(
		'my1stCallback should be fired 5 times',
		expect => expect(my1stCallback.fired).toEqual(5)
	)  //=
}, 5 * 200 + 600)

