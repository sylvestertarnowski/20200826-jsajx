/**
 * a10-the-need-of-modularity
 * Explain
 *
 * #Goal:
 * Understand the need to add modular build to JS scripts.
 * The network begins to change from "websites only" to "web pages and applications"
 * In this arrangement, JS gets 'out of breath' - we can treat it with regret as a tool for validating forms
 * Need to deal with a lot of code, with code split / decoupling of particular architecture implementation etc.
 * */

// The way scripts are attached to the .html page has some inconvenience.
// We can't properly break down our code into smaller pieces ... or at least it's almost a miracle doing so...
// The whole problem is inside the way of including scripts. Remind yourself the syntax:
/*
```html

		....
		<script src="../side-script.js"></script>
		<script src="../main-script.js"></script>
		<script>
				var myVariable = 800;
		</script>

		</body>
```
*/
// We have several problems here:
/*
    - if there is a myVariable variable in the `side-script.js` and / or` main-script.js` files, it has just been changed / overwritten.
    - we have access to all variables and functions placed in the highest scope for these files (local scope)
    - all data in files are mixed
    - we are not sure if a given variable already exists in our scope - because it is not known whether the file containing it is still attached to the page, etc. etc.
*/
/*
	#Reminder:
	Remember that in the pre-ES6 native approach (2015) it is not possible to add scripts from inside another script.
    Everything "JS" must be included as <script src=""> in the .html file containing the page.
*/


// Natively, by using Vanilla.js - developers begin to deal with the problem by using 2 main techniques:
// a) Namespace
// b) IIFE - Immediately Invoked Function Expression

// AD. a) Using namespace:
var myCaffeineLib = {
	assets: ['beans', 'milk', 'more beans', 'maple syrup'],
	makeMeCoffee: function () {

	},
	laboratory: {
		newTaste: {},
		makeSample: function() {
			return 'Sample dark coffee'
		}
	}
};
// Now using the new "library" is a matter of accessing the appropriate properties:
myCaffeineLib.laboratory.makeSample(); //=


// AD. b) Using IIFE:
(function(){
	var iAmHermetic = 'some value to print';

	console.log(iAmHermetic);
}())

// Outside of IIFE we can't access `iAmHermetic`:
// console.log(iAmHermetic);


// -----------------------------
// Later - in 2009-2010, new concepts of JavaScript modularity appear:
// c) AMD - Asynchronous Module Definition
// d) CommonJS


// AD. c) AMD:
// The most popular library offering AMD is made by James Burke - require.js
// https://requirejs.org/

// The concept is simple:
// You are using a web page script loader in JS. This loader knows where the scripts are located
// By calling a special function with a callback - we can ask for "dependencies" to our logic


// AD. d) CommonJS:
// Back in 2009, Ryan Dahl released the first version of his idea: CommonJS - where the runtime environment
// taken from Chromium (V8 interpreter) is wrapped in C++ program and "Server Side JavaScript" is created.
// https://nodejs.org/en/

// A tailor-made solution for 2020:
// Currently Node.js is "harnessed" to build the front-end.
// Additionally, solutions such as Bundlers or Babel.js - allow to use ES6 syntax - imports.
// This allows a lot of flexibility. We can use ES6 modules syntax simultaneously - for front-end and back-end.
// Additionally, bundlers have built-in import support from ES6 syntax (they understand this syntax)


// HotNEWS 2020: Deno 🦕
// "A secure runtime for JavaScript and TypeScript."
// Creator of Node.js - Ryan Dahl, started a new project
// https://deno.land/

// At the moment this is more of a "new hype on the web" - than a production solution.
// However, it is worth watching because it is supposed to solve all the mistakes that were made
// when implementing NodeJS and its development.
// In that case - we can expect that the project will adapt quickly - and soon it will be suitable
// for writing production code.
// You can look at it differently: in 2009 NodeJS was "hype" - and you can see where we are today :)

// Still:
// NodeJS - this is the #1 choice for a new front-end and back-end project in JavaScript.

