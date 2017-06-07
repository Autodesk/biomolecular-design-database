var assert = require('assert');
var isBlank = require('..');

describe('is-blank', function() {

  it('should think that [] is blank', function() {
    assert.ok(isBlank([]));
  });

  it('should think that {} is blank', function() {
    assert.ok(isBlank({}));
  });

  it('should think that 0 is blank', function() {
    assert.ok(isBlank(0));
  });

  it('should think that an empty function is blank', function() {
    assert.ok(isBlank(function(){}));
  });

  it('should think that null is blank', function() {
    assert.ok(isBlank(null));
  });

  it('should think that undefined is blank', function() {
    assert.ok(isBlank(undefined));
  });

  it('should think that \'\' is blank', function() {
    assert.ok(isBlank(''));
  });

  it('should think that \'    \' is blank', function() {
    assert.ok(isBlank('    '));
  });

  it('should think that \'\\r\\t\\n\' is blank', function() {
    assert.ok(isBlank('\r\t\n '));
  });

  it('should not think that [\'a\', \'b\'] is blank', function() {
    assert.ok(!isBlank(['a', 'b']));
  });

  it('should not think that { a: \'b\' } is blank', function() {
    assert.ok(!isBlank({ a: 'b' }));
  });

  it('should not think that \'string\' is blank', function() {
    assert.ok(!isBlank('string'));
  });

  it('should not think that 42 is blank', function() {
    assert.ok(!isBlank(42));
  });

  it('should not think that a function with arguments is blank', function() {
    assert.ok(!isBlank(function(a,b){}));
  });
});
