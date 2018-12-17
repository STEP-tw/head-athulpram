const { parseValidatedInput } = require("./inputLib.js");
const { reverseContents, errorMessages } = require("./utilLib.js");

const selectTopLines = function(fileContents, numberOfLines) {
  fileContents.trim();
  fileContents = fileContents.split("\n");
  return fileContents.slice(0, numberOfLines).join("\n");
};

const selectFirstNBytes = function(fileContents, numberOfBytes) {
  fileContents = fileContents.split("");
  return fileContents.slice(0, numberOfBytes).join("");
};

const findSelectFunction = function(option) {
  let headOptions = {
    n: selectTopLines,
    c: selectFirstNBytes
  };
  return headOptions[option];
};

const runHead = function(fs, inputArgs) {
  let headParams = parseValidatedInput(inputArgs, "head");
  headParams.command = "head";
  fileDetails = getFileDetails(fs, headParams.files, "head");

  if (!headParams.isValid) {
    return headParams.message;
  }
  return (headOfFiles = runCommandOnFiles(fileDetails, headParams));
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

const head = function(headParams, delimiter, name, content, selectContents) {
  let currentFileContent = "";
  if (headParams.files.length > 1) {
    currentFileContent = delimiter + "==> " + name + " <==\n";
    delimiter = "\n";
  }
  currentFileContent += selectContents(content, headParams.count);
  return { currentFileContent, delimiter };
};

const selectCrntFileData = function(
  { contentOfFiles, delimiter, params },
  { name, exists, content }
) {
  let commandFunction = {
    head: head,
    tail: tail
  };
  let selectContents = findSelectFunction(params.option);
  contentOfFiles.push(content);
  if (exists) {
    contentOfFiles.pop(content);
    let currentFileContents = commandFunction[params.command](
      params,
      delimiter,
      name,
      content,
      selectContents
    );
    contentOfFiles.push(currentFileContents.currentFileContent);
    delimiter = currentFileContents.delimiter;
  }
  return { contentOfFiles, delimiter, params };
};

const tail = function(tailParams, delimiter, name, content, selectContents) {
  let currentFileContent = "";
  if (tailParams.files.length > 1) {
    currentFileContent = delimiter + "==> " + name + " <==\n";
    delimiter = "\n";
  }
  let reversedContent = reverseContents(content);
  let currentTail = selectContents(reversedContent, tailParams.count);
  currentFileContent += reverseContents(currentTail);
  return { currentFileContent, delimiter };
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

module.exports = {
  selectTopLines,
  selectFirstNBytes,
  runHead,
  getFileDetails,
  findSelectFunction,
  runTail,
  tail,
  runCommandOnFiles,
  selectCrntFileData
};
