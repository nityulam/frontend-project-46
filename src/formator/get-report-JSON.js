const formatter = (data) => {
  // console.log('-<->- data', typeof data);
  const result = data.map((node) => {
    // console.log('node', node);
    // console.log(node.status);
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
  // const result = JSON.stringify(data, null, 2);
  // switch (`${}`)

  const tmp = ['{', ...result, '}'].join('\n');

  return tmp;
};

export default formatter;
