import _ from 'lodash';

const indent = (depth) => {
  const margin = '    ';
  return margin.repeat(depth);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return `${data}`;
  }
  const arrData = Object.entries(data);

  const str = arrData.map(([key, value]) => {
    const result = `  ${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
    // console.log('-key-', key);
    return result;
  });
  return `{\n${str.join('\n')}\n${indent(depth)}}`;
};

const stylish = (data) => {
  if (_.isPlainObject(data)) {
    return `${data}`;
  }
  const iter = (obj, depth) => {
    const result = obj.map((item) => {
      const { key, value, oldValue, newValue, children, status } = item;

      switch (status) {
        case 'added':
          return `  ${indent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `  ${indent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `  ${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `  ${indent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}\n  ${indent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`;
        case 'hasChild':
          return `  ${indent(depth)}  ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Status ${status} is not supported`);
      }
    });
    return `{\n${result.join('\n')}\n${indent(depth)}}`;
  };
  return iter(data, 0);
};

export default stylish;
