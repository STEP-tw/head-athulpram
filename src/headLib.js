const parseInput=function(headParams){
  let parameters = {
    lines : 10,
    bytes : undefined,
    files : []
  }
  parameters.files=parameters.files.concat(headParams);
  return parameters;
}

const selectTopLines = function(fileContents,numberOfLines){
  fileContents=fileContents.split("\n");
  return fileContents.slice(0,numberOfLines).join("\n");
}

exports.parseInput = parseInput;
exports.selectTopLines = selectTopLines;
