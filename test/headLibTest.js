const {parseInput,selectTopLines,selectFirstNBytes,validateCount} = require("../src/headLib.js");
const {deepEqual} = require("assert");

describe("parseInput", function() {
  
  describe("passing only file names",function(){
    
    it("should return an object with count as 10 and file name in files array while passing file name as input",function(){
      deepEqual(parseInput(["fileName.txt"]),{type : "n", count : 10 , files : ["fileName.txt"]});
    });
    
    it("should return an object with count as 10 and file names in files array while passing file names as input",function(){
      deepEqual(parseInput(["fileName.txt","fileName2.txt"]),{type : "n", count : 10 , files : ["fileName.txt","fileName2.txt"]})
    })

  });

  it('should return an object with type n and count, fileName in files array while passing the count & fileName as input', () => {
    deepEqual(parseInput(['-0', 'file.txt']), { type: 'n', count: 0, files: ['file.txt'] });
    deepEqual(parseInput(['-10', 'file.txt', 'file2.txt', 'file3.txt']), { type: 'n', count: 10, files: ['file.txt', 'file2.txt', 'file3.txt'] });
  });

  it('should return an object of type, count and fileNames when all three arguments are passed', function(){
    deepEqual(parseInput(['-n1','file.txt']), { type: 'n', count: 1, files: ['file.txt'] });
    deepEqual(parseInput(['-n','10', 'file.txt']), { type: 'n', count: 10, files: ['file.txt'] });
    deepEqual(parseInput(['-n','-1', 'file.txt', 'file2.txt']), { type: 'n', count: -1, files: ['file.txt', 'file2.txt']});
  });

  it('should return an object of type c and count of givrn balue for passing input',function(){
    deepEqual(parseInput(['-c1','file.txt', 'file2.txt']), { type: 'c', count: 1, files: ['file.txt', 'file2.txt'] });
    deepEqual(parseInput(['-c','1','file.txt']), { type: 'c', count: 1, files: ['file.txt'] });
    deepEqual(parseInput(['-c','1','file.txt', 'file2.txt']), { type: 'c', count: 1, files: ['file.txt', 'file2.txt'] });
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

describe("selectFirstNBytes",function(){
  let inputString = "this is first line \n this is second line";
  it("should return first 5 bytes for the input of 5 number of bytes",function(){
    deepEqual(selectFirstNBytes(inputString,5),"this ")
    deepEqual(selectFirstNBytes(inputString,15),"this is first l")
  })

  it("should return empty string when 0 byte number is given",function(){
    deepEqual(selectFirstNBytes(inputString,0),"");
  })
})

describe("validate count",function(){
  it("should return an object with status true and a empty message for a valid count",function(){
    deepEqual(validateCount({type :"c",count : 1}),{status : true,message : ""});
    deepEqual(validateCount({type :"n",count : 2}),{status : true,message : ""});
  });

  it("should return an object with status false and error message in message",function(){
    deepEqual(validateCount({type : "c",count : -1}),{status : false,message : "head: illegal byte count -- -1"});
    deepEqual(validateCount({type :"n",count : -2}),{status : false,message : "head: illegal line count -- -2"});

  });
});
