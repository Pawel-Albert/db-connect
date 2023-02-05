function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function doubleQuotesToSingle(str) {
  return str.replace(/\"/g, "'");
}

module.exports = {
  capitalizeFirstLetter,
  doubleQuotesToSingle
};
