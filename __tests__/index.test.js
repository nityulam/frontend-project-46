import { fileURLToPath } from 'url';
import path from 'path';

import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => readFileSync(getFixturePath(file), 'utf-8');

/*
test('testing flat json and yaml', () => {
  const actualResult = readFile('expected_flat.txt');

  const expectJSON = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(expectJSON).toEqual(actualResult);

  const expectYAML = genDiff(getFixturePath('file3.yaml'), getFixturePath('file4.yaml'));
  expect(expectYAML).toEqual(actualResult);
});

test('testing json and yaml in stylish', () => {
  const actualResult = readFile('expected_stylish.txt');

  const expectJSON = genDiff(getFixturePath('file11.json'), getFixturePath('file22.json'));
  expect(expectJSON).toEqual(actualResult);

  const expectYAML = genDiff(getFixturePath('file33.yaml'), getFixturePath('file44.yaml'));
  expect(expectYAML).toEqual(actualResult);
});

test('testing json and yaml in plain', () => {
  const actualResult = readFile('expected_plain.txt');

  const expectJSON = genDiff(getFixturePath('file11.json'), getFixturePath('file22.json'), 'plain');
  expect(expectJSON).toEqual(actualResult);

  const expectYAML = genDiff(getFixturePath('file33.yaml'), getFixturePath('file44.yaml'), 'plain');
  expect(expectYAML).toEqual(actualResult);
});

test('testing json and yaml in json', () => {
  const actualResult = readFile('expected_json.txt');

  const expectJSON = genDiff(getFixturePath('file11.json'), getFixturePath('file22.json'), 'json');
  expect(expectJSON).toEqual(actualResult);

  const expectYAML = genDiff(getFixturePath('file33.yaml'), getFixturePath('file44.yaml'), 'json');
  expect(expectYAML).toEqual(actualResult);
});
*/

test('testing "The file extension is not supported"', () => {
  expect(() => {
    genDiff(getFixturePath('unsupp_extension.txt'), getFixturePath('file44.yaml'));
  }).toThrow('Extension .txt it is not supported');
});

test('testing "The specified format is not supported"', () => {
  expect(() => {
    genDiff(getFixturePath('file11.json'), getFixturePath('file22.json'), 'txt');
  }).toThrow('Cannot be converted to format txt');
});

// Сделал в двух вариантах, но и там и там получилось много строк кода
/*
const fileFlatJson1 = getFixturePath('file1.json');
const fileFlatJson2 = getFixturePath('file2.json');
const fileFlatYaml1 = getFixturePath('file3.yaml');
const fileFlatYaml2 = getFixturePath('file4.yaml');
const expectedFlat = readFile('expected_flat.txt');

const fileJson1 = getFixturePath('file11.json');
const fileJson2 = getFixturePath('file22.json');
const fileYaml1 = getFixturePath('file33.yaml');
const fileYaml2 = getFixturePath('file44.yaml');

const expectedStylish = readFile('expected_stylish.txt');
const expectedPlain = readFile('expected_plain.txt');
const expectedJson = readFile('expected_json.txt');

const testCases = [
  { file1: fileFlatJson1, file2: fileFlatJson2, expected: expectedFlat },
  { file1: fileFlatYaml1, file2: fileFlatYaml2, expected: expectedFlat },

  { file1: fileJson1, file2: fileJson2, expected: expectedStylish },
  { file1: fileYaml1, file2: fileYaml2, expected: expectedStylish },

  {
    file1: fileJson1,
    file2: fileJson2,
    format: 'plain',
    expected: expectedPlain,
  },
  {
    file1: fileYaml1,
    file2: fileYaml2,
    format: 'plain',
    expected: expectedPlain,
  },

  {
    file1: fileJson1,
    file2: fileJson2,
    format: 'json',
    expected: expectedJson,
  },
  {
    file1: fileYaml1,
    file2: fileYaml2,
    format: 'json',
    expected: expectedJson,
  },
];

test.each(testCases)('testing using test.each', ({ file1, file2, format, expected }) => {
  expect(genDiff(file1, file2, format)).toEqual(expected);
});
*/

// Данный вариант тоже длинный, но более читаемый
const fileJson1 = getFixturePath('file11.json');
const fileJson2 = getFixturePath('file22.json');
const fileYaml1 = getFixturePath('file33.yaml');
const fileYaml2 = getFixturePath('file44.yaml');

const expectedStylish = readFile('expected_stylish.txt');
const expectedPlain = readFile('expected_plain.txt');
const expectedJson = readFile('expected_json.txt');

const testCasesFlat = [
  { file1: getFixturePath('file1.json'), file2: getFixturePath('file2.json'), expected: readFile('expected_flat.txt') },
  { file1: getFixturePath('file3.yaml'), file2: getFixturePath('file4.yaml'), expected: readFile('expected_flat.txt') },
];

const testCasesStylish = [
  { file1: fileJson1, file2: fileJson2, expected: expectedStylish },
  { file1: fileYaml1, file2: fileYaml2, expected: expectedStylish },
];

const testCasesPlain = [
  { file1: fileJson1, file2: fileJson2, expected: expectedPlain },
  { file1: fileYaml1, file2: fileYaml2, expected: expectedPlain },
];

const testCasesJson = [
  { file1: fileJson1, file2: fileJson2, expected: expectedJson },
  { file1: fileYaml1, file2: fileYaml2, expected: expectedJson },
];

test.each(testCasesFlat)('testing flat', ({ file1, file2, expected }) => {
  expect(genDiff(file1, file2)).toEqual(expected);
});

test.each(testCasesStylish)('testing stylish format', ({ file1, file2, expected }) => {
  expect(genDiff(file1, file2)).toEqual(expected);
});

test.each(testCasesPlain)('testing plain format', ({ file1, file2, expected }) => {
  expect(genDiff(file1, file2, 'plain')).toEqual(expected);
});

test.each(testCasesJson)('testing json format', ({ file1, file2, expected }) => {
  expect(genDiff(file1, file2, 'json')).toEqual(expected);
});
