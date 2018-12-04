const parseInput=function(headParams){
  result = {
    lines : 10,
    bytes : undefined,
    files : []
  }
  result.files=result.files.concat(headParams);
  return result;
}

exports.parseInput = parseInput;
