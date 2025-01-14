import yaml from 'js-yaml';

const getParseDate = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`Extension ${format} it is not supported.`);
  }
};

export { getParseDate };
