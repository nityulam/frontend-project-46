import _ from 'lodash';

const getTreeDifferences = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedUniqueKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedUniqueKeys.map((key) => {
    // console.log('data1[key]', data1[key], 'key - ', key);
    // console.log('data2[key]', data2[key], 'key - ', key);
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const child = getTreeDifferences(data1[key], data2[key]);
      const result5 = { key, children: child, status: 'hasChild' };
      // console.log('result hasChild', result5);
      return result5;
    }

    if (!Object.hasOwn(data1, key)) {
      const result2 = { key, value: data2[key], status: 'added' };
      // console.log('result', result2);
      return result2;
    }
    if (!Object.hasOwn(data2, key)) {
      const result3 = { key, value: data1[key], status: 'deleted' };
      // console.log('result', result3);
      return result3;
    }
    if (_.isEqual(data1[key], data2[key])) {
      const result4 = { key, value: data1[key], status: 'unchanged' };
      // console.log('result unchanged', result4);
      return result4;
    }

    const result6 = {
      key,
      oldValue: data1[key],
      newValue: data2[key],
      status: 'changed',
    };
    return result6;
  });
  // console.log('= result', result);
  return result;
};

export default getTreeDifferences;
