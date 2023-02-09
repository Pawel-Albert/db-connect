export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function doubleQuotesToSingle(str: string) {
  return str.replace(/\"/g, "'");
}

export function arrayExtractValue(array: any = [], key: any) {
  const item = array.find((string: string) =>
    string.toUpperCase().startsWith(`${key.toUpperCase()}:`)
  );
  return item ? item.split(':')[1] : undefined;
}
