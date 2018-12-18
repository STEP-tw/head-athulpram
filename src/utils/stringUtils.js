const extractTopLines = function(fileContents, numberOfLines) {
  fileContents.trim();
  fileContents = fileContents.split("\n");
  return fileContents.slice(0, numberOfLines).join("\n");
};

const extractFirstNBytes = function(fileContents, numberOfBytes) {
  fileContents = fileContents.split("");
  return fileContents.slice(0, numberOfBytes).join("");
};

const reverseContents = function(content) {
  return content
    .trim()
    .split("")
    .reverse()
    .join("");
};

module.exports = {
  extractFirstNBytes,
  extractTopLines,
  reverseContents
};
