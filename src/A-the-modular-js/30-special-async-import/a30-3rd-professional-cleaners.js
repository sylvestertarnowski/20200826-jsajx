/**
 * Copyright © Express Coffee Company
 *
 * Cleaning module v.2 ® 2020
* */

// WARNING: this function is mutating data !
export function emptyGroundsContainer(coffeeMachine) {
	Object.assign(coffeeMachine, {grounds: 0});
}
