import * as fs from 'fs';
import path from 'path';
import compareObjects from './compareObjects.js';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatterName = 'stylish') => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);
  const object1 = parse(data1, format1);
  const object2 = parse(data2, format2);
  const formatter = getFormatter(formatterName);

  return formatter(compareObjects(object1, object2));
};

export default genDiff;
