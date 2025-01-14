import { readFileSync } from 'node:fs';
// Читаем файл (получем данные из файла)
const getDate = (file) => readFileSync(file, 'utf-8');

export default getDate;
