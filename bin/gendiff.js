#!/usr/bin/env node

import { program } from 'commander';
import getDiffFiles from '../src/index.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference. / Cравнивает 2 конфиг файла и показ разницу.')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(getDiffFiles(filepath1, filepath2));
  });

program.parse(process.argv);
