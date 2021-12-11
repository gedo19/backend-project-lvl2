import _ from 'lodash';
import {
  getKey, getValue, isNestedProperty, getStatus, getOldValue,
} from '../diffTreeIntefaces.js';

const makeIdent = (size, status) => {
  const identStart = ' '.repeat(size - 2);
  switch (status) {
    case 'added':
      return `${identStart}+ `;
    case 'deleted':
      return `${identStart}- `;
    case 'changed':
      return [`${identStart}- `, `${identStart}+ `];
    default:
      return `${identStart}  `;
  }
};

const stringify = (value, replacer, spacesCount) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}    ${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

const stylish = (differenceTree) => {
  const spacesCount = 4;
  const replacer = ' ';
  const iter = (tree, depth) => {
    const identSize = depth * spacesCount;
    const bracketIdent = replacer.repeat(identSize - spacesCount);

    const lines = tree.map((property) => {
      const key = getKey(property);
      const value = getValue(property);
      const status = getStatus(property);
      const currentIdent = makeIdent(identSize, status);
      if (!isNestedProperty(property)) {
        const valueString = _.isObject(value) ? stringify(value, replacer, identSize) : value;
        if (status === 'changed') {
          const [minusIdent, plusIdent] = currentIdent;
          const oldValue = getOldValue(property);
          const oldValueString = _.isObject(oldValue)
            ? stringify(oldValue, replacer, identSize)
            : oldValue;
          return `${minusIdent}${key}: ${oldValueString}\n${plusIdent}${key}: ${valueString}`;
        }
        return `${currentIdent}${key}: ${valueString}`;
      }
      return `${currentIdent}${key}: ${iter(value, depth + 1)}`;
    });

    return [
      '{',
      ...lines,
      `${bracketIdent}}`,
    ].join('\n');
  };

  return iter(differenceTree, 1);
};

export default stylish;
