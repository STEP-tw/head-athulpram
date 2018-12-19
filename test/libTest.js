const { runCommand, extractFileData } = require("../src/lib.js");
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

describe("runCommand", function() {
  it("should return content of file with a maximum of 10 lines  - default values", function() {
    let expectedOutput = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    deepEqual(runCommand(["head", "file10"], dummyFS), expectedOutput);
  });

  it("should return content of multiple files with default arguments", function() {
    let expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(runCommand(["head", "file1", "file2"], dummyFS), expectedOutput);

    expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file3 <==\nThis is third file \n With 2 lines of content";
    deepEqual(runCommand(["head", "file1", "file3"], dummyFS), expectedOutput);
  });

  it("should return content of file with input of n and line numbers", function() {
    let expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(
      runCommand(["head", "-n3", "file1", "file2"], dummyFS),
      expectedOutput
    );
  });

  it("should return content of the file with input of c and byte count", function() {
    let expectedOutput = "==> file1 <==\nThi\n\n==> file2 <==\nThi";
    deepEqual(
      runCommand(["head", "-c3", "file1", "file2"], dummyFS),
      expectedOutput
    );
  });

  it("should return first line of each file", function() {
    let expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(
      runCommand(["head", "-1", "file1", "file2"], dummyFS),
      expectedOutput
    );
  });

  it("should return error messages for the file not found", function() {
    let expectedOutput = "head: file4: No such file or directory";
    deepEqual(runCommand(["head", "file4"], dummyFS), expectedOutput);
  });

  it("should return illegal option error and usagecases", () => {
    expectedOutput =
      "head: illegal option -- g\nusage: head [-n lines | -c bytes] [file ...]";
    deepEqual(runCommand(["head", "-g4", "file1"], dummyFS), expectedOutput);
  });
  it("should reuturn illegal line count for zero input in head", () => {
    expectedOutput = "head: illegal line count -- 0";
    deepEqual(runCommand(["head", "-n0", "file1"], dummyFS), expectedOutput);
  });
  it("should reuturn illegal byte count error", () => {
    expectedOutput = "head: illegal byte count -- 0";
    deepEqual(runCommand(["head", "-c0", "file1"], dummyFS), expectedOutput);
  });
  it("should return illegal line count error for negative numbers", () => {
    expectedOutput = "head: illegal line count -- -2";
    deepEqual(runCommand(["head", "-n-2", "file1"], dummyFS), expectedOutput);
  });

  it("should return content of file with a maximum of 10 lines  - default values", function() {
    let expectedOutput = "3\n4\n5\n6\n7\n8\n9\n10\n11\n12";
    deepEqual(runCommand(["tail", "file10"], dummyFS), expectedOutput);
  });

  it("should return content of multiple files with default arguments", function() {
    let expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(runCommand(["tail", "file1", "file2"], dummyFS), expectedOutput);
  });

  it("should return content of file with input of n and line numbers", function() {
    let expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file10 <==\n10\n11\n12";
    deepEqual(
      runCommand(["tail", "-n3", "file1", "file10"], dummyFS),
      expectedOutput
    );
  });

  it("should return content of the file with input of c and byte count", function() {
    let expectedOutput = "==> file1 <==\nile\n\n==> file2 <==\ne 2";
    deepEqual(
      runCommand(["tail", "-c3", "file1", "file2"], dummyFS),
      expectedOutput
    );
  });

  it("should return first line of each file", function() {
    let expectedOutput =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(
      runCommand(["tail", "-1", "file1", "file2"], dummyFS),
      expectedOutput
    );
  });

  it("should return error messages for the file not found", function() {
    let expectedOutput = "tail: file4: No such file or directory";
    deepEqual(runCommand(["tail", "file4"], dummyFS), expectedOutput);
  });

  it("should return illegal option error and usagecases", () => {
    expectedOutput =
      "tail: illegal option -- g\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    deepEqual(runCommand(["tail", "-g4", "file1"], dummyFS), expectedOutput);
  });
  it("should reuturn illegal line count for zero input in head", () => {
    expectedOutput = "";
    deepEqual(runCommand(["tail", "-n0", "file1"], dummyFS), expectedOutput);
  });
  it("should reuturn illegal byte count error", () => {
    expectedOutput = "";
    deepEqual(runCommand(["tail", "-c0", "file1"], dummyFS), expectedOutput);
  });

  it("should return illegal offset when giving a non number", () => {
    let expectedOutput = "tail: illegal offset -- w";
    deepEqual(runCommand(["tail", "-nw", "file1"], dummyFS), expectedOutput);
  });

  it("should return lines for negative numbers", () => {
    expectedOutput = "This is a test file";
    deepEqual(runCommand(["tail", "-n-2", "file1"], dummyFS), expectedOutput);
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
