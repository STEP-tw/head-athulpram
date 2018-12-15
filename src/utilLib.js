const errorMessages = {
  head: {
    usage: "usage: head [-n lines | -c bytes] [file ...]",
    illegalOption: "head: illegal option -- "
  },
  tail: {
    illegalOption: "tail: illegal option -- ",
    illegalOffset: "tail: illegal offset -- ",
    usage: "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
  },
  noFile: ": No such file or directory"
};

const isNaturalNumber = function(count) {
  return count > 0 && count % 1 == 0;
};

const reverseContents = function(content) {
  return content
    .trim()
    .split("")
    .reverse()
    .join("");
};

exports.isNaturalNumber = isNaturalNumber;
exports.reverseContents = reverseContents;
exports.errorMessages = errorMessages;
