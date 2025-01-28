import { extname } from 'node:path';
import getDate from './get-date.js';

import getFullPath from './get-path.js';
import getParseDate from './get-parse-date.js';

import getTreeDifferences from './get-differences.js';
// import formatter from './formatter/get-report-JSON.js';
import formatter from './formatter/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  // getDate Читаем файл (получем данные из файла), getFullPath Формируем полный путь для запуска
  const file1 = getDate(getFullPath(filepath1));
  const file2 = getDate(getFullPath(filepath2));
  // console.log('- file1 -', file1);
  // console.log('- file2Date -', file2);

  // const formatFile1 = extname(filepath1);
  // const formatFile2 = extname(filepath2);

  // Получаем распарсенные данные в зависимости от формата(extname - получаем расширение файла)
  const date1 = getParseDate(file1, extname(filepath1));
  const date2 = getParseDate(file2, extname(filepath2));
  // console.log('- fileDate1 -', fileDate1);
  // console.log('- fileDate2 -', fileDate2);

  // получаем отличия в виде дерева (массива) со статусами
  const differences = getTreeDifferences(date1, date2);
  // console.log('- отличия -', differences);
  // console.log('- формат -', format);

  // Формируем итоговый отчет в указанном формате
  const result = formatter(differences, format);
  // console.log('-!- result -', result);

  return result;
};

export default genDiff;
