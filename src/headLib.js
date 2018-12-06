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

const findHeadFunction = function(type){
  let headOptions = {
    "n" : selectTopLines,
    "c" : selectFirstNBytes
  }
  return headOptions[type];
}

const selectFileContents = function(fileDetails,headParams){
  const selectContents = findHeadFunction(headParams.type);
  let headOfFiles = [];
  let delimiter="";
  fileDetails.forEach(({name,exists,content})=>{
    headOfFiles.push(content);
    if(exists){
      headOfFiles.pop(content);
      let currentFileHead="";
      if(headParams.files.length>1){
        currentFileHead=(delimiter+"==> "+name+" <==\n");
        delimiter="\n";
      }
      currentFileHead+=(selectContents(content,headParams.count)); 
      headOfFiles.push(currentFileHead)
    }
  }
  );
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
  if(headParams.type!="c" && headParams.type!="n"){
    return "head: illegal option -- "+headParams.type+"\nusage: head [-n lines | -c bytes] [file ...]"
  }

  countValidation=validateCount(headParams);
  if(!countValidation.status){
    return countValidation.message;
  }

  fileDetails = getFileDetails(fs,headParams.files)

  return headOfFiles=selectFileContents(fileDetails,headParams);
}

const getFileDetails = function(fs,headParams){
  return headParams.map((file)=>{
    fileDetails = {
      name : file,
      exists : false,
      content : "head: "+file+": No such file or directory"
    }
    if(fs.existsSync(file)){
      fileDetails.exists = true;
      fileDetails.content = fs.readFileSync(file,"utf-8");
    }
    return fileDetails;
  });
}

exports.parseInput = parseInput;
exports.selectTopLines = selectTopLines;
exports.selectFirstNBytes = selectFirstNBytes;
exports.head = head;
exports.validateCount = validateCount;
exports.parseWithOptions = parseWithOptions;
exports.createParameterObject = createParameterObject;
