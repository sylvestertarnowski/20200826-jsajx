/**
 * g10-using-symbols
 * Challenge
 *
 * It's us again, your brave team from the basement.
 *
 * This time we do not have tests - because we have no idea what to expect.
 * Help us decrypt the message, please.
 */

const keys = {
	0: Symbol(),
	1: Symbol(),
	2: Symbol(),
	3: Symbol(),
	4: Symbol(),
	5: Symbol(),
	6: Symbol(),
	7: Symbol(),
	8: Symbol(),
	9: Symbol(),
	10: Symbol(),
	11: Symbol(),
	12: Symbol(),
	13: Symbol(),
	14: Symbol()
}
// Easier implementation:
// const keys = new Array(15).fill('').map(() => Symbol());

const encodedMessage = {
	[keys[6]]: 32,
	[keys[11]]: 32,
	[keys[14]]: 33,
	[keys[3]]: 97,
	[keys[8]]: 101,
	[keys[5]]: 101,
	[keys[2]]: 101,
	[keys[13]]: 101,
	[keys[7]]: 104,
	[keys[1]]: 108,
	[keys[9]]: 108,
	[keys[12]]: 109,
	[keys[0]]: 80,
	[keys[10]]: 112,
	[keys[4]]: 115,
}

const decode = (key) => String.fromCharCode(encodedMessage[key]);
const decodedMessage = Object.values(keys).map(decode);
console.log(decodedMessage.join(''))
