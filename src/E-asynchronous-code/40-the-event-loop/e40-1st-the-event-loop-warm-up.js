import { assertThat } from '../../j4b1-assert'
/**
 * e40-the-event-loop
 * Warm up
 *
 *
 * * Rules:
 * - You cannot delete the existing code
 * - You can only add a new code
 */

// #1 Task ----------------------------------------------------------

const collector = [];

collector.push(1);


collector.push(3);


collector.push(2);

queueMicrotask(() => {
		assertThat(
			'Collector has elements in proper order',
			expect => expect(collector).toEqual([1, 2, 3])
		) //=
	})

// #2 Task ----------------------------------------------------------

const secondCollector = [];

secondCollector.push(1);


secondCollector.push(3);


secondCollector.push(2);

queueMicrotask(() => {
		assertThat(
			'Second Collector has elements in proper order',
			expect => expect(secondCollector).toEqual([1, 2])
		) //=
	})
