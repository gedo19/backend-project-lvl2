import stylish from './stylish.js';
import plain from './plain.js';

export default (formatterName) => {
  if (formatterName === 'stylish') {
    return stylish;
  }
  if (formatterName === 'plain') {
    return plain;
  }

  throw new Error('invalid format name');
};
