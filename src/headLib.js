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
  fileContents.splice(fileContents.length-1)
  return fileContents.slice(0,numberOfLines).join("\n");
}

const selectFirstNBytes = function(fileContents,numberOfBytes){
  fileContents=fileContents.split("");
  return fileContents.slice(0,numberOfBytes).join("");
}

const selectFileContents = function(fs,headParams,selectContents){
  let headOfFiles = [];
  for(file of headParams.files){
    let currentFileHead = "";
    if(headParams.files.length>1){
      currentFileHead=("==> "+file+" <==\n");
    }
    let fileContents=fs.readFileSync(file,"utf-8");
    currentFileHead+=(selectContents(fileContents,headParams.count));
    headOfFiles.push(currentFileHead)
  }
  return headOfFiles.join("\n\n")
}

const head = function(fs,headParams){
  let headOptions = {
    "n" : selectTopLines,
    "c" : selectFirstNBytes
  }
  return headOfFiles=selectFileContents(fs,headParams,headOptions[headParams.type]);
}

exports.parseInput = parseInput;
exports.selectTopLines = selectTopLines;
exports.selectFirstNBytes = selectFirstNBytes;
exports.head = head;
