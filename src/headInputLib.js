const createParameterObject = function(type, count, files) {
  return { type, count, files };
};

const parseInput = function(headParams) {
  if (headParams[0].startsWith("-")) {
    return parseWithOptions(headParams);
  }
  return createParameterObject("n", 10, headParams);
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

exports.parseInput = parseInput;
exports.parseWithOptions = parseWithOptions;
exports.createParameterObject = createParameterObject;
