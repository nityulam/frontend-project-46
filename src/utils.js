import { readFileSync } from 'node:fs';
import path from 'node:path';

// Читаем файл (получем данные из файла)
const getDate = (file) => readFileSync(file, 'utf-8');

// Формируем полный путь для запуска
const getFullPath = (pathFile) => path.resolve(process.cwd(), pathFile);

export { getDate, getFullPath };
