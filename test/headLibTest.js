const {
  selectFileContents,
  selectTopLines,
  selectFirstNBytes,
  validateCount,
  getFileDetails
} = require("../src/headLib.js");
const {deepEqual} = require("assert");

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
describe("selectFileContents",function(){
  it("should return all of file contents for an input of file details with single line",function(){
    deepEqual(selectFileContents([{name : "file1",content : "This is a file",exists : true}],{type : "n",count : "10",files : ["file1"]}),'This is a file');
  })
  let file1 = {
    name : "file1",
    content : "This is a file content \n this is a file content",
    exists : true
  } 
  let file2 = {
    name : "file2",
    content : "this is a file content",
    exists : true
  }
  let exp_out='==> file1 <==\nThis is a file content \n this is a file content\n\n==> file2 <==\nthis is a file content';
  it("should return all of the file contents for an input of multiple files",function(){
    deepEqual(selectFileContents([file1,file2],{type : "n",count : "10",files : ["file1","file2"]}),exp_out);  
  });
  it("should return all of the file contents for an input of multiple files",function(){
    exp_out = '==> file1 <==\nThis is a \n\n==> file2 <==\nthis is a '; 
    deepEqual(selectFileContents([file1,file2],{type : "c",count : "10",files : ["file1","file2"]}),exp_out);  
  })
})

//Testing functions which takes fs as argument

const createFile = function(name,content){
  return {
    name,
    content,
    exists : true
  }
}

let directory = {
  file1 : createFile("file1","This is a test file"),
  file2 : createFile("file2","This is file 2"),
  file3 : createFile("file3","This is third file \n With 2 lines of content")
}

dummyFS = {
  existsSync : function(fileName){
    if(Object.keys(directory).includes(fileName)){
      return true;
    }
    return false;
  },
  readFileSync : function(fileName,encoding){
    if(encoding == "utf-8"){
      return directory[fileName].content;
    }
  }
}

describe("getFileDetails",function(){
  it("should return a true exists and contents in an object of 0 th index of array for an inpput of one file",function(){
    deepEqual(getFileDetails(dummyFS,["file1"]),[directory.file1]);
    deepEqual(getFileDetails(dummyFS,["file2"]),[directory.file2]);
    deepEqual(getFileDetails(dummyFS,["file3"]),[directory.file3]);
  })
})
