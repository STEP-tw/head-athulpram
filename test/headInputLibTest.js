const {parseInput,parseWithOptions,createParameterObject} = require("../src/headInputLib.js");
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

describe("parseWithOptions",function(){
  it("should return an object with type n and count as given and rest as files in an input of array",function(){
    deepEqual(parseWithOptions(["-n1","file1"]),{ type: 'n', count: '1', files: [ 'file1' ] });
    deepEqual(parseWithOptions(["-n2","file1","file2"]),{ type: 'n', count: '2', files: [ 'file1' ,'file2'] })}
  );
  it("should return an object with type c and count as given and rest as files in an input of array",function(){
    deepEqual(parseWithOptions(["-c1","file1"]),{ type: 'c', count: '1', files: [ 'file1' ] });
    deepEqual(parseWithOptions(["-c2","file1","file2"]),{ type: 'c', count: '2', files: [ 'file1' ,'file2'] })}
  );
  it("should return an object with type n and count as given and rest as files in an input of array without type",function(){
    deepEqual(parseWithOptions(["-1","file1"]),{ type: 'n', count: '1', files: [ 'file1' ] });
    deepEqual(parseWithOptions(["-2","file1","file2"]),{ type: 'n', count: '2', files: [ 'file1' ,'file2'] })}
  );
  it("should return an object with type n and count as given and rest as files in an input of array with type and count as seperate",function(){
    deepEqual(parseWithOptions(["-n","1","file1"]),{ type: 'n', count: '1', files: [ 'file1' ] });
    deepEqual(parseWithOptions(["-n","2","file1","file2"]),{ type: 'n', count: '2', files: [ 'file1' ,'file2'] })}
  );
  it("should return an object with type c and count as given and rest as files in an input of array",function(){
    deepEqual(parseWithOptions(["-c","1","file1"]),{ type: 'c', count: '1', files: [ 'file1' ] });
    deepEqual(parseWithOptions(["-c","2","file1","file2"]),{ type: 'c', count: '2', files: [ 'file1' ,'file2'] })}
  );
})

describe("createParameterObject",function(){
  it("should return all three parameters passed in function as object",function(){
    deepEqual(createParameterObject("n","10",["file"]),{ type: 'n', count: '10', files: [ 'file' ] });
    deepEqual(createParameterObject("c","10",["file"]),{ type: 'c', count: '10', files: [ 'file' ] });
    deepEqual(createParameterObject("n","10",["file","file1"]),{ type: 'n', count: '10', files: [ 'file','file1' ] });
    deepEqual(createParameterObject("c","10",["file","file1"]),{ type: 'c', count: '10', files: [ 'file','file1' ] });
  })
})


