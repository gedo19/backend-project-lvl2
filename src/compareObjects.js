import _ from 'lodash';
import { mkProperty, mkNestedProperty } from './diffTreeIntefaces.js';

const compareObjects = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const tree = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      const children = compareObjects(value1, value2);
      return mkNestedProperty(key, children);
    }
    if (!_.has(data1, key)) {
      return mkProperty(key, value2, 'added');
    }
    if (!_.has(data2, key)) {
      return mkProperty(key, value1, 'deleted');
    }
    if (!_.isEqual(value1, value2)) {
      return mkProperty(key, value2, 'changed', { oldValue: value1 });
    }

    return mkProperty(key, value2);
  });
  return tree;
};
export default compareObjects;
