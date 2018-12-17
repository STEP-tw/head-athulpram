const { errorMessages, isNaturalNumber } = require("./utilLib.js");
const createParameterObject = function(type, count, files) {
  return { type, count, files };
};

const parseInput = function(headParams) {
  if (headParams[0].startsWith("-")) {
    return parseWithOptions(headParams);
  }
  return createParameterObject("n", 10, headParams);
};

const parseValidatedInput = function(usrArgs, command) {
  let params = parseInput(usrArgs);
  params.command = command;
  validateMethod = {
    head: validateHeadParameters,
    tail: validateTailParameters
  };
  let validatedResult = validateMethod[command](params);
  params.isValid = !validatedResult.status;
  params.message = validatedResult.message;
  return params;
};

const parseWithOptions = function(headParams) {
  if (headParams[0] == "-c" || headParams[0] == "-n") {
    return createParameterObject(
      headParams[0][1],
      headParams[1],
      headParams.slice(2)
    );
  }
  if (!isNaN(Math.abs(headParams[0]))) {
    return createParameterObject(
      "n",
      Math.abs(headParams[0]),
      headParams.slice(1)
    );
  }
  return createParameterObject(
    headParams[0][1],
    headParams[0].slice(2),
    headParams.slice(1)
  );
};
const validateHeadCount = function(count) {
  return isNaturalNumber(count) && !isNaN(count);
};

const validateCount = function({ count, type }) {
  optionCountName = {
    c: "byte",
    n: "line"
  };
  if (validateHeadCount(count)) {
    return { status: true, message: "" };
  }
  return {
    message: "head: illegal " + optionCountName[type] + " count -- " + count,
    status: false
  };
};

const validateOption = function({ type, command }) {
  return {
    status: type != "c" && type != "n",
    message:
      errorMessages[command].illegalOption +
      type +
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
  if (isNaN(tailParams.count)) {
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

exports.parseInput = parseInput;
exports.createParameterObject = createParameterObject;
exports.validateCount = validateCount;
exports.validateHeadCount = validateHeadCount;
exports.validateOption = validateOption;
exports.validateTailParameters = validateTailParameters;
exports.validateHeadParameters = validateHeadParameters;
exports.parseValidatedInput = parseValidatedInput;
