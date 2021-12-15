import _ from 'lodash';

const compareObjects = (firstData, secondData) => {
  const keys = _.union(Object.keys(firstData), Object.keys(secondData));

  return _.sortBy(keys).map((key) => {
    if (!_.has(firstData, key)) {
      return { key, value: secondData[key], type: 'added' };
    }
    if (!_.has(secondData, key)) {
      return { key, value: firstData[key], type: 'deleted' };
    }
    const firstValue = firstData[key];
    const secondValue = secondData[key];

    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      const children = compareObjects(firstValue, secondValue);
      return { key, type: 'hasChildren', children };
    }
    if (!_.isEqual(firstValue, secondValue)) {
      return {
        key,
        valueBefore: firstValue,
        valueAfter: secondValue,
        type: 'changed',
      };
    }

    return { key, value: secondValue, type: 'unchanged' };
  });
};
export default compareObjects;
