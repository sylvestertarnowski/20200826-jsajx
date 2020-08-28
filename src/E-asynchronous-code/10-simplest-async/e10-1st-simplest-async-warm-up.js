import { assertThat, fireCount } from '../../j4b1-assert'
/**
 * e10-simplest-async
 * Warm up
 *
 * Two people asked for a refund,
 * one of them should get a 2-fold return
 *
 * * Rules:
 * - you mustn't remove the existing code
 * - you mustn't use the `return` keyword
 * - you can modify function parameters
 * - you can add a new code
 */

function getTheRefund(refundFn) {
	const totalRefund = 300;
	fireCount(getTheRefund)
	refundFn(totalRefund);
}

// Person 1
let collectedRefund = 0;
getTheRefund(refundValue => collectedRefund += refundValue)


// Person 2
let collectedTwoRefunds = 0;
getTheRefund(refundValue => collectedTwoRefunds += refundValue)
getTheRefund(refundValue => collectedTwoRefunds += refundValue)

// #Rule:
// You must not change code below:
assertThat(
	'should have 300 on collectedRefund',
	expect => expect(collectedRefund).toBe(300)
)  //=

assertThat(
	'should have 600 on collectedTwoRefunds',
	expect => expect(collectedTwoRefunds).toBe(600)
)  //=

assertThat(
	'function getTheRefund should fire 3 times',
	expect => expect(getTheRefund.fired).toBe(3)
)  //=
