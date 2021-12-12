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

let nestedStylishFormat;
let nestedPlainFormat;
let parsedData;

beforeAll(() => {
  const data = readFile('nested_result.txt');
  [nestedStylishFormat, nestedPlainFormat] = data.trim().split('\n\n\n');
  parsedData = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
});

test('nested stylish-formatter json shoud work', () => {
  const expected = getDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'stylish');
  expect(expected).toEqual(nestedStylishFormat);
});

test('nested stylish-formatter yaml shoud work', () => {
  const expected = getDiff(getFixturePath('nested1.yaml'), getFixturePath('nested2.yaml'), 'stylish');
  expect(expected).toEqual(nestedStylishFormat);
});

test('nested plain-formatter json shoud work', () => {
  const expected = getDiff(getFixturePath('nested1.json'), getFixturePath('nested2.json'), 'plain');
  expect(expected).toEqual(nestedPlainFormat);
});

test('nested plain-formatter yaml shoud work', () => {
  const expected = getDiff(getFixturePath('nested1.yaml'), getFixturePath('nested2.yaml'), 'plain');
  expect(expected).toEqual(nestedPlainFormat);
});

test('parser shour parse json files format', () => {
  const expected = parse(readFile('plain1.json'), '.json');
  expect(expected).toEqual(parsedData);
});

test('parser shour parse yaml files format', () => {
  const expected = parse(readFile('plain1.yaml'), '.yaml');
  expect(expected).toEqual(parsedData);
});

test('parser shour throw error when recieve not supported file format', () => {
  expect(() => parse(readFile('file1.yaml'), '')).toThrow();
});
