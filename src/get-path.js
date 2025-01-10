import path from 'node:path';
// Формируем полный путь для запуска
const getFullPath = (pathFile) => path.resolve(process.cwd(), pathFile);

export { getFullPath };
