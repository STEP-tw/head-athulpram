const { parseInput, parseWithOptions } = require("./headInputLib.js");

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

const validateCount = function({ count, type }) {
  optionCountName = {
    c: "byte",
    n: "line"
  };
  if (count < 1 || isNaN(count)) {
    return {
      message: "head: illegal " + optionCountName[type] + " count -- " + count,
      status: false
    };
  }
  return { status: true, message: "" };
};

const validateHeadType = function(type) {
  return type != "c" && type != "n";
};

const validateParameters = function(headParams) {
  let message = "";
  let status = false;
  if (validateHeadType(headParams.type)) {
    message =
      "head: illegal option -- " +
      headParams.type +
      "\nusage: head [-n lines | -c bytes] [file ...]";
    status = true;
  }
  countValidation = validateCount(headParams);
  if (!countValidation.status) {
    message = countValidation.message;
    status = true;
  }
  return { status, message };
};

const head = function(fs, inputArgs) {
  let headParams = parseInput(inputArgs);
  fileDetails = getFileDetails(fs, headParams.files);
  validationResult = validateParameters(headParams);

  if (validationResult.status) {
    return validationResult.message;
  }
  return (headOfFiles = selectFileContents(fileDetails, headParams));
};

const getFileDetails = function(fs, headParams) {
  return headParams.map(file => {
    fileDetails = {
      name: file,
      exists: false,
      content: "head: " + file + ": No such file or directory"
    };
    if (fs.existsSync(file)) {
      fileDetails.exists = true;
      fileDetails.content = fs.readFileSync(file, "utf-8");
    }
    return fileDetails;
  });
};

const reverseContents = function(content){
  return content
  .trim()
  .split("")
  .reverse()
  .join("");
}

const tail = function(fileDetails, tailParams) {
  const selectContents = findHeadFunction(tailParams.type);
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

exports.parseInput = parseInput;
exports.selectTopLines = selectTopLines;
exports.selectFirstNBytes = selectFirstNBytes;
exports.head = head;
exports.validateCount = validateCount;
exports.selectFileContents = selectFileContents;
exports.getFileDetails = getFileDetails;
exports.findHeadFunction = findHeadFunction;
exports.validateParameters = validateParameters;
exports.validateHeadType = validateHeadType;
exports.tail = tail;
