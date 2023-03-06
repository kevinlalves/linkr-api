import { upperCaseLetter } from '../constants/regex.js';

const camelToSnakeCase = (camelCaseString) => {
  let snakeCaseString = '';

  for (const letter of camelCaseString) {
    snakeCaseString += upperCaseLetter.test(letter) ? `_${letter.toLowerCase()}` : letter;
  }

  return snakeCaseString;
};

export default camelToSnakeCase;
