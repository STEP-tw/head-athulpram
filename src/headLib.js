const parseInput=function(headParams){
  parameters = {
    lines : 10,
    bytes : undefined,
    files : []
  }
  parameters.files=parameters.files.concat(headParams);
  return parameters;
}

exports.parseInput = parseInput;
