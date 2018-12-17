const {
  parseInput,
  createParameterObject,
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

describe("createParameterObject", function() {
  it("should return all three parameters passed in function as object", function() {
    let expectedOutput = {
      option: "n",
      count: "10",
      files: ["file"]
    };
    deepEqual(createParameterObject("n", "10", ["file"]), expectedOutput);

    expectedOutput = {
      option: "c",
      count: "10",
      files: ["file"]
    };
    deepEqual(createParameterObject("c", "10", ["file"]), expectedOutput);

    expectedOutput = {
      option: "n",
      count: "10",
      files: ["file", "file1"]
    };
    deepEqual(
      createParameterObject("n", "10", ["file", "file1"]),
      expectedOutput
    );
  });
});

describe("validate count", function() {
  it("should return an object with status true and a empty message for a valid count", function() {
    let expectedOutput = {
      status: true,
      message: ""
    };
    deepEqual(validateCount({ option: "c", count: 1 }), expectedOutput);
  });

  it("should return an object with status false and error message in message for a negative value", function() {
    let expectedOutput = {
      status: false,
      message: "head: illegal byte count -- -1"
    };
    deepEqual(validateCount({ option: "c", count: -1 }), expectedOutput);
  });
});

describe("validateOption", function() {
  it("should return true for all except n and c", function() {
    deepEqual(validateOption({ option: "g", command: "head" }), {
      status: true,
      message:
        "head: illegal option -- g\nusage: head [-n lines | -c bytes] [file ...]"
    });
  });
});

describe("validateHead", () => {
  it("should return true for all positive numbers", () => {
    deepEqual(validateHeadCount(1), true);
  });

  it("should return false for zero", () => {
    deepEqual(validateHeadCount(0), false);
  });

  it("should return false for negative numbers", () => {
    deepEqual(validateHeadCount(-1), false);
  });
});

describe("validateTailParameters", function() {
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
    deepEqual(validateTailParameters(input), expectedOutput);

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
    deepEqual(validateTailParameters(input), expectedOutput);

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
    deepEqual(validateTailParameters(input), expectedOutput);
  });

  it("should return no error message for count of zero", function() {
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
    deepEqual(validateTailParameters(input), expectedOutput);
  });
  it("should return no error message for negative values of count", function() {
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
    deepEqual(validateTailParameters(input), expectedOutput);
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
    deepEqual(validateHeadParameters(input), expectedOutput);

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
    deepEqual(validateHeadParameters(input), expectedOutput);

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
    deepEqual(validateHeadParameters(input), expectedOutput);
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
    deepEqual(validateHeadParameters(input), expectedOutput);
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
    deepEqual(validateHeadParameters(input), expectedOutput);
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
