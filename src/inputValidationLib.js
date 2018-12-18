const { isNaturalNumber, isInteger } = require("./utils/numberUtils");
const { errorMessages } = require("./errorLib.js");
const validateCount = function({ count, option }) {
  optionCountName = {
    c: "byte",
    n: "line"
  };
  if (validateHeadCount(count)) {
    return { status: true, message: "" };
  }
  return {
    message: "head: illegal " + optionCountName[option] + " count -- " + count,
    status: false
  };
};

const validateOption = function({ option, command }) {
  return {
    status: option != "c" && option != "n",
    message:
      errorMessages[command].illegalOption +
      option +
      "\n" +
      errorMessages[command].usage
  };
};

const validateTailParameters = function(tailParams) {
  let message = "";
  let status = false;
  let validateOptionResult = validateOption(tailParams);
  if (validateOptionResult.status) {
    return validateOptionResult;
  }
  if (!isInteger(tailParams.count)) {
    message = errorMessages.tail.illegalOffset + tailParams.count;
    status = true;
  }
  return { status, message };
};

const validateHeadParameters = function(headParams) {
  let message = "";
  let status = false;
  let optionValidationResult = validateOption(headParams);
  if (optionValidationResult.status) {
    return optionValidationResult;
  }

  countValidation = validateCount(headParams);
  if (!countValidation.status) {
    message = countValidation.message;
    status = true;
  }
  return { status, message };
};
const validateHeadCount = function(count) {
  return isNaturalNumber(count);
};

module.exports = {
  validateHeadParameters,
  validateTailParameters
};
