const { isNaturalNumber, reverseContents } = require("../src/utilLib");

const { deepEqual, equal } = require("assert");

describe("isNaturalNumber", () => {
  it("should return true for all positive numbers", () => {
    deepEqual(isNaturalNumber(1), true);
  });

  it("should return false for an input of 0", () => {
    deepEqual(isNaturalNumber(0), false);
  });

  it("should return false for an input of negative count", () => {
    deepEqual(!isNaturalNumber(-1), true);
  });
});

describe("reverseContents", () => {
  it("should return reverse of given string", () => {
    deepEqual(reverseContents("abcdefghijklm"), "mlkjihgfedcba");
    deepEqual(reverseContents("1234"), "4321");
  });
  it("should return an empty string for an input of empty string",()=>{
    deepEqual(reverseContents(""),"");
  })
});
