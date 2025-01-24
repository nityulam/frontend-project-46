const formatter = (data) => {
  const result = data.map((node) => {
    if (node.status === 'deleted') {
      return `  - ${node.key}: ${node.value}`;
    }
    if (node.status === 'added') {
      return `  + ${node.key}: ${node.value}`;
    }
    if (node.status === 'unchanged') {
      return `    ${node.key}: ${node.value}`;
    }
    if (node.status === 'changed') {
      return `  - ${node.key}: ${node.value}\n  + ${node.key}: ${node.value2}`;
    }
    return `    ${node.key}: ${node.value}`;
  });

  const resultData = ['{', ...result, '}'].join('\n');

  return resultData;
};

export default formatter;
