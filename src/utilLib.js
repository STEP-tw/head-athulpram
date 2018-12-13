const isNaturalNumber = function(count){
    return count > 0 && count%1 == 0;
}

const reverseContents = function(content){
    return content
    .trim()
    .split("")
    .reverse()
    .join("");
}

exports.isNaturalNumber = isNaturalNumber;
exports.reverseContents = reverseContents;