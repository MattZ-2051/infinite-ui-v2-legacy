export function getPathValue(myPath, object) {
  return object && myPath
    ? myPath.split('.').reduce((result, property) => (result ? result[property] : ''), object)
    : '';
}
