import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';

import { readFileSync } from 'node:fs';
import getFullPath from '../src/get-path.js';
import getDiffFiles from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const verificationFile = (file) => readFileSync(getFullPath(file), 'utf-8');

test('Тест главного файла index.js', () => {
  const actualResult = verificationFile(getFixturePath('expected_file.txt'));

  const expectResultJSON = getDiffFiles(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(expectResultJSON).toEqual(actualResult);

  const expectResultYAML = getDiffFiles(getFixturePath('file3.yaml'), getFixturePath('file4.yaml'));
  expect(expectResultYAML).toEqual(actualResult);

  const expectResultYML = getDiffFiles(getFixturePath('file5.yml'), getFixturePath('file6.yml'));
  expect(expectResultYML).toEqual(actualResult);
});

/*
test('Тест 2 пробный', () => {
  const actualResult = verificationFile(getFixturePath('expected_file.txt'));

  const expectResultYAML = getDiffFiles(getFixturePath('file1.json'), getFixturePath('file4.yaml'));
  expect(expectResultYAML).toEqual(actualResult);
});
*/
