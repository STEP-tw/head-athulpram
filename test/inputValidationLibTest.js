const {
  validateHeadParameters,
  validateTailParameters
} = require("../src/inputValidationLib.js");
const assert = require("assert");

describe("validateTailParameters", function() {
  it("should return object with status false and an empty meassage for a valid input with option n", function() {
    let input = {
      option: "n",
      count: "3",
      files: ["file1"],
      command: "tail"
    };
    let expectedOutput = {
      status: false,
      message: ""
    };
    assert.deepEqual(validateTailParameters(input), expectedOutput);
  });
  it("should return object with status false for input of option c and valid parameters", function() {
    input = {
      option: "c",
      count: "10",
      files: ["file1"],
      command: "tail"
    };
    expectedOutput = {
      status: false,
      message: ""
    };
    assert.deepEqual(validateTailParameters(input), expectedOutput);
  });

  it("should return no error message and status as false for count of zero and option n", function() {
    let input = {
      option: "n",
      count: "0",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: false,
      message: ""
    };
    assert.deepEqual(validateTailParameters(input), expectedOutput);
  });
  it("should return no error message and status as false for count of zero and option c", function() {
    let input = {
      option: "c",
      count: "0",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: false,
      message: ""
    };
    assert.deepEqual(validateTailParameters(input), expectedOutput);
  });
  it("should return no error message and status will be false for negative values of count", function() {
    let input = {
      option: "n",
      count: "-1",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: false,
      message: ""
    };
    assert.deepEqual(validateTailParameters(input), expectedOutput);
  });

  it("should return error message and status as true for giving alphabets as input count and option n", function() {
    let input = {
      option: "n",
      count: "an",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: true,
      message: "tail: illegal offset -- an"
    };
    assert.deepEqual(validateTailParameters(input), expectedOutput);
  });
  it("should return error message and status as true for giving alphabets as input count and option c", function() {
    let input = {
      option: "c",
      count: "an",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: true,
      message: "tail: illegal offset -- an"
    };
    assert.deepEqual(validateTailParameters(input), expectedOutput);
  });

  it("should return status as true and meassage for invalid option for a wrong option of alphabet", function() {
    let input = {
      option: "m",
      count: "5",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: true,
      message:
        "tail: illegal option -- m\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    };
    assert.deepEqual(validateTailParameters(input), expectedOutput);
  });

  it("should return status as true and meassage for invalid option for a wrong option as special characters", function() {
    let input = {
      option: "%",
      count: "5",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: true,
      message:
        "tail: illegal option -- %\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
    };
    assert.deepEqual(validateTailParameters(input), expectedOutput);
  });
});

describe("validateHeadParameters", function() {
  it("should return object with status according to parameters", function() {
    let input = {
      option: "n",
      count: "3",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: false,
      message: ""
    };
    assert.deepEqual(validateHeadParameters(input), expectedOutput);

    input = {
      option: "c",
      count: "10",
      files: ["file1"],
      command: "tail"
    };

    expectedOutput = {
      status: false,
      message: ""
    };
    assert.deepEqual(validateHeadParameters(input), expectedOutput);

    input = {
      option: "n",
      count: "10",
      files: ["file1"],
      command: "tail"
    };

    expectedOutput = {
      status: false,
      message: ""
    };
    assert.deepEqual(validateHeadParameters(input), expectedOutput);
  });
  it("should return no error message for count of zero", function() {
    let input = {
      option: "n",
      count: "0",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: true,
      message: "head: illegal line count -- 0"
    };
    assert.deepEqual(validateHeadParameters(input), expectedOutput);
  });
  it("should return no error message for negative values of count", function() {
    let input = {
      option: "n",
      count: "-1",
      files: ["file1"],
      command: "tail"
    };

    let expectedOutput = {
      status: true,
      message: "head: illegal line count -- -1"
    };
    assert.deepEqual(validateHeadParameters(input), expectedOutput);
  });
});
