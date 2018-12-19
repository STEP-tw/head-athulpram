const { parseValidatedInput } = require("./inputLib.js");
const {
  reverseContents,
  extractTopLines,
  extractFirstNBytes
} = require("./utils/stringUtils.js");
const { getFileDetails } = require("./fileLib.js");

const findExtractFunction = function(option) {
  let headOptions = {
    n: extractTopLines,
    c: extractFirstNBytes
  };
  return headOptions[option];
};

const runCommandOnFiles = function(fileDetails, params) {
  let contentOfFiles = [];
  let delimiter = "";
  contentOfFiles = fileDetails.reduce(extractFileData, {
    contentOfFiles: [],
    delimiter,
    params
  }).contentOfFiles;
  return contentOfFiles.join("\n");
};

const head = function(
  headParams,
  { delimiter, name, content, selectContents }
) {
  let currentFileContent = "";
  if (headParams.files.length > 1) {
    currentFileContent = delimiter + generateFileHeader(name);
    delimiter = "\n";
  }
  currentFileContent += selectContents(content, headParams.count);
  return { currentFileContent, delimiter };
};

const extractFileData = function(
  { contentOfFiles, delimiter, params },
  { name, exists, content }
) {
  let commandFunction = {
    head: head,
    tail: tail
  };
  let selectContents = findExtractFunction(params.option);
  contentOfFiles.push(content);
  if (exists) {
    contentOfFiles.pop(content);
    let formatDetails = { delimiter, name, content, selectContents };
    let currentFileContents = commandFunction[params.command](
      params,
      formatDetails
    );
    contentOfFiles.push(currentFileContents.currentFileContent);
    delimiter = currentFileContents.delimiter;
  }
  return { contentOfFiles, delimiter, params };
};

const generateFileHeader = function(fileName) {
  return "==> " + fileName + " <==\n";
};

const tail = function(
  tailParams,
  { delimiter, name, content, selectContents }
) {
  let currentFileContent = "";
  if (tailParams.files.length > 1) {
    currentFileContent = delimiter + generateFileHeader(name);
    delimiter = "\n";
  }
  let reversedContent = reverseContents(content);
  let currentTail = selectContents(reversedContent, tailParams.count);
  currentFileContent += reverseContents(currentTail);
  return { currentFileContent, delimiter };
};

const runTail = function(inputArgs, fs) {
  let tailParams = parseValidatedInput(inputArgs, "tail");
  tailParams.command = "tail";
  let fileDetails = getFileDetails(fs, tailParams.files, "tail");

  if (!tailParams.isValid) {
    return tailParams.message;
  }
  tailParams.count = Math.abs(tailParams.count);
  return runCommandOnFiles(fileDetails, tailParams);
};

const runHead = function(inputArgs, fs) {
  let headParams = parseValidatedInput(inputArgs, "head");
  headParams.command = "head";
  let fileDetails = getFileDetails(fs, headParams.files, "head");

  if (!headParams.isValid) {
    return headParams.message;
  }
  return (headOfFiles = runCommandOnFiles(fileDetails, headParams));
};

module.exports = {
  runHead,
  runTail,
  tail,
  runCommandOnFiles,
  extractFileData
};
