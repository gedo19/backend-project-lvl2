import * as fs from 'fs';
import path from 'path';
import compareObjects from './compareObjects.js';
import parse from './parsers.js';
import format from './formatters/index.js';

export default (filepath1, filepath2, formatterName = 'stylish') => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const fileFormat1 = path.extname(filepath1).substring(1);
  const fileFormat2 = path.extname(filepath2).substring(1);
  const object1 = parse(data1, fileFormat1);
  const object2 = parse(data2, fileFormat2);

  const differenceTree = compareObjects(object1, object2);
  return format(differenceTree, formatterName);
};
