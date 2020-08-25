/**
 * a30-special-async-import
 * Explain
 *
 * #Goal:
 * Learning about a new way to import scripts asynchronously.
 */

// EcmaScript 2020 - ES11, introduces a new way to import things

// Import written as a function: import ('./from/path/here');
// returns us `Promise` - in this way,
// we have the option to solve both cases:
// .then -> if we actually loaded the module
// .catch -> if something went wrong (e.g. the module is missing from the path)


// Simple Usage Example:
import('./a30-explain/a30-sample-module-1')
	.then((m) => {
		m.strong() //=
	})

// Use when the module has default export:
import('./a30-explain/a30-sample-module-2')
	.then((m) => {
		m.default.coffee() //=
	})


// Since this is promises, we can use Promise.all !!!
const mapNumberToPath = n => './a30-explain/a30-sample-module-' + n;
const mapPathToImport = path => import(path);
const promises = [1, 2].map(mapNumberToPath).map(mapPathToImport);

Promise.all(promises).then((modules) => {
	    // with destructuring:
		const [ A, B ] = modules;
		A.strong() //=
		B.default.coffee() //=
	}
)

Promise.all(promises).then((modules) => {
		// with stronger destructuring:
		const [ {strong}, {default: {coffee}} ] = modules;
		strong() //=
		coffee() //=
	}
)
