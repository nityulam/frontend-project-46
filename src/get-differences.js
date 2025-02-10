import _ from 'lodash';

const getTreeDifferences = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedUniqueKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedUniqueKeys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const child = getTreeDifferences(data1[key], data2[key]);
      return { key, children: child, status: 'hasChild' };
    }

    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], status: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], status: 'deleted' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], status: 'unchanged' };
    }

    return {
      key,
      oldValue: data1[key],
      newValue: data2[key],
      status: 'changed',
    };
  });
  return result;
};

export default getTreeDifferences;
