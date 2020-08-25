/**
 * e20-timer-events
 * Explain
 *
 * #Goal:
 * Access to timers in JavaScript and related API.
 * Calling a given function once after a specific, set amount of time
 * Using intervals - calling the same function over again as the specified time lapse
 */

// The easiest way to postpone something is with the global function `setTimeout()`

// Its calling looks like this:
setTimeout(() => {
	console.log('Hello after 0ms')
})

// The default call is 0ms - that's almost zero execution time :)
// By giving the 2nd argument - you can declare a greater time to elapse - in milliseconds
// 1000ms = 1 second
setTimeout(() => {
	console.log('Hello after 0.5 second')
}, 500)

// function that we pass as callback (1 argument) - will be executed exactly 1 time,
// after the time specified in the 2nd argument.

// What if we changed our mind?
// So something is to be done in 5 seconds. and yet right after calling - we change our mind
// this is helped by the additional global function `clearTimeout()`
// relying on the number (ID) returned when creating the timer.

// Example of "you change your mind":

const myTimerID = setTimeout(() => {
	console.log('Gosh... I will never fire');
}, 5000)

clearTimeout(myTimerID);

// In this case, the passed callback - will never be executed.
// We can easily imagine a situation where the timer will not be needed and we have to "release" it
// This is a situation in which, for example, we no longer render the component on the page and we have started the countdown
// component gets a lifecycle call "destroy() / unmount() etc." and we want to get rid of the timer
// because calling this callback in such a system - would cause the so-called Memory Leak (topic will be extended later).


// In JavaScript we can also run the so-called interval, then - the given function will be called,
// every specified amount of time.

// In conjunction with outerScope + API - we can restrict this so that in this example it does not run indefinitely:

// Example of use:
// In this example, 1 second is 200ms (instead of 1000) (to speed results up).

let seconds = 1;
const myIntervalID = setInterval(() => {
	console.log(seconds++);
	// our little UTIL:
	if(seconds === 6) {
		clearInterval(myIntervalID);
	}
}, 200)


