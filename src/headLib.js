const parseInput=function(headParams){
  if(headParams[0][0]=="-"){
    return parseWithOptions(headParams);
  }
  return {
    type :"n",
    count : 10,
    files : headParams
  } 
}
const parseWithOptions = function(headParams){
  if(headParams[0]=="-c"||headParams[0]=="-n"){
    return { type : headParams[0][1],
      count : headParams[1],
      files : headParams.slice(2)
    }
  }
  if(!isNaN(headParams[0].slice(1))){
    return {type : "n",
      count : Math.abs(headParams[0]),
      files : headParams.slice(1)
    }
  }
  return {
    type:headParams[0][1],
    count : headParams[0].slice(2),
    files :headParams.slice(1)
  }
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
  if(headParams.type == "n"){
    return headOfFiles.join("\n\n");
  } 
  return headOfFiles.join("\n")
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
