/**
 * e40-the-event-loop
 * Explain
 *
 * #Goal:
 * An explanation of how JavaScript works. Based on the CALL STACK and Event Loop.
 */

// JavaScript is single-threaded!
// Which in practice means - that he can do one thing at a time.
// This is what the so-called Runtime for JavaScript

// 1. In its interior it has the so-called CALL STACK.
// The stack is the queue LIFO (Last In First Out);
// In practice, this means that the code we execute function by function,
// call after calling - goes to the stack.

// The last thing on top of the stack is done, and then the next thing is executed.

// If: setTimeout and e.g. XHR (Ajax Request) work in the same manner
// Then - the execution of the stack would have to BLOCK!

// SET TIMEOUT enters the stack - waiting for e.g. 5 sec. and yet another code is being executed from the stack ?!
// Anyone who has ever used setTimeout - knows this is not how it works.
// The rest of the code will run almost instantaneously! However, the callback from setTimeout will come to us only after 5 seconds.

// WEB APIs and Event Loop are still missing in this case - inside the Browser

// 2. WEB APIS - functionalities provided by the browser, such as the mentioned:
// Timeouts, AjaxRequests  etc. etc.

// It is thanks to them that calling eg setTimeout - does not "lock" the stack.
// Instead, setTimeout sort of "push to the stack twice".
// 1st time we call setTimeout, it hits the stack but gets immediately collected from the stack via WEB APIs
// This is where the timeout is counted down (e.g. 5 sec) and only the call from Callback is pushed ....

// ... back to the stack?!
// NO.

// If this were the case - the completed timeouts and other things - would reappear unexpectedly,
// HERE the last pieces of the puzzle appear:

// 3. The callback queue + EVENT LOOP..
// Callback that comes back from setTimeout - goes to the end of the callback queue.
// This queue - receives "calls" from the browser WEB APIs.

// This is where the Event Loop comes in - it has one simple task:

// - check if the stack is empty
// - if empty - put 1 callback from the queue to the stack.
// The event loop will continue to do so until all jobs are out of the queue.

// To better understand the whole process, it is useful to know the 2 types of tasks in JS below
// and the tool: Loupe:
// http://latentflip.com/loupe



// Additionally, in JavaScript we can distinguish 2 types of "tasks".
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#Tasks_vs_microtasks

// 1 - TASKS:
// Task is the standard JS code that will go to the call stack - instruction by instruction
// Standard synchronously written code,
// Callbacks,
// or timeout / interval
// See the order in which this code was called:

console.log('Hello')
setTimeout(() => console.log('I will execute in 0ms !'));
console.log('Hello Again')

// setTimeout even though it is written as the 2nd instruction, will be executed last
// this is because its call has been "sent" to the WebAPI
// Callback from WEB API - came immediately, because we didn't set the time,
// setTimeout returns in ~ 0ms

// But why don't we see him right away ?!
// Because callback from WEB API is queued ...
// And wait for the call stack to be empty before being called again (with result callback)

// HOWEVER! Wait, there's another queue - the tasks of which have priority:
// Microtasks queue
// So before we see the return from setTimeout - the items queued below will appear:

// 2 - MICROTASKS:
// Microtasks have their own queue - which takes precedence - if the call stack is empty
// This queue is used by:
// Promises and e.g. the so-called MutationObserver and the call to `process.nextTick ()` in Node.js
//

queueMicrotask(() => {
	console.log('1. Come on..., make something before any timeout!')
})
Promise.resolve('').then(() => {
	console.log('2. Come on..., make something before any timeout!')
})

// If you uncomment the code below, it will take precedence in the micro task call queue
// this command is only possible (present) in Node.js
// other JS Environments have `queueMicrotask` available

process.nextTick(() => {
	console.log('0. Next TICK 😎')
})


// 3 - RENDERING QUEUE
// In the browser we also have a queue: rendering, which again takes precedence over tasks,
// Which callbacks come back from the WEB API - but can only be executed WHEN the microtasks queue is empty.

// We have a function in the browser:
/*
requestAnimationFrame(() => {
	console.log('render me !')
})
*/

// it will put a callback on the render queue and execute it as soon as call stack will be empty,
// and the microtask queue will be empty.

// In this case try to guess what the order of calls in this code below will be
// then paste it into the browser console and check - if you are right!
/*
		console.log('[] start');
		setTimeout(() => console.log('[] setTimeout 0'));
		requestAnimationFrame(() => console.log('[] requestAnimationFrame'));
		Promise.resolve().then(() => console.log('[] Promise.resolve'));
		console.log('[] end');
*/


// FUN FACTS:

// Given that our job queue at first (after unload the microtask queue) - will take the setTimeout callbacks,
// adding another one will put it at the very end of our execution:

/*
		setTimeout(() => {
			console.log('I am on the end...')
		})
 */

// but we have a callback function that allows us to take 1st place in the queue before setTimeout callbacks:

/*
		setImmediate(() => {
			console.log('===> Before 0ms timeouts! 😎')
		})
 */
// WARNING:
// setImmediate - not a standard, we won't find it e.g. in Chrome, (in browsers it's probably only in IE)
// Exists in Node.js though
// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#setimmediate-vs-settimeout

// A more detailed description of the Event Loop and tasks in Node.js:
// https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#event-loop-explained

console.log('------------------ Program ENDS ?!')
