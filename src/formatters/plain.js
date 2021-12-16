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
      .map((node) => {
        const { key, type } = node;
        const keys = [...path, key];
        const propertyName = keys.join('.');
        switch (type) {
          case 'added': {
            const value = normalize(node.value);
            return `Property '${propertyName}' was added with value: ${value}`;
          }
          case 'deleted': {
            return `Property '${propertyName}' was removed`;
          }
          case 'changed': {
            const valueBefore = normalize(node.valueBefore);
            const valueAfter = normalize(node.valueAfter);
            return `Property '${propertyName}' was updated. From ${valueBefore} to ${valueAfter}`;
          }
          case 'hasChildren': {
            const { children } = node;
            return iter(children, keys);
          }
          default:
            throw new Error(`Recieved wrong type: ${type}`)
        }
      });
    return lines.join('\n');
  };

  return iter(differenceTree, []);
};

export default plain;
