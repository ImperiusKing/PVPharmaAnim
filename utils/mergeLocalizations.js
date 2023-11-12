export function mergeLocalizations(obj) {
  let result = { ...obj };
  if (obj.localizations?.length > 0) {
    result = { ...obj, ...obj.localizations[0] };
  }
  return result;
}
