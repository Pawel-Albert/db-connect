function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function doubleQuotesToSingle(str) {
  return str.replace(/\"/g, "'");
}

function arrayExtractValue(array, key) {
  const item = array.find(string =>
    string.toUpperCase().startsWith(`${key.toUpperCase()}:`)
  );
  return item ? item.split(':')[1] : undefined;
}
module.exports = {
  capitalizeFirstLetter,
  doubleQuotesToSingle,
  arrayExtractValue
};
