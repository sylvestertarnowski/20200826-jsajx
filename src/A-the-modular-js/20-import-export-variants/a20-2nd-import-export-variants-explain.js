/**
 * a20-import-export-variants
 * Explain
 *
 * #Goal:
 * Understanding how the import / export syntax works - along with use of the so-called named and default exports.
 * Techniques of re-exporting content from several files and the so-called namespaced imports
 * */


// The import / export syntax is introduced in 2015. With the ES6 version of JS

// To make the browser treat scripts "modular" allowing them to import and export items from each other,
// we need to add to the <script> tag in HTML: the target="module" attribute.
// Check out an example: ./a20-2nd-import-export-variants-module.html

// There are 3 main types of exporting and importing in ES6 modules:

// 1) Default export/import:
/*
	Exporter:
    \ - mocha-coffee.js -
    
		const coffeeName = 'Mocha';
		export default coffeeName;

	Importer:
	\ ---
		import coffee from './mocha-coffee.js';
		console.log('I just like my', coffee);

// The importer has to decide here what will be the name of the variable / constant - which he is importing.
// It is his decision - over which the exporter has no influence!
*/

// 2) Named export/import:
/*
	Exporter:
    \ - mocha-coffee.js -
    
		export const coffeeName = 'Mocha';

	Importer:
	\ ---
		import { coffeeName } from './mocha-coffee.js';
		console.log('I just like my', coffeeName);

// The importer must import a specific variable / constant name - which is given by the exporter.
// It cannot affect its name, all it can do is "nickname it" differently to avoid name collisions
// However, it must always use the specific name (therefore NAMED) of the thing it is importing.

*/

// 3) Namespace import:
/*
	Exporter:
    \ - mocha-coffee-namespaced.js -
    
		export const MOCHA = 'Mocha';
		export const ESPRESSO = 'Espresso';

	Importer:
	\ ---
		import * as coffees from './mocha-coffee-namespaced.js';
		console.log('I just like my', coffees.MOCHA);
		console.log('I just like my', coffees.default);

// The importer collects everything that is exported in the Exporter
// This creates the `coffees` namespace to contain all the exported items
// `coffees` behaves like a JS object having property names such as given exported names
*/


// additionally, we can nickname the imports if we have a name collision, for example::
/*
	Importer:
	\ ---
		import { coffeeName } from './mocha-coffee-named';
		import { coffeeName as otherCoffee } from './other-mocha-coffee-named';
*/

// Exporter, only allowed to export one default thing!
// Can export both default and zero / one / several named exports, though

// If there is default + one named, the import looks like this:
/*
	Importer:
	\ ---
		import coffee, { MOCHA, ESPRESSO } from './mocha-coffee-namespaced';
*/
