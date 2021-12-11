import stylish from './stylish.js';

export default (formatterName) => {
  if (formatterName === 'stylish') {
    return stylish;
  }

  throw new Error('invalid format name');
};
