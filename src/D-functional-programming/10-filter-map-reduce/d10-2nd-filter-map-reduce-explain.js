/**
 * d10-filter-map-reduce
 * Explain
 *
 * #Goal:
 * Reminder of the basic array methods that allow data transformation without mutating it.
 */

// Function programming with the use of array methods is most often used for data transformation.
// The undoubted advantage of the methods: map / filter / reduce - is the ability to "chain" them - combine them
// and executing one by one.

// Mapping
// Transform elements
const mapped = [1,2,3,4,5].map(nr => 'Chapter #' + nr);
console.log(mapped);

// Filtering
// Change the number of elements (narrow down)
const oddNumbers = [1,2,3,4,5].filter(nr => nr % 2);
console.log(oddNumbers);

// "Reduce" elements
// Where map and filter can't reduce might come handy!
const sumOfElements = [1,2,3,4,5].reduce((acc, value) => acc + value);
console.log(sumOfElements);

// Consider the following example:
// Summary of the value of all credit operations on the account:
const cashBalance = [
	{id: 5, cash: 100, type: 'IN'},
	{id: 4, cash: -300, type: 'OUT'},
	{id: 3, cash: -1200, type: 'OUT'},
	{id: 2, cash: 400, type: 'IN'},
	{id: 1, cash: 2000, type: 'IN'},
]

const inCash = cashBalance.filter((operation) => operation.type === 'IN').map(o => o.cash).reduce((a, b) => a + b);
console.log(inCash);

// Using a more functional approach this can be written more clearly:

const operationTypeIn = o => o.type === 'IN';
const pluckCash = o => o.cash;
const sum = (a, b) => a + b;
console.log( cashBalance.filter(operationTypeIn).map(pluckCash).reduce(sum) );

// Now our small helper functions are reusable, we can quickly calculate the current account balance
const currentBalance = cashBalance.map(pluckCash).reduce(sum);
console.log(currentBalance);

// By adding an additional filter - we can calculate the charges:
const operationTypeOut = o => o.type === 'OUT';
console.log( cashBalance.filter(operationTypeOut).map(pluckCash).reduce(sum) );

// The number of examples can be multiplied:
// 1 Count the number of all IN operations:
console.log( cashBalance.filter(operationTypeIn).length )

// 2 Count the number of all OUT operations:
console.log( cashBalance.filter(operationTypeOut).length )

// 3 Restore the account balance after 3rd operation:
const idLowerOrEqual3 = o => o.id <= 3;
console.log( cashBalance.filter(idLowerOrEqual3).map(pluckCash).reduce(sum) )
