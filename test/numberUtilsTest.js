const { isNaturalNumber, isInteger } = require("../src/utils/numberUtils");

const { deepEqual } = require("assert");

describe("isNaturalNumber", () => {
  it("should return true for all positive numbers", () => {
    deepEqual(isNaturalNumber(1), true);
  });

  it("should return false for an input of 0", () => {
    deepEqual(isNaturalNumber(0), false);
  });

  it("should return false for an input of negative count", () => {
    deepEqual(isNaturalNumber(-1), false);
  });

  it("should return false for an input of decimal numbers", () => {
    deepEqual(isNaturalNumber(1.3), false);
  });
});

describe("isInteger", () => {
  it("should return true for positive integers", () => {
    deepEqual(isInteger(2), true);
  });
  it("should return true for zero", () => {
    deepEqual(isInteger(0), true);
  });

  it("should return true for negative numbers", () => {
    deepEqual(isInteger(-1), true);
  });

  it("should return false for decimal values", () => {
    deepEqual(isInteger(1.23), false);
  });
});
