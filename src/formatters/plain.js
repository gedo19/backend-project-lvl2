import _ from 'lodash';

const normalize = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const plain = (differenceTree) => {
  const iter = (properties, path) => {
    const lines = properties
      .filter(({ type }) => type !== 'unchanged')
      .map((property) => {
        const { key } = property;
        const keys = [...path, key];
        const { type } = property;

        if (type === 'hasChildren') {
          const { children } = property;
          return iter(children, keys);
        }

        const propertyName = keys.join('.');

        if (type === 'changed') {
          const valueBefore = normalize(property.valueBefore);
          const valueAfter = normalize(property.valueAfter);
          return `Property '${propertyName}' was updated. From ${valueBefore} to ${valueAfter}`;
        }

        const value = normalize(property.value);

        return type === 'added'
          ? `Property '${propertyName}' was added with value: ${value}`
          : `Property '${propertyName}' was removed`;
      });
    return lines.join('\n');
  };

  return iter(differenceTree, []);
};

export default plain;
