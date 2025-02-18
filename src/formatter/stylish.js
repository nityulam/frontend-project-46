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
    return result;
  });
  return `{\n${str.join('\n')}\n${indent(depth)}}`;
};

const stylish = (data) => {
  const iter = (nodes, depth) => {
    // console.log('---!---obj', obj);

    const result = nodes.map((node) => {
      // console.log('--------', item);
      const {
        key, value, oldValue, newValue, type,
      } = node;
      // console.log('-----', type);

      switch (type) {
        case 'added':
          return `  ${indent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `  ${indent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `  ${indent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return `  ${indent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}\n  ${indent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`;
        case 'nested':
          return `  ${indent(depth)}  ${key}: ${iter(value, depth + 1)}`;
        default:
          throw new Error(`Status ${type} is not supported`);
      }
    });
    return `{\n${result.join('\n')}\n${indent(depth)}}`;
  };
  return iter(data, 0);
};

export default stylish;
