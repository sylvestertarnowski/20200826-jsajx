import { assertThat } from '../../j4b1-assert'
/**
 * b60-my-private-things
 * Challenge
 *
 * Unfortunately, the amount of earnings in our law firm is publicly known.
 * We can not allow this situation to continue.
 *
 * Only upon explicit request of `.getSalaryInfo()` - we should know the earnings.
 * Additionally, there has to be a way - to give your lawyers a raise...
 *
 * * Rules:
 * - Change code only inside `lawyerFactory`
 * - Do not change lawyerFactory parameters - they should stay intact.
 */

     

 
function lawyerFactory(fullName = '', salary = 3000) {
	// #Rule:
    // Code can be written only inside this block.
    // function Lawyer(fullName = '', salary = 3000) {
    //     let _salary = salary;
    //     this.firstName = fullName.split(" ")[0];
    //     this.lastName = fullName.split(" ")[1];
    //     this.makeARise = function (rise) {
    //       _salary += rise;
    //     }
    //     this.getSalaryInfo = function () {
    //       return this.firstName+' earns $' + _salary;
    //     }
    // }
    
    // return new Lawyer(fullName, salary);
    const [firstName, lastName = ''] = fullName.split(' ');
    let _salary = salary;
    return {
        firstName,
        lastName,
        getSalaryInfo() {
            return firstName +' earns $' + _salary;
        },
        makeARise(riseAmount) {
            _salary += riseAmount;
        }
    }
}

// #Rule:
// You must not change code below:
const lawyerHarvey = lawyerFactory('Harvey Specter', 6000);
const lawyerMike = lawyerFactory('Michael Ross');
const lawyerRachel = lawyerFactory('Rachel Zane', 5000);
const lawyerDonna = lawyerFactory('Donna');

lawyerDonna.makeARise(5000)

assertThat(
	'Lawyer should have first and last name (just a warm up)',
	expect => expect(lawyerRachel.firstName + ' ' + lawyerRachel.lastName).toBe('Rachel Zane')
)  //=
assertThat(
	'Lawyer salary not suppose to be reviled in public !',
	expect => expect(lawyerMike.salary).toBe(undefined)
)  //=
assertThat(
	'There should be a way to know how much lawyer earns !',
	expect => expect(lawyerHarvey.getSalaryInfo()).toBe('Harvey earns $6000')
)  //=
assertThat(
	'makeARise should work and rise salary of the lawyer !',
	expect => expect(lawyerDonna.getSalaryInfo()).toBe('Donna earns $8000')
)  //=
