import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const data = readFile('nested_result.txt');
const [nestedStylishFormat, nestedPlainFormat] = data.trim().split('\n\n\n');

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
