import { assertThat } from '../../j4b1-assert'
import { mySecretConstant } from './a20-1st-helper'
/**
 * a20-import-export-variants
 * Warm up
 *
 * Fix the code using the ./a20-helper.js file
 *
 * * Rules:
 * - you mustn't edit existing code
 * - you can delete the existing line of code
 * - you need to use the ./a20-1st-helper file
 * - you can add code in both files - but excluding keywords: let, const and string entries ""
 */


// #Rule:
// You must not change code below:
assertThat(
	'it should have secret value from other ./a20-1st-helper file',
	expect => expect(mySecretConstant).toBe('HELLO $ecr3t...')
)  //=
