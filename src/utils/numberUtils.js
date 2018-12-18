const isNaturalNumber = function(count) {
  return count > 0 && count % 1 == 0;
};

const isInteger = function(number) {
  return !isNaN(number) && number % 1 == 0;
};
module.exports = {
  isNaturalNumber,
  isInteger
};
