const {
    isNaturalNumber
} = require("../src/utilLib");

const {deepEqual , equal} = require("assert");

describe("isNaturalNumber",()=>{
    it("should return true for all positive numbers",()=>{
        deepEqual(isNaturalNumber(1),true);
        deepEqual(isNaturalNumber(2),true);
        deepEqual(isNaturalNumber(3),true);
    });

    it("should return false for an input of 0",()=>{
        deepEqual(isNaturalNumber(0),false);
    });

    it("should return false for an input of negative count",()=>{
        deepEqual(!isNaturalNumber(-1),true);
        deepEqual(!isNaturalNumber(-2),true);
    })
});