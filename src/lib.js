const {
  parseInput,
  parseValidatedInput,
  validateHeadCount,
  validateCount,
  validateOption,
  validateTailParameters,
  validateHeadParameters
} = require("./inputLib.js");
const {
  isNaturalNumber,
  reverseContents,
  errorMessages
} = require("./utilLib.js");

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

const runHead = function(fs, inputArgs) {
  let headParams = parseValidatedInput(inputArgs, "head");
  headParams.command = "head";
  fileDetails = getFileDetails(fs, headParams.files, "head");

  if (!headParams.isValid) {
    return headParams.message;
  }
  return (headOfFiles = selectFileContents(fileDetails, headParams));
};

const getFileDetails = function(fs, headParams, command) {
  return headParams.map(file => {
    fileDetails = {
      name: file,
      exists: false,
      content: command + ": " + file + errorMessages.noFile
    };
    if (fs.existsSync(file)) {
      fileDetails.exists = true;
      fileDetails.content = fs.readFileSync(file, "utf-8");
    }
    return fileDetails;
  });
};

const runCommandOnFiles = function(fileDetails, params) {
  let contentOfFiles = [];
  let delimiter = "";
  contentOfFiles = fileDetails.reduce(selectCrntFileData, {
    contentOfFiles: [],
    delimiter,
    params
  }).contentOfFiles;
  return contentOfFiles.join("\n");
};

const selectCrntFileData = function(
  { contentOfFiles, delimiter, params },
  { name, exists, content }
) {
  let selectContents = findHeadFunction(params.type);
  contentOfFiles.push(content);
  if (exists) {
    contentOfFiles.pop(content);
    let currentFileContents = tail(params,delimiter,name,content,selectContents);
    contentOfFiles.push(currentFileContents.currentFileContent);
    delimiter = currentFileContents.delimiter;
  }
  return { contentOfFiles, delimiter, params };
};

const tail = function(tailParams,delimiter,name,content,selectContents) {
  let currentFileContent = "";
  if (tailParams.files.length > 1) {
    currentFileContent = delimiter + "==> " + name + " <==\n";
    delimiter = "\n";
  }
  let reversedContent = reverseContents(content);
  let currentTail = selectContents(reversedContent, tailParams.count);
  currentFileContent += reverseContents(currentTail);
  return {currentFileContent,delimiter}
};

const runTail = function(fs, inputArgs) {
  let tailParams = parseValidatedInput(inputArgs, "tail");
  tailParams.command = "tail";
  fileDetails = getFileDetails(fs, tailParams.files, "tail");

  if (!tailParams.isValid) {
    return tailParams.message;
  }
  tailParams.count = Math.abs(tailParams.count);
  return runCommandOnFiles(fileDetails, tailParams);
};

exports.parseInput = parseInput;
exports.selectTopLines = selectTopLines;
exports.selectFirstNBytes = selectFirstNBytes;
exports.runHead = runHead;
exports.validateCount = validateCount;
exports.selectFileContents = selectFileContents;
exports.getFileDetails = getFileDetails;
exports.findHeadFunction = findHeadFunction;
exports.validateHeadParameters = validateHeadParameters;
exports.runTail = runTail;
exports.tail = tail;
exports.runCommandOnFiles = runCommandOnFiles;
exports.selectCrntFileData = selectCrntFileData;