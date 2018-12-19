const { deepEqual } = require("assert");
const { getFileDetails } = require("../src/fileLib");

const createFile = function(name, content) {
  return {
    name,
    content,
    exists: true
  };
};

let directory = {
  file1: createFile("file1", "This is a test file"),
  file2: createFile("file2", "This is file 2"),
  file3: createFile("file3", "This is third file \n With 2 lines of content"),
  file10: createFile("file10", "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12")
};

dummyFS = {
  existsSync: function(fileName) {
    if (Object.keys(directory).includes(fileName)) {
      return true;
    }
    return false;
  },
  readFileSync: function(fileName, encoding) {
    if (encoding == "utf-8") {
      return directory[fileName].content;
    }
  }
};

describe("getFileDetails", function() {
  it("should return a true exists and contents in an object of 0 th index of array for an input of one file", function() {
    let expectedOutput = [directory.file1];
    deepEqual(getFileDetails(dummyFS, ["file1"]), expectedOutput);
  });
  it("should return a true exists and contents in objects in an array for input of multiple files", function() {
    let expectedOutput = [directory.file1, directory.file2];
    deepEqual(
      getFileDetails(dummyFS, ["file1", "file2"], "head"),
      expectedOutput
    );
  });

  it("should return a false exists and content as error message for file not found", function() {
    let expectedOutput = [
      {
        name: "file4",
        exists: false,
        content: "head: file4: No such file or directory"
      }
    ];
    deepEqual(getFileDetails(dummyFS, ["file4"], "head"), expectedOutput);
  });

  it("should return multiple objects with status according to file", function() {
    let expectedOutput = [
      { name: "file1", exists: true, content: "This is a test file" },
      {
        name: "file4",
        exists: false,
        content: "head: file4: No such file or directory"
      },
      { name: "file2", exists: true, content: "This is file 2" }
    ];
    deepEqual(
      getFileDetails(dummyFS, ["file1", "file4", "file2"], "head"),
      expectedOutput
    );
  });
});
