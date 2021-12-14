import yaml from 'js-yaml';

export default (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Wrong file format: ${format}`);
  }
};
