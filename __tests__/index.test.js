import { fileURLToPath } from 'url';
import path from 'path';

import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => readFileSync(getFixturePath(file), 'utf-8');

test('testing flat json, yaml, and yml', () => {
  const actualResult = readFile('expected_file.txt');

  const expectResultJSON = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(expectResultJSON).toEqual(actualResult);

  const expectResultYAML = genDiff(getFixturePath('file3.yaml'), getFixturePath('file4.yaml'));
  expect(expectResultYAML).toEqual(actualResult);

  const expectResultYML = genDiff(getFixturePath('file5.yml'), getFixturePath('file6.yml'));
  expect(expectResultYML).toEqual(actualResult);
});

test('testing json, yaml, and yml in stylish', () => {
  const actualResult = readFile('expected_stylish.txt');

  const expectResultJSON = genDiff(getFixturePath('file11.json'), getFixturePath('file22.json'));
  expect(expectResultJSON).toEqual(actualResult);

  const expectResultYAML = genDiff(getFixturePath('file33.yaml'), getFixturePath('file44.yaml'));
  expect(expectResultYAML).toEqual(actualResult);
});

test('testing json, yaml, and yml in plain', () => {
  const actualResult = readFile('expected_plain.txt');

  const expectResultJSON = genDiff(getFixturePath('file11.json'), getFixturePath('file22.json'));
  expect(expectResultJSON).toEqual(actualResult);

  const expectResultYAML = genDiff(getFixturePath('file33.yaml'), getFixturePath('file44.yaml'));
  expect(expectResultYAML).toEqual(actualResult);
});
