const {
  validateHeadParameters,
  validateTailParameters
} = require("./inputValidationLib");
const createParameterObject = function(option, count, files) {
  return { option, count, files };
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

module.exports = {
  parseInput,
  createParameterObject,
  parseValidatedInput
};
