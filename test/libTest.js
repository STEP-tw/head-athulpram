const {
  selectFileContents,
  selectTopLines,
  selectFirstNBytes,
  validateCount,
  getFileDetails,
  findFirstNBytes,
  findHeadFunction,
  head,
  selectLastLines,
  selectLastNBytes,
  validateHeadType,
  validateParameters,
  tail,
  runTail
} = require("../src/lib.js");
const { deepEqual } = require("assert");

describe("selectTopLines", function() {
  describe("select top lines based on number of lines", function() {
    let inputString = "1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10\n 11\n";

    it("should return top 10 lines of a string", function() {
      deepEqual(
        selectTopLines(inputString, 10),
        "1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10"
      );
    });

    it("should return top 10 lines of a string", function() {
      deepEqual(selectTopLines(inputString, 1), "1");
    });

    it("should return empty string when number of lines is 0", function() {
      deepEqual(selectTopLines(inputString, 0), "");
    });
  });
});

describe("selectFirstNBytes", function() {
  let inputString = "this is first line \n this is second line";
  it("should return first 5 bytes for the input of 5 number of bytes", function() {
    deepEqual(selectFirstNBytes(inputString, 5), "this ");
    deepEqual(selectFirstNBytes(inputString, 15), "this is first l");
  });

  it("should return empty string when 0 byte number is given", function() {
    deepEqual(selectFirstNBytes(inputString, 0), "");
  });
});

describe("validate count", function() {
  it("should return an object with status true and a empty message for a valid count", function() {
    deepEqual(validateCount({ type: "c", count: 1 }), {
      status: true,
      message: ""
    });
    deepEqual(validateCount({ type: "n", count: 2 }), {
      status: true,
      message: ""
    });
  });

  it("should return an object with status false and error message in message", function() {
    deepEqual(validateCount({ type: "c", count: -1 }), {
      status: false,
      message: "head: illegal byte count -- -1"
    });
    deepEqual(validateCount({ type: "n", count: -2 }), {
      status: false,
      message: "head: illegal line count -- -2"
    });
  });
});
describe("selectFileContents", function() {
  it("should return all of file contents for an input of file details with single line", function() {
    deepEqual(
      selectFileContents(
        [{ name: "file1", content: "This is a file", exists: true }],
        { type: "n", count: "10", files: ["file1"] }
      ),
      "This is a file"
    );
  });
  let file1 = {
    name: "file1",
    content: "This is a file content \n this is a file content",
    exists: true
  };
  let file2 = {
    name: "file2",
    content: "this is a file content",
    exists: true
  };
  let exp_out =
    "==> file1 <==\nThis is a file content \n this is a file content\n\n==> file2 <==\nthis is a file content";
  it("should return all of the file contents for an input of multiple files", function() {
    deepEqual(
      selectFileContents([file1, file2], {
        type: "n",
        count: "10",
        files: ["file1", "file2"]
      }),
      exp_out
    );
  });
  it("should return all of the file contents for an input of multiple files", function() {
    exp_out = "==> file1 <==\nThis is a \n\n==> file2 <==\nthis is a ";
    deepEqual(
      selectFileContents([file1, file2], {
        type: "c",
        count: "10",
        files: ["file1", "file2"]
      }),
      exp_out
    );
  });
});

