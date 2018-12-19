const { errorMessages } = require("./errorLib.js");
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

module.exports = {
  getFileDetails
};
