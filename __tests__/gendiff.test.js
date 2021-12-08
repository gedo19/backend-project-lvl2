import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

let filepath1;
let filepath2;
let result;

beforeAll(() => {
  filepath1 = getFixturePath('file1.json');
  filepath2 = getFixturePath('file2.json');
  result = readFile('result.txt');
});

test('plain json shoud word', () => {
  expect(getDiff(filepath1, filepath2)).toEqual(result);
});
