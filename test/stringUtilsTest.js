const {
  extractTopLines,
  extractFirstNBytes,
  reverseContents
} = require("../src/utils/stringUtils.js");
const { deepEqual } = require("assert");

describe("extractTopLines", function() {
  describe("select top lines based on number of lines", function() {
    it("should return top 10 lines of a string", function() {
      let inputString = "1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10\n 11\n";
      let expectedOutput = "1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10";
      deepEqual(extractTopLines(inputString, 10), expectedOutput);
    });

    it("should return top 1 lines of a string", function() {
      let inputString = "1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10\n 11\n";
      deepEqual(extractTopLines(inputString, 1), "1");
    });

    it("should return empty string when number of lines is 0", function() {
      let inputString = "1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10\n 11\n";
      deepEqual(extractTopLines(inputString, 0), "");
    });

    it("should return whole string if the count is more than number of lines", function() {
      let inputString = "1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10\n 11\n";
      let expectedOutput = "1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10\n 11\n";
      deepEqual(extractTopLines(inputString, 20), expectedOutput);
    });
  });
  it("should return an empty string when the string is empty", function() {
    deepEqual(extractTopLines("", 10), "");
  });
});

describe("extractFirstNBytes", function() {
  let inputString = "this is first line \n this is second line";
  it("should return first 5 bytes for the input of 5 number of bytes", function() {
    deepEqual(extractFirstNBytes(inputString, 5), "this ");
  });

  it("should return empty string when 0 byte number is given", function() {
    deepEqual(extractFirstNBytes(inputString, 0), "");
  });

  it("should return whole string if the number of bytes is more than the total bytes", function() {
    inputString = "this is a string";
    let expectedOutput = "this is a string";
    deepEqual(extractFirstNBytes(inputString, 20), expectedOutput);
  });

  it("should return an empty string for an input of empty string", function() {
    expectedOutput = "";
    deepEqual(extractFirstNBytes("", 5), expectedOutput);
  });
});

describe("reverseContents", () => {
    it("should return reverse of given string", () => {
        deepEqual(reverseContents("abcdefghijklm"), "mlkjihgfedcba");
        deepEqual(reverseContents("1234"), "4321");
    });
    it("should return an empty string for an input of empty string", () => {
        deepEqual(reverseContents(""), "");
    })
});