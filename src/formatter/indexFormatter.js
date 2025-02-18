import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (data, format) => {
  const objectWithFormats = {
    stylish,
    plain,
    json,
  };

  if (objectWithFormats[format]) {
    return objectWithFormats[format](data);
  }

  throw new Error(`Cannot be converted to format ${format}`);
};

export default formatter;