//Testing functions which takes fs as argument

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
  file3: createFile("file3", "This is third file \n With 2 lines of content")
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
  it("should return a true exists and contents in an object of 0 th index of array for an inpput of one file", function() {
    deepEqual(getFileDetails(dummyFS, ["file1"]), [directory.file1]);
    deepEqual(getFileDetails(dummyFS, ["file2"]), [directory.file2]);
    deepEqual(getFileDetails(dummyFS, ["file3"]), [directory.file3]);
  });
  it("should return a true exists and contents in objects in an array for input of multiple files", function() {
    deepEqual(getFileDetails(dummyFS, ["file1", "file2"],"head"), [
      directory.file1,
      directory.file2
    ]);
    deepEqual(getFileDetails(dummyFS, ["file2", "file3"],"head"), [
      directory.file2,
      directory.file3
    ]);
    deepEqual(getFileDetails(dummyFS, ["file1", "file2", "file3"],"head"), [
      directory.file1,
      directory.file2,
      directory.file3
    ]);
  });

  it("should return a false exists and content as error message for file not found", function() {
    deepEqual(getFileDetails(dummyFS, ["file4"],"head"), [
      {
        name: "file4",
        exists: false,
        content: "head: file4: No such file or directory"
      }
    ]);
  });

  it("should return multiple objects with status according to file", function() {
    deepEqual(
      getFileDetails(dummyFS, ["file1", "file4", "file2"],"head")[
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

describe("findHeadFunction", function() {
  it("should return function selectTopLines", function() {
    deepEqual(findHeadFunction("n"), selectTopLines);
  });
  it("should return function selectFirstNBytes", function() {
    deepEqual(findHeadFunction("c"), selectFirstNBytes);
  });
});

describe("head", function() {
  it("should return content of file with a maximum of 10 lines  - default values", function() {
    deepEqual(head(dummyFS, ["file1"]), "This is a test file");
    deepEqual(head(dummyFS, ["file2"]), "This is file 2");
  });

  it("should return content of multiple files with default arguments", function() {
    let exp_out =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(head(dummyFS, ["file1", "file2"]), exp_out);

    exp_out =
      "==> file1 <==\nThis is a test file\n\n==> file3 <==\nThis is third file \n With 2 lines of content";
    deepEqual(head(dummyFS, ["file1", "file3"]), exp_out);
  });

  it("should return content of file with input of n and line numbers", function() {
    let exp_out =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(head(dummyFS, ["-n3", "file1", "file2"]), exp_out);
  });

  it("should return content of the file with input of c and byte count", function() {
    let exp_out = "==> file1 <==\nThi\n\n==> file2 <==\nThi";
    deepEqual(head(dummyFS, ["-c3", "file1", "file2"]), exp_out);
  });

  it("should return first line of each file", function() {
    let exp_out =
      "==> file1 <==\nThis is a test file\n\n==> file2 <==\nThis is file 2";
    deepEqual(head(dummyFS, ["-1", "file1", "file2"]), exp_out);
  });

  it("should return error messages for the following", function() {
    let exp_out = "head: file4: No such file or directory";
    deepEqual(head(dummyFS, ["file4"]), exp_out);
    exp_out =
      "head: illegal option -- g\nusage: head [-n lines | -c bytes] [file ...]";
    deepEqual(head(dummyFS, ["-g4", "file1"]), exp_out);
    exp_out = "head: illegal line count -- 0";
    deepEqual(head(dummyFS, ["-n0", "file1"]), exp_out);
    exp_out = "head: illegal byte count -- 0";
    deepEqual(head(dummyFS, ["-c0", "file1"]), exp_out);
  });
});

describe("validateHeadType", function() {
  it("should return true for all except n and c", function() {
    deepEqual(validateHeadType("g"), true);
  });
});

describe("validateParameters", function() {
  it("should return object with status according to parameters", function() {
    deepEqual(validateParameters({ type: "n", count: "3", files: ["file1"] }), {
      status: false,
      message: ""
    });
  });
});

describe("tail", function() {
  it("should return all of file contents for an input of file details with single line", function() {
    deepEqual(
      tail([{ name: "file1", content: "This is a file", exists: true }], {
        type: "n",
        count: "10",
        files: ["file1"]
      }),
      "This is a file"
    );
  });

  let file1 = {
    name: "file1",
    content: "This is a file content \n this is a file content",
    exists: true
  };
  let file2 = {
    name: "file2",
    content: "this is a file content",
    exists: true
  };
  let exp_out =
    "==> file1 <==\nThis is a file content \n this is a file content\n\n==> file2 <==\nthis is a file content";
  it("should return all of the file contents for an input of multiple files", function() {
    deepEqual(
      tail([file1, file2], {
        type: "n",
        count: "10",
        files: ["file1", "file2"]
      }),
      exp_out
    );
  });
  it("should return all of the file contents for an input of multiple files", function() {
    exp_out = "==> file1 <==\nle content\n\n==> file2 <==\nle content";
    deepEqual(
      tail([file1, file2], {
        type: "c",
        count: "10",
        files: ["file1", "file2"]
      }),
      exp_out
    );
  });
});

describe("runTail", function() {
  it("should return content of file with a maximum of 10 lines  - default values", function() {
    deepEqual(runTail(dummyFS, ["file1"]), "This is a test file");
    deepEqual(runTail(dummyFS, ["file2"]), "This is file 2");
  });

  it("should return a false exists and content as error message for file not found", function() {
    deepEqual(runTail(dummyFS,["file4"]),"tail: file4: No such file or directory");
  });
});