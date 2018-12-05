const parseInput=function(headParams){
  if(headParams[0][0]=="-"){
    return parseWithOptions(headParams);
  }
  return createParameterObject("n",10,headParams);
}

const parseWithOptions = function(headParams){
  if(headParams[0]=="-c"||headParams[0]=="-n"){
    return createParameterObject(headParams[0][1],headParams[1],headParams.slice(2));
  }
  if(!isNaN(headParams[0].slice(1))){
    return createParameterObject("n",Math.abs(headParams[0]),headParams.slice(1));
  }
  return createParameterObject(headParams[0][1],headParams[0].slice(2),headParams.slice(1));
}

const createParameterObject = function(type,count,files){
  return {type,count,files};
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
const isFileExists=function(fs,file){
  return fs.existsSync(file);
}

const selectFileContents = function(fs,headParams,selectContents){
  let headOfFiles = [];
  for(file of headParams.files){
    let currentFileHead="";
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

const validateCount = function({count,type}){
  optionCountName = {
    c : "byte",
    n : "line"
  }
  if(count<1||isNaN(count)){
    return{
      message : "head: illegal "+optionCountName[type]+" count -- "+count,
      status : false
    };
  }
  return {status : true, message : ""};
}

const head = function(fs,headParams){
  let headOptions = {
    "n" : selectTopLines,
    "c" : selectFirstNBytes
  }
  countValidation=validateCount(headParams);
  if(!countValidation.status){
    return countValidation.message;
  }
  return headOfFiles=selectFileContents(fs,headParams,headOptions[headParams.type]);
}

exports.parseInput = parseInput;
exports.selectTopLines = selectTopLines;
exports.selectFirstNBytes = selectFirstNBytes;
exports.head = head;
exports.validateCount = validateCount;
