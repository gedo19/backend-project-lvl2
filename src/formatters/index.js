import stylish from './stylish.js';
import plain from './plain.js';

export default (differenceTree, formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return stylish(differenceTree);
    case 'plain':
      return plain(differenceTree);
    case 'json':
      return JSON.stringify(differenceTree);
    default:
      throw new Error(`Wrong formatter name: ${formatterName}`);
  }
};
