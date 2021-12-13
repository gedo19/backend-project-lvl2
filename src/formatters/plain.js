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
      .map(({
        key, value, type, children, oldValue,
      }) => {
        const keys = [...path, key];
        if (type !== 'hasChildren') {
          const propertyName = keys.join('.');
          switch (type) {
            case 'added':
              return `Property '${propertyName}' was added with value: ${normalize(value)}`;
            case 'deleted':
              return `Property '${propertyName}' was removed`;
            case 'changed':
              return `Property '${propertyName}' was updated. From ${normalize(oldValue)} to ${normalize(value)}`;
            default:
              return '';
          }
        }
        return iter(children, keys);
      });
    return lines.filter((e) => e).join('\n'); // filtering empty elements and join rest
  };

  return iter(differenceTree, []);
};

export default plain;
