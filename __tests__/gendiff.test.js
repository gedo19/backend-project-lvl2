import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect, beforeAll } from '@jest/globals';
import getDiff from '../src/index.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let plain;
let parsedPlainData;

beforeAll(() => {
  plain = readFile('plain.txt');
  parsedPlainData = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
});

test('plain json shoud work', () => {
  const expected = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(expected).toEqual(plain);
});

test('plain yaml shoud work', () => {
  const expected = getDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(expected).toEqual(plain);
});

test('parser shour parse json files format', () => {
  const expected = parse(readFile('file1.json'), '.json');
  expect(expected).toEqual(parsedPlainData);
});

test('parser shour parse yaml files format', () => {
  const expected = parse(readFile('file1.yaml'), '.yaml');
  expect(expected).toEqual(parsedPlainData);
});

test('parser shour throw error when recieve not supported file format', () => {
  expect(() => parse(readFile('file1.yaml'), '')).toThrow();
});
