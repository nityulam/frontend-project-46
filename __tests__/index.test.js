import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';

import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => readFileSync(getFixturePath(file), 'utf-8');

test('Тест главного файла index.js', () => {
  const actualResult = readFile('expected_file.txt');

  const expectResultJSON = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(expectResultJSON).toEqual(actualResult);

  const expectResultYAML = genDiff(getFixturePath('file3.yaml'), getFixturePath('file4.yaml'));
  expect(expectResultYAML).toEqual(actualResult);

  const expectResultYML = genDiff(getFixturePath('file5.yml'), getFixturePath('file6.yml'));
  expect(expectResultYML).toEqual(actualResult);
});
