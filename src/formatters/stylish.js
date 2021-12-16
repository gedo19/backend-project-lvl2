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
      .map((node) => {
        const { key, type } = node;
        switch (type) {
          case 'added': {
            const value = stringify(node.value, depth + 1);
            return `${mkIdent(identSize, '+ ')}${key}: ${value}`;
          }
          case 'deleted': {
            const value = stringify(node.value, depth + 1);
            return `${mkIdent(identSize, '- ')}${key}: ${value}`;
          }
          case 'changed': {
            const valueBefore = stringify(node.valueBefore, depth + 1);
            const valueAfter = stringify(node.valueAfter, depth + 1);
            return `${mkIdent(identSize, '- ')}${key}: ${valueBefore}\n${mkIdent(identSize, '+ ')}${key}: ${valueAfter}`;
          }
          case 'unchanged': {
            const value = stringify(node.value, depth + 1);
            return `${mkIdent(identSize)}${key}: ${value}`;
          }
          case 'hasChildren': {
            const { children } = node;
            return `${mkIdent(identSize)}${key}: ${iter(children, depth + 1)}`;
          }
          default:
            throw new Error(`Recieved wrong type: ${type}`);
        }
      });

    return ['{', ...lines, `${bracketIdent}}`].join('\n');
  };

  return iter(differenceTree, 1);
};
