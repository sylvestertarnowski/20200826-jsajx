import assert from 'assert';

const messages = {
	NOT_IMPLEMENTED: () => '⚡😱 NOT IMPLEMENTED !?',
	PASS: () => '✅ PASS',
	FAILED: (message) => '❌ FAIL 😭 ' + message,
};


function expect(currentValue) {

	function makeRunnable(error, runFn) {
		return {
			[runSymbol]() {
				assert(runFn(), error);
			}
		}
	}

	return {
		toBe( expectedValue) {
			return makeRunnable(
				`current value: ${currentValue} not equal expected: ${expectedValue}`,
				() => currentValue === expectedValue
			)
		},
		notToBe( expectedValue) {
			return makeRunnable(
				`current value: ${currentValue} is the same (===) as expected: ${expectedValue}`,
				() => currentValue !== expectedValue
			)
		},
		toEqual( expectedValue) {
			const currentAsJSON = JSON.stringify(currentValue)
			const expectedAsJSON = JSON.stringify(expectedValue)
			return makeRunnable(
				`current value: ${currentAsJSON} is not equal expected: ${expectedAsJSON}`,
				() => currentAsJSON === expectedAsJSON
			)
		}
	}
}
expect.toThrow = function(fn) {
	let message = 'No error !';
	try {
		fn()
	} catch(e) {
		message = e.message
	}
	return {
		message(check) {
			return expect(message).toBe(check)
		}
	}
}

const runSymbol = Symbol();
export function assertThat( title, pieceOfCode) {
	 try {
	 	  const result = pieceOfCode(expect);

	 	  if(!result[runSymbol]) {
		    return messages.NOT_IMPLEMENTED();
	    }
		  result[runSymbol]();
		 return messages.PASS();
	 } catch (e) {
		 return messages.FAILED(e.message);
	 }
}

export function fireCount(toCountFunction) {
	toCountFunction.fired = (toCountFunction.fired || 0) + 1;
}

// j4b1-assert queueMicrotask Polyfill:
try {
    const $ = queueMicrotask;
} catch (e) {
    const globalObject = globalThis || global || window;
    if(!globalObject.queueMicrotask) {
    	  const promise = Promise.resolve();
        globalObject.queueMicrotask = promise.then.bind(promise);
    }
}
