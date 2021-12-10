import _ from 'lodash';

const compareObjects = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const difference = sortedKeys.reduce((diff, key) => {
    if (!_.has(data1, key)) {
      const value = data2[key];
      return `${diff}  + ${key}: ${value}\n`;
    }
    if (!_.has(data2, key)) {
      const value = data1[key];
      return `${diff}  - ${key}: ${value}\n`;
    }

    const value1 = data1[key];
    const value2 = data2[key];

    return value1 === value2
      ? `${diff}    ${key}: ${value2}\n`
      : `${diff}  - ${key}: ${value1}\n  + ${key}: ${value2}\n`;
  }, '');

  return `{\n${difference}}`;
};

export default compareObjects;