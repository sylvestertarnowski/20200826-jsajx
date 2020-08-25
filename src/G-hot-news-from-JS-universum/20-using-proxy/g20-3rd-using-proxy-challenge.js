import { assertThat } from '../../j4b1-assert'
/**
 * g20-using-proxy
 * Challenge
 *
 * We want one funny screaming object that adds a "!" Sign to each property value.
 * We don't want anyone to remove properties from it!
 *
 * * Rules:
 * - The code can only be changed inside the handler passed to the proxy
 */

const shouterObject = new Proxy( {  }, {
  // #Rule:
	// Code can be written only inside this block.

})

// #Rule:
// You must not change code below:

shouterObject.name = 'Michal';
shouterObject.lastName = 'Kowalsky';
shouterObject.age = 33;
shouterObject.nothing = 'will-stay'

delete shouterObject.nothing;

assertThat(
	'Should have name shouted',
	expect => expect(shouterObject.name).toBe('Michal!')
)  //=
assertThat(
	'Should have lastName shouted',
	expect => expect(shouterObject.lastName).toBe('Kowalsky!')
)  //=
assertThat(
	'Nothing should not be deleted',
	expect => expect(shouterObject.nothing).toBe('will-stay!')
)  //=
assertThat(
	'Should have all properties shouted',
	expect => expect(shouterObject).toEqual({ name: 'Michal!', lastName: 'Kowalsky!', age: '33!', nothing: 'will-stay!' })
)  //=
