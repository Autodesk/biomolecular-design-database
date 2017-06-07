var assert = require('assert');
var commaSplit = require('..');

describe('comma-split', function() {

  it('should do split on commas, and remove surrounding whitespace', function() {
    assert.deepEqual(
      commaSplit('some, string,\r\r\n\tdelimited\n,by, commas'),
      ['some','string','delimited','by','commas']
    );
  });

  it('should split on commas and ignore whitespace', function() {
    assert.deepEqual(
      commaSplit('some, string,\r\r\n\tdelimited\n,by, commas', { ignoreWhitespace: true }),
      ['some',' string','\r\r\n\tdelimited\n','by',' commas']
    );
  });

  it('should split on commas and ignore trailing whitespace', function() {
    assert.deepEqual(
      commaSplit('some, string,\r\r\n\tdelimited\n,by, commas', { ignoreTrailingWhitespace: true }),
      ['some','string','delimited\n','by','commas']
    );
  });

  it('should split on commas and ignore leading whitespace', function() {
    assert.deepEqual(
      commaSplit('some, string,\r\r\n\tdelimited\n,by, commas', { ignoreLeadingWhitespace: true }),
      ['some',' string','\r\r\n\tdelimited','by',' commas']
    );
  });

  it('should be able to handle malformed comma delimited lists', function() {
    assert.deepEqual(
      commaSplit(',,some, string,\r\r\n\tdelimited\n,by, commas,'),
      ['','','some','string','delimited','by','commas','']
    );
  });

  it('should be able to ignore blank/empty strings', function() {
    assert.deepEqual(
      commaSplit(',,some, string,\r\r\n\tdelimited\n,by, commas,', { ignoreBlank: true }),
      ['some','string','delimited','by','commas']
    );
  });

  it('should be able to ignore duplicate strings', function () {
    assert.deepEqual(
      commaSplit('some, some, string, delimited, by, by, commas, commas', { ignoreDuplicate: true }),
      ['some','string','delimited','by','commas']
    );
  });
});
