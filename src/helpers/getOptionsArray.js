export default function getOptionsArray(options, path = '') {
  let optionsArray = [];

  for (const [key, value] of Object.entries(options)) {
    const fullPath = path ? `${path}.${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      optionsArray = optionsArray.concat(getOptionsArray(value, fullPath));
    } else {
      optionsArray.push(`${fullPath}: ${value}`);
    }
  }

  return optionsArray;
}