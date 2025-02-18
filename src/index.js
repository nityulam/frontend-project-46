import { extname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import getParseDate from './parsers.js';
import getTreeDifferences from './getDiffTree.js';
import formatter from './formatter/indexFormatter.js';

// Читаем файл (получем данные из файла)
const getDate = (file) => readFileSync(file, 'utf-8');

// Формируем полный путь для запуска
const getFullPath = (pathFile) => resolve(process.cwd(), pathFile);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  // getDate Читаем файл (получем данные из файла), getFullPath Формируем полный путь для запуска
  const file1 = getDate(getFullPath(filepath1));
  const file2 = getDate(getFullPath(filepath2));

  // Получаем распарсенные данные в зависимости от формата(extname - получаем расширение файла)
  const date1 = getParseDate(file1, extname(filepath1));
  const date2 = getParseDate(file2, extname(filepath2));

  // Получаем отличия в виде дерева (массива) со статусами
  const differences = getTreeDifferences(date1, date2);

  // Формируем итоговый отчет в указанном формате
  const result = formatter(differences, format);

  return result;
};

export default genDiff;
