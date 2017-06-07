/*!
 * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */
'use strict';

var fs = require('fs');
var expect = require('chai').expect;
var isWhitespace = require('../');

var read = function(name) {
  return fs.readFileSync(('test/fixtures/' + name), 'utf8');
};


describe('when non-whitespace exists:', function () {
  it('should return false.', function () {
    var actual = 'foo';
    expect(isWhitespace(actual)).to.eql(false);
  });

  it('should return false.', function () {
    var actual = read('text.txt');
    expect(isWhitespace(actual)).to.eql(false);
  });
});


describe('when non-whitespace exists:', function () {
  it('should return true for spaces', function () {
    var actual = '         ';
    expect(isWhitespace(actual)).to.eql(true);
  });
  it('should return true for spaces', function () {
    var actual = isWhitespace(read('spaces.txt'));
    expect(actual).to.eql(true);
  });
  it('should return true for tabs', function () {
    var actual = isWhitespace(read('tabs.txt'));
    expect(actual).to.eql(true);
  });
  it('should return true for newlines and spaces', function () {
    var actual = isWhitespace(read('multiline.txt'));
    expect(actual).to.eql(true);
  });
  it('should return true for varied spaces, newlines, and tabs', function () {
    var actual = isWhitespace(read('varied.txt'));
    expect(actual).to.eql(true);
  });
});

describe('ES5-compliant whitespace', function () {
  it('should be true for all expected whitespace values', function () {
    var actual = isWhitespace("\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF");
    expect(actual).to.eql(true);
  });

  it('should not be true for the zero-width space', function () {
    expect(isWhitespace('\u200b')).to.eql(false);
  });
});
