import { assertThat } from '../../j4b1-assert'
/**
 * b50-setters-getters
 * Challenge
 *
 * We want to fix our old cuckoo clock in a new postmodern style.
 * We have already built in a new LCD counter with a time divider.
 *
 * However, it is not quite working yet
 * hours, seconds and minutes - the time summary on the LCD is not displayed correctly.
 *
 * On the other hand, if we set the LCD to an hour, e.g. 23:33:59 - the hands of the clock do not update
 *
 * Help me Obi Clock Kenobi! You're My Only Hope
 *
 * * Rules:
 * - You can only write a code in the `vintageCuckooClock` instance
 */

const vintageCuckooClock = {
	// #Rule:
	// Code can only be written inside here.
}

// #Rule:
// You must not change code below:
assertThat(
	'Should show properly formatted time for 20:11:44',
	expect => expect(vintageCuckooClock.lcdTime).toBe('20:11:44')
)  //=
vintageCuckooClock.hours = 15;
vintageCuckooClock.minutes = 10;
vintageCuckooClock.seconds = 50;
assertThat(
	'Should show properly changed time for 15:10:50',
	expect => expect(vintageCuckooClock.lcdTime).toBe('15:10:50')
)  //=

vintageCuckooClock.lcdTime = '23:33:59';
assertThat(
	'Should work for settled time',
	expect => expect(vintageCuckooClock.lcdTime).toBe('23:33:59')
)  //=
assertThat(
	'Should work for settled time hours',
	expect => expect(vintageCuckooClock.hours).toBe(23)
)  //=
assertThat(
	'Should work for settled time minutes',
	expect => expect(vintageCuckooClock.minutes).toBe(33)
)  //=
assertThat(
	'Should work for settled time seconds',
	expect => expect(vintageCuckooClock.seconds).toBe(59)
)  //=
