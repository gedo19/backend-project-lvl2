import yaml from 'js-yaml';

const parse = (data, format) => {
  let parseData;
  if (format === '.json') {
    parseData = JSON.parse;
  } else if (format === '.yaml') {
    parseData = yaml.load;
  } else {
    throw new Error('This file format not supported.');
  }
  return parseData(data);
};

export default parse;
