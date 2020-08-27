import someUtil, { toSecondPower } from './main/utils/some-util' 
import { addNumbers, averageFrom } from './main/helpers/my-things' 
// import * as numericThings from './main/helpers/my-things' 
import { firstLetterToUpper as capitalize } from './main/tools/tool-1' 
import { countWords } from './main/tools/tool-2' 

// const {lastLetter, numberOfChars} = someUtil;

export const stringHelper = {
    lastLetter: someUtil.lastLetter,
    numberOfChars: someUtil.numberOfChars,
    countWords,
    capitalize,
    //capitalize: firstLetterToUpper
}

export const numberHelper = {
    toSecondPower,
    addNumbers,
    averageFrom,
    // ...numericThings
}

// // import { firstLetterToUpper as capitalize } from './main/tools/tool-1'
// import { firstLetterToUpper } from './main/tools/tool-1'

// export const stringHelper = {
//     lastLetter: () => {},
//     numberOfChars: () => {},
//     countWords: () => {},
//     // capitalize: capitalize,
//     capitalize: firstLetterToUpper,
//     // capitalize
// };

// export const numberHelper = {
//     lastLetter: () => {}
// };