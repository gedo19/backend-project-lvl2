import stylish from './stylish.js';
import plain from './plain.js';

export default (formatterName) => {
  switch (formatterName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return JSON.parse;
    default:
      throw new Error(`Wrong formatter name: ${formatterName}`);
  }
};
