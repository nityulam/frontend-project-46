import { fileURLToPath } from 'url';
import path from 'path';

import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => readFileSync(getFixturePath(file), 'utf-8');

const casesFormats = [['json'], ['yaml'], ['yml']];

test.each(casesFormats)('testing gendiff', (format) => {
  const filePath1 = getFixturePath(`file1.${format}`);
  const filePath2 = getFixturePath(`file2.${format}`);

  expect(genDiff(filePath1, filePath2)).toEqual(readFile('stylishResult.txt'));
  expect(genDiff(filePath1, filePath2, 'plain')).toEqual(readFile('plainResult.txt'));
  expect(genDiff(filePath1, filePath2, 'json')).toEqual(readFile('jsonResult.txt'));
});

test('testing "The file extension is not supported"', () => {
  expect(() => {
    genDiff(getFixturePath('unsupp_extension.txt'), getFixturePath('file2.yaml'));
  }).toThrow('Extension .txt it is not supported');
});

test('testing "The specified format is not supported"', () => {
  expect(() => {
    genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'txt');
  }).toThrow('Cannot be converted to format txt');
});
