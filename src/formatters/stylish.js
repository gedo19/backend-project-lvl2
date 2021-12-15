import _ from 'lodash';

const spacesCount = 4; // count of spacing symbol in first-level ident
const mkIdent = (identSize, action = '', replacer = ' ') => `${replacer.repeat(identSize - action.length)}${action}`;

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const indentSize = spacesCount * depth;
  const currentIndent = mkIdent(indentSize);
  const bracketIndent = mkIdent(indentSize - spacesCount); // bracket ident always one step back
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default (differenceTree) => {
  const iter = (properties, depth) => {
    const identSize = spacesCount * depth;
    const bracketIdent = mkIdent(identSize - spacesCount); // bracket ident always one step back
    const lines = properties
      .map((property) => {
        const { key } = property;
        const { type } = property;

        if (type === 'hasChildren') {
          const { children } = property;
          return `${mkIdent(identSize)}${key}: ${iter(children, depth + 1)}`;
        }

        if (type === 'changed') {
          const valueBefore = stringify(property.valueBefore, depth + 1);
          const valueAfter = stringify(property.valueAfter, depth + 1);
          return `${mkIdent(identSize, '- ')}${key}: ${valueBefore}\n${mkIdent(identSize, '+ ')}${key}: ${valueAfter}`;
        }

        const value = stringify(property.value, depth + 1);

        if (type === 'added') {
          return `${mkIdent(identSize, '+ ')}${key}: ${value}`;
        }

        if (type === 'deleted') {
          return `${mkIdent(identSize, '- ')}${key}: ${value}`;
        }

        return `${mkIdent(identSize)}${key}: ${value}`;
      });

    return ['{', ...lines, `${bracketIdent}}`].join('\n');
  };

  return iter(differenceTree, 1);
};
