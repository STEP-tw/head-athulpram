const {
  getFileDetails,
  runHead,
  extractFileData,
  runTail
} = require("../src/lib.js");
const { deepEqual } = require("assert");

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
  file10: createFile("file10", "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n")
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
    deepEqual(getFileDetails(dummyFS, ["file1"]), [directory.file1]);
    deepEqual(getFileDetails(dummyFS, ["file2"]), [directory.file2]);
    deepEqual(getFileDetails(dummyFS, ["file3"]), [directory.file3]);
  });
  it("should return a true exists and contents in objects in an array for input of multiple files", function() {
    deepEqual(getFileDetails(dummyFS, ["file1", "file2"], "head"), [
      directory.file1,
      directory.file2
    ]);
    deepEqual(getFileDetails(dummyFS, ["file2", "file3"], "head"), [
      directory.file2,
      directory.file3
    ]);
    deepEqual(getFileDetails(dummyFS, ["file1", "file2", "file3"], "head"), [
      directory.file1,
      directory.file2,
      directory.file3
    ]);
  });

  it("should return a false exists and content as error message for file not found", function() {
    deepEqual(getFileDetails(dummyFS, ["file4"], "head"), [
      {
        name: "file4",
        exists: false,
        content: "head: file4: No such file or directory"
      }
    ]);
  });

  it("should return multiple objects with status according to file", function() {
    deepEqual(
      getFileDetails(dummyFS, ["file1", "file4", "file2"], "head")[
        ({ name: "file1", exists: true, content: "This is a test file" },
        {
          name: "file4",
          exists: false,
          content: "head: file4: No such file or directory"
        },
        { name: "file2", exists: true, content: "This is file 2" })
      ]
    );
  });
});

describe("runHead", function() {
  it("should return content of file with a maximum of 10 lines  - default values", function() {
    deepEqual(runHead(["file10"], dummyFS), "1\n2\n3\n4\n5\n6\n7\n8\n9\n10");
  });

  it("should return content of multiple files with default arguments", function() {
    let expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(runHead(["file1", "file2"], dummyFS), expectedOutput);

    expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file3 <==\nThis is third file \n With 2 lines of content";
    deepEqual(runHead(["file1", "file3"], dummyFS), expectedOutput);
  });

  it("should return content of file with input of n and line numbers", function() {
    let expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(runHead(["-n3", "file1", "file2"], dummyFS), expectedOutput);
  });

  it("should return content of the file with input of c and byte count", function() {
    let expectedOutput = "==> file1 <==\nThi\n\n==> file2 <==\nThi";
    deepEqual(runHead(["-c3", "file1", "file2"], dummyFS), expectedOutput);
  });

  it("should return first line of each file", function() {
    let expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(runHead(["-1", "file1", "file2"], dummyFS), expectedOutput);
  });

  it("should return error messages for the file not found", function() {
    let expectedOutput = "head: file4: No such file or directory";
    deepEqual(runHead(["file4"], dummyFS), expectedOutput);
  });

  it("should return illegal option error and usagecases", () => {
    expectedOutput =
      "head: illegal option -- g\nusage: head [-n lines | -c bytes] [file ...]";
    deepEqual(runHead(["-g4", "file1"], dummyFS), expectedOutput);
  });
  it("should reuturn illegal line count for zero input in head", () => {
    expectedOutput = "head: illegal line count -- 0";
    deepEqual(runHead(["-n0", "file1"], dummyFS), expectedOutput);
  });
  it("should reuturn illegal byte count error", () => {
    expectedOutput = "head: illegal byte count -- 0";
    deepEqual(runHead(["-c0", "file1"], dummyFS), expectedOutput);
  });
});

describe("runTail", function() {
  it("should return content of file with a maximum of 10 lines  - default values", function() {
    deepEqual(runTail(["file1"], dummyFS), "This is a test file");
    deepEqual(runTail(["file2"], dummyFS), "This is file 2");
  });

  it("should return a false exists and content as error message for file not found", function() {
    deepEqual(
      runTail(["file4"], dummyFS),
      "tail: file4: No such file or directory"
    );
  });

  it("should return error messages for the following", function() {
    let expectedOutput = "tail: file4: No such file or directory";
    deepEqual(runTail(["file4"], dummyFS), expectedOutput);
    expectedOutput =
      "tail: illegal option -- t\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    deepEqual(runTail(["-t", "file1"], dummyFS), expectedOutput);
    expectedOutput = "tail: illegal offset -- r";
    deepEqual(runTail(["-nr", "file1"], dummyFS), expectedOutput);
  });
});

describe("extractFileData", function() {
  it("should return an object with content of files delimiter and params", function() {
    deepEqual(
      extractFileData(
        {
          contentOfFiles: [],
          delimiter: "",
          params: { option: "n", count: "2", files: ["file1"], command: "tail" }
        },
        { name: "file1", exists: true, content: "jijdfadjfksdajfojsdpof" }
      ),
      {
        contentOfFiles: ["jijdfadjfksdajfojsdpof"],
        delimiter: "",
        params: { command: "tail", option: "n", count: "2", files: ["file1"] }
      }
    );
  });
  it("should return an object with content of files and delimiter and params", function() {
    let params = { option: "c", count: "2", files: ["file1"], command: "tail" };
    let fileDetails = {
      name: "file1",
      exists: true,
      content: "this is file content"
    };
    let expectedOutput = {
      contentOfFiles: ["nt"],
      delimiter: "",
      params: { option: "c", count: "2", command: "tail", files: ["file1"] }
    };
    deepEqual(
      extractFileData(
        { contentOfFiles: [], delimiter: "", params },
        fileDetails
      ),
      expectedOutput
    );
  });
});
