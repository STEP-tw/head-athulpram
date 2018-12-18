const {
  parseInput,
  validateCount,
  validateOption,
  validateHeadCount,
  validateTailParameters,
  validateHeadParameters,
  parseValidatedInput
} = require("../src/inputLib.js");
const { deepEqual } = require("assert");

describe("parseInput", function() {
  describe("passing only file names", function() {
    it("should return an object with count as 10 and a file name in files array while passing one file as input", function() {
      let expectedOutput = {
        option: "n",
        count: 10,
        files: ["fileName.txt"]
      };
      deepEqual(parseInput(["fileName.txt"]), expectedOutput);
    });

    it("should return an object with count as 10 and file names in files array while passing multiple file names as input", function() {
      expectedOutput = {
        option: "n",
        count: 10,
        files: ["fileName.txt", "fileName2.txt", "fileName3.txt"]
      };
      deepEqual(
        parseInput(["fileName.txt", "fileName2.txt", "fileName3.txt"]),
        expectedOutput
      );
    });
  });

  describe("test by passing count in input", function() {
    it("should return an object with option n and count, fileName in files array while passing the count & fileName as input", () => {
      let expectedOutput = {
        option: "n",
        count: 10,
        files: ["file.txt", "file2.txt", "file3.txt"]
      };
      deepEqual(
        parseInput(["-10", "file.txt", "file2.txt", "file3.txt"]),
        expectedOutput
      );
    });
  });
  describe("test by passing option n in input", function() {
    it("should return an object of option, count and fileNames when option and count passed together", function() {
      let expectedOutput = {
        option: "n",
        count: 1,
        files: ["file.txt"]
      };
      deepEqual(parseInput(["-n1", "file.txt"]), expectedOutput);
    });

    it("should return an object of option,count and fileNames when option and count passed seperately", function() {
      expectedOutput = {
        option: "n",
        count: 10,
        files: ["file.txt"]
      };
      deepEqual(parseInput(["-n", "10", "file.txt"]), expectedOutput);
    });
  });

  describe("test by passing option c in input", function() {
    it("should return an object of option c and count of given value for passing input", function() {
      let expectedOutput = {
        option: "c",
        count: 1,
        files: ["file.txt", "file2.txt"]
      };
      deepEqual(parseInput(["-c1", "file.txt", "file2.txt"]), expectedOutput);

      expectedOutput = {
        option: "c",
        count: 1,
        files: ["file.txt"]
      };
      deepEqual(parseInput(["-c", "1", "file.txt"]), expectedOutput);

      expectedOutput = {
        option: "c",
        count: 1,
        files: ["file.txt", "file2.txt"]
      };
      deepEqual(
        parseInput(["-c", "1", "file.txt", "file2.txt"]),
        expectedOutput
      );
    });
  });
});

describe("parseValidatedInput", function() {
  describe("passing only file names", function() {
    it("should return an object with count as 10 and file name in files array while passing file name as input", function() {
      let expectedOutput = {
        option: "n",
        count: 10,
        files: ["fileName.txt"],
        command: "head",
        isValid: true,
        message: ""
      };
      deepEqual(parseValidatedInput(["fileName.txt"], "head"), expectedOutput);
    });
  });
});
