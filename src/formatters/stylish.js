import _ from 'lodash';

const spacesCount = 4; // count of spacing symbol in first-level ident
const mkIdent = (identSize, action = '', replacer = ' ') => action.padStart(identSize, replacer);

const stringify = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return currentValue.toString();
    }

    const indentSize = spacesCount * currentDepth;
    const currentIndent = mkIdent(indentSize);
    const bracketIndent = mkIdent(indentSize - spacesCount); // bracket ident always one step back
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, currentDepth + 1)}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(value, depth + 1);
};

export default (differenceTree) => {
  const iter = (properties, depth) => {
    const identSize = spacesCount * depth;
    const bracketIdent = mkIdent(identSize - spacesCount); // bracket ident always one step back
    const lines = properties
      .map(({
        key, value, type, children, oldValue,
      }) => {
        if (type !== 'hasChildren') {
          const stringifyValue = _.isObject(value) ? stringify(value, depth) : value;
          const stringifyOldValue = _.isObject(oldValue)
            ? stringify(oldValue, depth)
            : oldValue;
          switch (type) {
            case 'added':
              return `${mkIdent(identSize, '+ ')}${key}: ${stringifyValue}`;
            case 'deleted':
              return `${mkIdent(identSize, '- ')}${key}: ${stringifyValue}`;
            case 'changed':
              return `${mkIdent(identSize, '- ')}${key}: ${stringifyOldValue}\n${mkIdent(identSize, '+ ')}${key}: ${stringifyValue}`;
            default:
              return `${mkIdent(identSize)}${key}: ${stringifyValue}`;
          }
        }
        return `${mkIdent(identSize)}${key}: ${iter(children, depth + 1)}`;
      });

    return ['{', ...lines, `${bracketIdent}}`].join('\n');
  };

  return iter(differenceTree, 1);
};
