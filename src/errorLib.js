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

module.exports = {
  errorMessages
};
