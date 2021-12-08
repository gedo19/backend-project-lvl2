import * as fs from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const fileContent1 = fs.readFileSync(filepath1, 'utf-8');
  const fileContent2 = fs.readFileSync(filepath2, 'utf-8');
  const file1 = JSON.parse(fileContent1);
  const file2 = JSON.parse(fileContent2);
  const keys = _.union(Object.keys(file1), Object.keys(file2));
  const sortedKeys = _.sortBy(keys);

  const difference = sortedKeys.reduce((diff, key) => {
    if (!_.has(file1, key)) {
      const value = file2[key];
      return `${diff}  + ${key}: ${value}\n`;
    }
    if (!_.has(file2, key)) {
      const value = file1[key];
      return `${diff}  - ${key}: ${value}\n`;
    }

    const value1 = file1[key];
    const value2 = file2[key];

    return value1 === value2
      ? `${diff}    ${key}: ${value2}\n`
      : `${diff}  - ${key}: ${value1}\n  + ${key}: ${value2}\n`;
  }, '');

  return `{\n${difference}}`;
};

export default genDiff;
