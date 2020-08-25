/**
 * e30-promise-to-escape-from-callback
 * Explain
 *
 * #Goal:
 * Getting to know one of the best ideas in the world of JS - Promise.
 * Since each async action can happen:
 * - success [resolve]
 * - fail :) [reject]
 * We get an object - which allows us to handle these two states
 * Additionally, everything wrapped in a Promise can be either synchronous or asynchronous
 *
 */

// Recall the callback:
function makeMeACoffee(serveCoffee) {
	// wait 200ms
	setTimeout(() => {
		serveCoffee('Mocha')
	}, 200)
}

makeMeACoffee((myCoffee) => {
	console.log(myCoffee)
})


// In this case - it's called "Happy path".
// 1) passing a callback
// 2) getting a coffee

// I know that in the real world - not always everything is so simple ...
// Sometimes - there will be no coffee, something will not work on the way or other problems will happen ...

// Generally - callback works well if:
// a) It can always be executed (e.g. for the DOM event - click on the button)
// b) Several asynchronous / synchronous operations do not follow each other - one after the other (where they depend on each other)


// Attempt to apply callbacks to asynchronous operations that might work - or return an error,
// leads us to such constructions:

function makeAjaxCall(url, callbackFn) {
	// OR:
	callbackFn('resolved', null);
	// OR:
	// callbackFn(null, new Error('reject'));
}

// Example of callback hell:
makeAjaxCall('https://first', (data, err) => {
	if(err) {
		console.log('error 😐', err)
		return;
	}
	makeAjaxCall('https://second' + data.url, (data, err) => {
		if(err) {
			console.log('error 😐', err)
			return;
		}
		makeAjaxCall('https://third' + data.url, (data, err) => {
			if(err) {
				console.log('error 😐', err)
				return;
			}
			console.log('THIS IS MADNESS !!!')
		})
	})
})

// Promise - TO THE RESCUE!
// Can you solve it more simply - yes.
// That's what promises are made for. Their task is to handle 2 states: resolve, reject
// But we use 2 methods for this: `.then()` and `.catch()` and pass the callback functions to them
// Looks like like - the same, but `then` and `catch` - also always return Promise - even if we don't return anything,
// Or we will return synchronous data.

// Let's see the simplest example of the usage:

const provider = Promise.resolve('hello');

// Receiving the promise:
// CONSUMER:
provider.then((message) => {
	console.log(message)
})

// all the beauty is in this feature:
provider
	.then((message) => {
		console.log(message)
		return 1234;
	})
	.then((num) => {
		console.log(num);
		return Promise.resolve('other promise');
	})
	.then((msg) => {
		console.log(msg);
	})

// we can "chain" `then` execution:
// Promise.resolve().then().then().then()

// see how this simplifies the callback hell:

function makeAjaxCallAsPromise(url) {
	// OR:
	return Promise.resolve('resolved');
	// OR:
	// return Promise.reject(new Error('reject'));
}

makeAjaxCallAsPromise('https://first')
	.then((data) => {
		return makeAjaxCallAsPromise('https://second' + data.url);
	})
	.then((data) => {
		return makeAjaxCallAsPromise('https://third' + data.url);
	})
	.then((data) => {
		console.log('THIS IS COOLNESS !!!', data);
	})
	.catch((err) => {
		console.log('error 😐', err)
	})

// With promise - we have 2 options:

// stan: resolved
// stan: rejected

// These two states are mutually exclusive - which in practice means that a Promise that is rejected - cannot be
// resolved - and vice versa! We also cannot have a Promise - which is both resolved and rejected.

// The full API to create a Promise looks like this:

const promiseProvider = new Promise((resolve, reject) => {
	// do something synchronously or asynchronously
	// because we have access to resolve and reject as callbacks:
	setTimeout(() => {
		resolve('OK')
		// OR:
		// reject(new Error('No way !'))
	}, 200)
})


// Note that the above notation can be resolved either immediately (synchronously) or asynchronously
// For simplicity - Promise has 2 static methods, if we want a Promise that is immediately resolved or rejected.
// See how it works in practice.

// Instead of writing:
new Promise((resolve => {
	resolve('Hello')
}))
// can be shortly written:
Promise.resolve('Hello')

// Similarly with REJECT:
// Instead of writing:
new Promise(((resolve, reject) => {
	reject('Oh no !')
}))
// can be shortly written:
Promise.reject('Oh no !')

// THIS in combination with the fact that we can chain `.then()` and in subsequent calls to `.then()`
// provide the data either as another Promise - or any other objects that will be wrapped anyway,
// as Promise.
// Makes - we can get rid of async call nesting! and simplify them!

// Native Promise - enters the language after 2015
// Today, many JS libraries that rely on asynchronous operations use the Promise API.

// A modern way of handling AJAX queries (fetch) - built into Evergreen Browsers, also works - based on Promise:

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
