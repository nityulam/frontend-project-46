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

const plain = (data) => {
  console.log('------');

  const iter = (obj, path = '') => {
    const result = obj.flatMap((item) => {
      const { key, value, oldValue, newValue, children, status } = item;
      const collectingPath = [path, key].join('.');

      switch (status) {
        case 'added':
          return `Property '${collectingPath}' was added with value: ${isItComposite(value)}`;
        case 'deleted':
          return `Property '${collectingPath}' was removed`;
        case 'changed':
          return `Property '${collectingPath}' was updated. From ${isItComposite(oldValue)} to ${isItComposite(newValue)}`;
        case 'unchanged':
          return [];
        case 'hasChild':
          return iter(children, collectingPath);
        default:
        // nothing
      }
    });
    return `${result.join('\n')}`;
  };

  return iter(data, '');
};

export default plain;
