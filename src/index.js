import { extname } from 'node:path';
import getDate from './get-date.js';
// import { getFormat } from './get-file-extension.js';
import getFullPath from './get-path.js';
import getParseDate from './get-parse-date.js';

// import { jsonDiff } from './get-differences.js';
import getTreeDifferences from './get-differences.js';
import formatter from './formator/get-report-JSON.js';

// import { tmp } from './formator/tmp.js';

const getDiffFiles = (filepath1, filepath2, format) => {
  // getDate Читаем файл (получем данные из файла), getFullPath Формируем полный путь для запуска
  const file1 = getDate(getFullPath(filepath1));
  const file2 = getDate(getFullPath(filepath2));
  // console.log('- file1 -', file1);
  // console.log('- file2Date -', file2);

  // const formatFile1 = extname(filepath1);
  // const formatFile2 = extname(filepath2);

  // Получаем распарсенные данные в зависимости от формата(extname - получаем расширение файла)
  const fileDate1 = getParseDate(file1, extname(filepath1));
  const fileDate2 = getParseDate(file2, extname(filepath2));
  // console.log('- fileDate1 -', fileDate1);
  // console.log('- fileDate2 -', fileDate2);

  // получаем отличия в виде массива со статусами
  const differences = getTreeDifferences(fileDate1, fileDate2);
  // console.log('- отличия -', differences);

  // Формируем итоговый отчет в указанном формате
  const result = formatter(differences);
  // console.log('-!- result -', result);

  return result;

  // должен вернуть строку установленного формата JSON, yaml, yml
};

export default getDiffFiles;
