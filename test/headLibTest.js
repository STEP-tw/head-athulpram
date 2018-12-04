const {parseInput} = require("../src/headLib.js");
const {deepEqual} = require("assert");
describe("parseInput", function() {
  describe("passing only file names",function(){
    it("should return an object with lines as 10 and file name in file array while passing file name as input",function(){
      deepEqual(parseInput(["fileName.txt"]),{lines : 10, bytes : undefined , files : ["fileName.txt"]});
    });
  });
});
