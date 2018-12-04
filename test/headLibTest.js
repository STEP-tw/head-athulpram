const {parseInput,selectTopLines} = require("../src/headLib.js");
const {deepEqual} = require("assert");

describe("parseInput", function() {
  
  describe("passing only file names",function(){
    
    it("should return an object with lines as 10 and file name in files array while passing file name as input",function(){
      deepEqual(parseInput(["fileName.txt"]),{lines : 10, bytes : undefined , files : ["fileName.txt"]});
    });
    
    it("should return an object with lines as 10 and file names in files array while passing file names as input",function(){
      deepEqual(parseInput(["fileName.txt","fileName2.txt"]),{lines : 10, bytes : undefined , files : ["fileName.txt","fileName2.txt"]})
    })

  });

});

describe("selectTopLines",function(){

  describe("select top lines based on number of lines",function(){

    let inputString = "1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10\n 11\n";

    it("should return top 10 lines of a string",function(){
      deepEqual(selectTopLines(inputString,10),"1\n 2\n 3\n 4\n 5\n 6\n 7\n 8\n 9\n 10");
    })

    it("should return top 10 lines of a string",function(){
      deepEqual(selectTopLines(inputString,1),"1");
    })

    it("should return empty string when number of lines is 0",function(){
      deepEqual(selectTopLines(inputString,0),"");
    })

  })

})
