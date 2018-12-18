const {
  validateHeadParameters,
  validateTailParameters
} = require("./inputValidationLib");
const createParameterObject = function(option, count, files) {
  return { option, count, files };
};

const parseInput = function(params) {
  if (params[0].startsWith("-")) {
    return parseWithOptions(params);
  }
  return createParameterObject("n", 10, params);
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

const parseWithOptions = function(params) {
  if (params[0] == "-c" || params[0] == "-n") {
    return createParameterObject(params[0][1], params[1], params.slice(2));
  }
  if (!isNaN(Math.abs(params[0]))) {
    return createParameterObject("n", Math.abs(params[0]), params.slice(1));
  }
  return createParameterObject(
    params[0][1],
    params[0].slice(2),
    params.slice(1)
  );
};

module.exports = {
  parseInput,
  parseValidatedInput
};
