import _ from 'lodash';
import {
  getKey, getValue, isFlatProperty, getStatus, getOldValue,
} from '../diffTreeIntefaces.js';

const normalize = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const plain = (differenceTree) => {
  const iter = (properties, path) => {
    const lines = properties
      .map((property) => {
        const keys = [...path, getKey(property)];
        const value = getValue(property);
        const status = getStatus(property);
        if (isFlatProperty(property)) {
          const propertyName = keys.join('.');
          const normalizedValue = normalize(value);
          switch (status) {
            case 'added':
              return `Property '${propertyName}' was added with value: ${normalizedValue}`;
            case 'deleted':
              return `Property '${propertyName}' was removed`;
            case 'changed': {
              const normalizedOldValue = normalize(getOldValue(property));
              return `Property '${propertyName}' was updated. From ${normalizedOldValue} to ${normalizedValue}`;
            }
            default:
              return '';
          }
        }

        return iter(value, keys);
      });
    return lines.filter((e) => e).join('\n');
  };

  return iter(differenceTree, []);
};

export default plain;
