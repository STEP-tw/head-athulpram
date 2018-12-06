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
  if(!isNaN(Math.abs(headParams[0]))){
    return createParameterObject("n",Math.abs(headParams[0]),headParams.slice(1));
  }
    return createParameterObject(headParams[0][1],headParams[0].slice(2),headParams.slice(1));
}

const createParameterObject = function(type,count,files){
  return {type,count,files};
}

const selectTopLines = function(fileContents,numberOfLines){
  fileContents.trim();
  fileContents=fileContents.split("\n");
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
  let delimiter="";
  for(file of headParams.files){
    headOfFiles.push("head: "+file+": No such file or directory");
    if(isFileExists(fs,file)){
      headOfFiles.pop();
      let currentFileHead="";
      if(headParams.files.length>1){
        currentFileHead=(delimiter+"==> "+file+" <==\n");
        delimiter="\n";
      }
      let fileContents=fs.readFileSync(file,"utf-8");
      currentFileHead+=(selectContents(fileContents,headParams.count)); 
      headOfFiles.push(currentFileHead)
    }
  }
  if(headParams.type == "c"){
    return headOfFiles.join("");
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

const head = function(fs,inputArgs){
  let headParams = parseInput(inputArgs)
  let headOptions = {
    "n" : selectTopLines,
    "c" : selectFirstNBytes
  }
  if(headParams.type!="c" && headParams.type!="n"){
    return "head: illegal option -- "+headParams.type+"\nusage: head [-n lines | -c bytes] [file ...]"
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
