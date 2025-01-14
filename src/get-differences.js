import _ from 'lodash';

const getTreeDifferences = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keysUnique = _.sortBy(_.union(keys1, keys2));

  const result = keysUnique.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!Object.hasOwn(data1, key)) {
      const result2 = { key, value: value2, status: 'added' };
      // console.log('result', result2);
      return result2;
    }
    if (!Object.hasOwn(data2, key)) {
      const result3 = { key, value: value1, status: 'deleted' };
      // console.log('result', result3);
      return result3;
    }
    if (value1 === value2) {
      const result4 = { key, value: value1, status: 'unchanged' };
      // console.log('result', result4);
      return result4;
    }
    const result5 = {
      key,
      value: value1,
      value2,
      status: 'changed',
    };
    return result5;
    // тут еще будут детишки
  });
  // console.log('= result', result);
  return result;
};

export default getTreeDifferences;
