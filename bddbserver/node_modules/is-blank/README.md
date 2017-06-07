# Is Blank

[![Build Status](https://travis-ci.org/johnotander/is-blank.svg?branch=master)](https://travis-ci.org/johnotander/is-blank)

Check whether a value is empty or blank.

## Installation

```
npm i --save is-blank
```

## Usage

```javascript
var isBlank = require('is-blank');

isBlank([]);              // => true
isBlank({});              // => true
isBlank(0);               // => true
isBlank(function(){});    // => true
isBlank(null);            // => true
isBlank(undefined);       // => true
isBlank('');              // => true
isBlank('    ');          // => true
isBlank('\r\t\n ');       // => true

isBlank(['a', 'b']);      // => false
isBlank({ a: 'b' });      // => false
isBlank('string');        // => false
isBlank(42);              // => false
isBlank(function(a,b){}); // => false
```

## Acknowledgements

Extends [is-empty](https://github.com/ianstormtaylor/is-empty) and
[is-whitespace](https://github.com/jonschlinkert/is-whitespace).

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
