const selectTopLines = function(fileContents, numberOfLines) {
  fileContents.trim();
  fileContents = fileContents.split("\n");
  return fileContents.slice(0, numberOfLines).join("\n");
};

const selectFirstNBytes = function(fileContents, numberOfBytes) {
  fileContents = fileContents.split("");
  return fileContents.slice(0, numberOfBytes).join("");
};

module.exports = {
  selectFirstNBytes,
  selectTopLines
};
