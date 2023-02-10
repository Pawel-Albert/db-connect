export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function doubleQuotesToSingle(str: string) {
  return str.replace(/\"/g, "'");
}
