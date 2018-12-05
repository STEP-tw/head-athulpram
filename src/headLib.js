const parseInput=function(headParams){
  let parameters = {
    type : "n",
    count : 10,
    files : []
  }
  parameters.files=parameters.files.concat(headParams);
  return parameters;
}

const selectTopLines = function(fileContents,numberOfLines){
  fileContents=fileContents.split("\n");
  return fileContents.slice(0,numberOfLines).join("\n");
}

const selectFirstNBytes = function(fileContents,numberOfBytes){
  fileContents=fileContents.split("");
  return fileContents.slice(0,numberOfBytes).join("");
}


const head = function(fs,headParams){
  let fileContents = fs.readFileSync(headParams.files[0],"utf-8");
  return selectTopLines(fileContents,headParams.count);
}

exports.parseInput = parseInput;
exports.selectTopLines = selectTopLines;
exports.selectFirstNBytes = selectFirstNBytes;
exports.head = head;
