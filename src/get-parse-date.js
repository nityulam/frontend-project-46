import yaml from 'js-yaml';

const getParseDate = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      return 'File extension is not supported';
  }
};

export { getParseDate };
