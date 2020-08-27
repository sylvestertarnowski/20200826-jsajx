import { assertThat } from '../../j4b1-assert'
/**
 * d10-filter-map-reduce
 * Warm up
 *
 * Case ChAnGe!
 *
 * * Rules:
 * - Add the missing methods
 * - When transforming data, try to use functional programming (array methods)
 */

[1, 2, 3, 4].map((n) => n+'!'); //=
[1, 2, 3].map(function(n, idx) {
    console.log(idx)
    return n + '!';
}) //=

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function lowercase(word) {
    return word.toLowerCase();
}

['MANGO', 'cheRry'].map(lowercase).map(capitalize) //=

function kebabCaseToCamelCase(word) {
    return word.split('-').map((w, idx) => idx === 0 ? lowercase(w) : capitalize(w)).join('');
}

function kebabCaseToPascalCase(word) {
    // return word.split('-').map((w) => capitalize(w)).join('');
    return word.split('-').map(capitalize).join('');
}

function kebabCaseToSnakeCase(word) {
    // return word.replace( /-/g , '_');
    return word.split('-').map(lowercase).join('_');
}

// #Rule:
// You must not change code below:
assertThat(
	'capitalize > should make first letter to uppercase',
	expect => expect(capitalize('this is it')).toBe('This is it')
)  //=
assertThat(
	'kebabCaseToCamelCase > Should convert string hello-world in to helloWorld',
	expect => expect(kebabCaseToCamelCase('hello-world')).toBe('helloWorld')
)  //=
assertThat(
	'kebabCaseToPascalCase > Should convert string my-super-world in to MySuperWorld',
	expect => expect(kebabCaseToPascalCase('my-super-world')).toBe('MySuperWorld')
)  //=
assertThat(
	'kebabCaseToSnakeCase > Should convert string my-first-python-variable in to my_first_python_variable',
	expect => expect(kebabCaseToSnakeCase('my-first-python-variable')).toBe('my_first_python_variable')
)  //=
