import _ from 'lodash';

const isItComposite = (data) => {
  if (_.isPlainObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const collectingPath = (path, key) => {
  if (path === '') {
    return [key].join('.');
  }
  return [path, key].join('.');
};

const plain = (data) => {
  const iter = (obj, path = '') => {
    const result = obj.flatMap((item) => {
      const {
        key, value, oldValue, newValue, type,
      } = item;

      switch (type) {
        case 'added':
          return `Property '${collectingPath(path, key)}' was added with value: ${isItComposite(value)}`;
        case 'deleted':
          return `Property '${collectingPath(path, key)}' was removed`;
        case 'changed':
          return `Property '${collectingPath(path, key)}' was updated. From ${isItComposite(oldValue)} to ${isItComposite(newValue)}`;
        case 'unchanged':
          return [];
        case 'nested':
          return iter(value, collectingPath(path, key));
        default:
          throw new Error(`Status ${type} is not supported`);
      }
    });
    return `${result.join('\n')}`;
  };

  return iter(data, '');
};

export default plain;
