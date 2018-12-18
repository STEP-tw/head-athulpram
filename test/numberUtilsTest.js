const { isNaturalNumber } = require("../src/utils/numberUtils");

const { deepEqual } = require("assert");

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
