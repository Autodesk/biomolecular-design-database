dupe
====

Functions to check for, or remove duplicate array items.

```js
var notDupe = require('dupe')
var isDupe = require('dupe/isDupe')

var duplicates = [1, 2, 1, 3, 4, 1, 3, 4, 'five', 2, 6]
var originals = [4, 8, 15, 16, 23, 42]

// Remove duplicates:
console.log( duplicates.filter( notDupe ) ) // => [1, 2, 3, 4, 'five', 6]
console.log( originals.filter( notDupe ) ) // => [4, 8, 15, 16, 23, 42]

// Assert the lack of duplicates:
console.log( duplicates.every( notDupe ) ) // => false
console.log( originals.every( notDupe ) ) // => true

// Remove originals:
console.log( duplicates.filter( isDupe ) ) // => [1, 1, 3, 4, 2]
console.log( originals.filter( isDupe ) ) // => []

// Assert the presence of duplicates:
console.log( duplicates.some( isDupe ) ) // => true
console.log( originals.some( isDupe ) ) // => false
```

# install

With [npm](http://nodejs.org/download) do:

```bash
npm install dupe
```

# license

[VOL](http://veryopenlicense.com)
