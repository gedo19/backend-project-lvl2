import _ from 'lodash';
import {
  getKey, getValue, isNestedProperty, getStatus, getOldValue,
} from '../diffTreeIntefaces.js';

const normalize = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (value === '') {
    return `''`;
  }

  return value;
}

const plain = (differenceTree) => {
  const iter = (properties, line) => {
    const lines = properties
      .flatMap((property) => {
        const key = getKey(property);
        const value = getValue(property);
        const status = getStatus(property);
        if (!isNestedProperty(property)) {
          const normalizedValue = normalize(value);
          switch (status) {
            case 'added':
              return `${line}${key}' was added with value: ${normalizedValue}`;
            case 'deleted':
              return `${line}${key}' was removed`;
            case 'changed':
              const oldValue = getOldValue(property);
              const normalizedOldValue = normalize(oldValue);
              return `${line}${key}' was updated. From ${normalizedOldValue} to ${normalizedValue}`;
            default:
              return '';
          }
        };

        return iter(value, `${line}${key}.`);
      });
      return lines.filter((e) => e).join('\n');
  }

  return iter(differenceTree, `Property '`)
}

export default plain;