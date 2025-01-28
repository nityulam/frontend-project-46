import _ from 'lodash';

const stylish = (data) => {
  if (_.isPlainObject(data)) {
    return `${data}`;
  }
  const iter = (obj, depth) => {
    const margins = 2;
    const indent = '  '.repeat(depth * margins - 2);

    const result = obj.map((item) => {
      const { key, value, oldValue, newValue, children, status } = item;

      switch (status) {
        case 'added':
          return `  ${indent}+ ${key}: ${value}`;
        case 'deleted':
          return `  ${indent}- ${key}: ${value}`;
        case 'unchanged':
          return `  ${indent}  ${key}: ${value}`;
        case 'changed':
          return `  ${indent}- ${key}: ${oldValue}\n  ${indent}+ ${key}: ${newValue}`;
        case 'hasChild':
          return `  ${indent}  ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Лох что ли${status}`);
      }
    });
    return ['{', ...result, `${indent}`, '}'].join('\n');
  };
  return iter(data, 1);
};

export default stylish;
