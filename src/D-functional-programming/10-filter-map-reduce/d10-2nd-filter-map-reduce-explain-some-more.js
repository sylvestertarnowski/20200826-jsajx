/**
 * d10-filter-map-reduce
 * Explain
 *
 * #Goal:
 * Functional programming can be used to make your own "pipeline" solutions.
 * Just take a second look at the example from warm up!
 *
 */


function capitalize(word = '') {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function lowerCased(word = '') {
	return word.toLowerCase();
}

/*
function kebabCaseToCamelCase(sentence = '') {
	return sentence.split('-').map((w, i) => i === 0 ? w.toLowerCase() : capitalize(w)).join('')
}

function kebabCaseToSnakeCase(sentence = '') {
	return sentence.split('-').map(lowerCased).join('_')
}

function kebabCaseToPascalCase(sentence = '') {
	return sentence.split('-').map(capitalize).join('')
}
*/

// My operators:
function sentenceToWordSplitByOperator(separator) {
	// return sentence.split(separator);
	return (sentence) => sentence.split(separator);
}

function capitalizeOperator() {
	// return arrayOfData.map(capitalize);
	return (arrayOfData) => arrayOfData.map(capitalize);
}

function lowerCasedOperator() {
	// return arrayOfData.map(lowerCased);
	return (arrayOfData) => arrayOfData.map(lowerCased);
}

function joinOperator(separator) {
	// return arrayOfData.join(separator);
	return (arrayOfData) => arrayOfData.join(separator);
}

function pipeLine(...operators) {
	return (data) => {
		let cache = data;
		operators.forEach((operator) => {
			 cache = operator(cache);
		})
		return cache;
	}
}

// Generic
function applyIfOperator(conditionFn, fnToApply) {
	return (arrayOfData) => arrayOfData.map((...args) => conditionFn(...args) ? fnToApply(args[0]) : args[0]);
}

function isNotFirstElementInMap(element, idx) {
	 return idx > 0;
}

function capitalizeIfNotFirstElement() {
	 return applyIfOperator(isNotFirstElementInMap, capitalize)
}

pipeLine(
	capitalizeOperator(),
	joinOperator('')
)('stefan'.split('') ) //=

pipeLine(
	sentenceToWordSplitByOperator('-'),
	capitalizeIfNotFirstElement(),
	joinOperator('')
)('hello-world-of-tanks') //=

pipeLine(
	sentenceToWordSplitByOperator('-'),
	capitalizeOperator(),
	joinOperator('')
)('hello-world-of-tanks') //=

pipeLine(
	sentenceToWordSplitByOperator('-'),
	lowerCasedOperator(),
	joinOperator('_')
)('hello-world-of-tanks') //=

// Functional programming is great - because (among other things) it allows you to close some logic,
// Prepare it for use in time - only declare it and use it at the right moment (not further specified)
