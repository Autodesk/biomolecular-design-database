'use strict';

var isBlank = require('is-blank');
var isNotDupe = require('dupe');

module.exports = function commaSplit(stringToSplit, options) {
  if (typeof stringToSplit != 'string') {
    throw new TypeError('comma-split expects a string');
  }

  options = options || {};

  if (options.ignoreWhitespace) {
    var splitRegex = /,/;
  } else if (options.ignoreTrailingWhitespace) {
    var splitRegex = /,\s*/;
  } else if (options.ignoreLeadingWhitespace) {
    var splitRegex = /\s*,/;
  } else {
    var splitRegex = /\s*,\s*/;
  }

  var list = stringToSplit.split(splitRegex);

  if (options.ignoreBlank) {
    list = list.filter(isNotBlank);
  }

  if (options.ignoreDuplicate) {
    list = list.filter(isNotDupe);
  }

  return list;
}

function isNotBlank(obj) { return !isBlank(obj); }
