# comma-split [![Build Status](https://secure.travis-ci.org/johnotander/comma-split.png?branch=master)](https://travis-ci.org/johnotander/comma-split)

Split comma delimited strings into an array. Optional handling for trailing
and/or leading whitespace.

## Installation

```bash
npm install --save comma-split
```

## Usage

```javascript
var commaSplit = require('comma-split');

commaSplit('some, string,\r\r\n\tdelimited\n,by, commas');
// => ['some','string','delimited','by','commas']

commaSplit('some, string,\r\r\n\tdelimited\n,by, commas', { ignoreWhitespace: true });
// => ['some',' string','\r\r\n\tdelimited\n','by',' commas']

commaSplit('some, string,\r\r\n\tdelimited\n,by, commas', { ignoreTrailingWhitespace: true });
// => ['some','string','delimited\n','by','commas']

commaSplit('some, string,\r\r\n\tdelimited\n,by, commas', { ignoreLeadingWhitespace: true });
// => ['some',' string','\r\r\n\tdelimited','by',' commas']

commaSplit(',,some, string,\r\r\n\tdelimited\n,by, commas,');
// => ['','','some','string','delimited','by','commas','']

commaSplit(',,some, string,\r\r\n\tdelimited\n,by, commas, ,,', { ignoreBlank: true });
// => [some','string','delimited','by','commas']

commaSplit('some, string, with,a, dupe, dupe', { ignoreDuplicate: true });
// => [some','string','with', 'a', 'dupe'']
```

### Options

* `ignoreWhitespace`:`boolean` - Ignore leading and trailing whitespace.
* `ignoreTrailingWhitespace`:`boolean` - Ignore trailing whitespace.
* `ignoreLeadingWhitespace`:`boolean` - Ignore leading whitespace.
* `ignoreDuplicate`:`boolean` - Ignore duplicate elements.

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
