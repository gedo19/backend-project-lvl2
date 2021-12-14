import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect, describe } from '@jest/globals';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const data = readFile('result.txt');
const [stylishResult, plainResult, jsonResult] = data.trim().split('\n\n\n');
const extensions = [{ extension: 'json' }, { extension: 'yaml' }];
const formatters = [
  { formatter: 'stylish', expected: stylishResult },
  { formatter: 'plain', expected: plainResult },
  { formatter: 'json', expected: jsonResult },
];

describe.each(extensions)(
  'Should work with $extension files:',
  ({ extension }) => {
    test.each(formatters)('$formatter', ({ formatter, expected }) => {
      const actual = getDiff(
        getFixturePath(`before.${extension}`),
        getFixturePath(`after.${extension}`),
        formatter,
      );
      expect(actual).toEqual(expected);
    });
  },
);
