const { parseInput,validateHeadCount,validateCount,validateOption,validateTailParameters,validateHeadParameters} = require("./inputLib.js");
const { isNaturalNumber, reverseContents,errorMessages} = require("./utilLib.js")

const selectTopLines = function(fileContents, numberOfLines) {
  fileContents.trim();
  fileContents = fileContents.split("\n");
  return fileContents.slice(0, numberOfLines).join("\n");
};

const selectFirstNBytes = function(fileContents, numberOfBytes) {
  fileContents = fileContents.split("");
  return fileContents.slice(0, numberOfBytes).join("");
};

const findHeadFunction = function(type) {
  let headOptions = {
    n: selectTopLines,
    c: selectFirstNBytes
  };
  return headOptions[type];
};

const selectFileContents = function(fileDetails, headParams) {
  const selectContents = findHeadFunction(headParams.type);
  let headOfFiles = [];
  let delimiter = "";
  fileDetails.forEach(({ name, exists, content }) => {
    headOfFiles.push(content);
    if (exists) {
      headOfFiles.pop(content);
      let currentFileHead = "";
      if (headParams.files.length > 1) {
        currentFileHead = delimiter + "==> " + name + " <==\n";
        delimiter = "\n";
      }
      currentFileHead += selectContents(content, headParams.count);
      headOfFiles.push(currentFileHead);
    }
  });
  return headOfFiles.join("\n");
};




const head = function(fs, inputArgs) {
  let headParams = parseInput(inputArgs);
  headParams.command = "head";
  fileDetails = getFileDetails(fs, headParams.files, "head");
  validationResult = validateHeadParameters(headParams);

  if (validationResult.status) {
    return validationResult.message;
  }
  return (headOfFiles = selectFileContents(fileDetails, headParams));
};

const getFileDetails = function(fs, headParams, command) {
  return headParams.map(file => {
    fileDetails = {
      name: file,
      exists: false,
      content: command+": " + file + errorMessages.noFile
    };
    if (fs.existsSync(file)) {
      fileDetails.exists = true;
      fileDetails.content = fs.readFileSync(file, "utf-8");
    }
    return fileDetails;
  });
};



const tail = function(fileDetails, tailParams) {
  let selectContents = findHeadFunction(tailParams.type);
  let tailOfFiles = [];
  let delimiter = "";
  fileDetails.forEach(({ name, exists, content }) => {
    tailOfFiles.push(content);
    if (exists) {
      tailOfFiles.pop(content);
      let currentFileTail = "";
      if (tailParams.files.length > 1) {
        currentFileTail = delimiter + "==> " + name + " <==\n";
        delimiter = "\n";
      }
      let reversedContent = reverseContents(content);
      let currentTail = selectContents(reversedContent,tailParams.count);
      currentFileTail += reverseContents(currentTail);
      tailOfFiles.push(currentFileTail);
    }
  });
  return tailOfFiles.join("\n");
};


const runTail = function(fs,inputArgs){
  let tailParams = parseInput(inputArgs);
  tailParams.command = "tail";
  fileDetails = getFileDetails(fs, tailParams.files, "tail");
  validationResult = validateTailParameters(tailParams);

  if (validationResult.status) {
    return validationResult.message;
  }
  tailParams.count = Math.abs(tailParams.count)
  return tail(fileDetails, tailParams);
}

exports.parseInput = parseInput;
exports.selectTopLines = selectTopLines;
exports.selectFirstNBytes = selectFirstNBytes;
exports.head = head;
exports.validateCount = validateCount;
exports.selectFileContents = selectFileContents;
exports.getFileDetails = getFileDetails;
exports.findHeadFunction = findHeadFunction;
exports.validateHeadParameters = validateHeadParameters;
exports.runTail = runTail;
exports.tail = tail;