import { assertThat } from '../../j4b1-assert'
/**
 * d10-filter-map-reduce
 * Challenge
 *
 * We need to apply statistics to calls for our people from CallCenter.
 * However, some words need to be excluded.
 *
 * It's nice if the word count statistic is shown alphabetically - as an object
 * Where the key is a word - and the value - a number of appearance in the sentence.
 *
 * * Rules:
 * - Only change the code inside `makeWordsStatsWithSentence`
 */

['try', 'did', 'again'].includes('did'); //=
['try', 'did', 'again'].includes('diD'); //=
 
 function makeWordsStatsWithSentence(sentence, exclusionList = []) {
	// #Rule:
    // Code can be written only inside this block.
    
    // helpers:
    const notExluded = w => !exclusionList.includes(w);
    // const toLowerCase = w => w.toLowerCase();
    
    const words = sentence.toLowerCase().split(' ');
    const filteredWords = words.filter(notExluded).sort() //=
    
    // const resultObj = {};
    
    // filteredWords.forEach((w) => {
    //     // if(resultObj[w]) {
    //     //     resultObj[w] += 1;
    //     // } else {
    //     //     resultObj[w] = 1;
    //     // }
    //     resultObj[w] = resultObj[w] ? resultObj[w] + 1 : 1;
    // })
    
    // return resultObj;
    
    // for(let w of filteredWords) {
    //     if(resultObj[w]) {
    //         resultObj[w] += 1;
    //     } else {
    //         resultObj[w] = 1;
    //     }
    // }
    
	return filteredWords.reduce((resultObj, key) => {
        resultObj[key] = resultObj[key] ? resultObj[key] + 1 : 1;
        return resultObj;
    }, {});
}

const sentence1 = 'Did you try to turn it off and on again'
const sentence2 = 'no no no I will not agree on that'

// #Rule:
// You must not change code below:
const statsForSentence1 = makeWordsStatsWithSentence(sentence1, ['try', 'did', 'again']);
assertThat(
	'Should return proper stats object for sentence1 excluding "try", "did", "again"',
	expect => expect(statsForSentence1).toEqual({
		and: 1,
		it: 1,
		off: 1,
		on: 1,
		to: 1,
		turn: 1,
		you: 1
	})
)  //=

const statsForSentence2 = makeWordsStatsWithSentence(sentence2, ['will']);
assertThat(
	'Should return proper stats object for sentence2 excluding "will"',
	expect => expect(statsForSentence2).toEqual({
		agree: 1,
		i: 1,
		no: 3,
		not: 1,
		on: 1,
		that: 1
	})
)  //=

const sample = makeWordsStatsWithSentence('HELLO hello');
assertThat(
	'Should return proper lowerCased stats when no exclusions provided',
	expect => expect(sample).toEqual({hello: 2})
)  //=

const sample2 = makeWordsStatsWithSentence('HELLO hello', ['hello']);
assertThat(
	'Should return empty object when all found words are in exclusion list',
	expect => expect(sample2).toEqual({})
)  //=
