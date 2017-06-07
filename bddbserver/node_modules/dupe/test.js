var test = require('tape')
var notDupe = require('./notDupe.js')
var isDupe = require('./isDupe.js')

var arrayOne = [2, 4, 4, 6, 4, 4, 8, 6]
var arrayOneDeduped = [2, 4, 6, 8]
var arrayOneDupes = [4, 4, 4, 6]

test('it works as expected', function(t) {
	t.ok(   notDupe(3, 2, [4, 4, 3]), 'not a duplicate')
	t.notOk(notDupe(3, 2, [4, 3, 3]), 'is a duplicate')

	t.notOk(isDupe(3, 2, [4, 4, 3]), 'not a duplicate')
	t.ok(   isDupe(3, 2, [4, 3, 3]), 'is a duplicate')

	t.end()
})

test('it works in array.filter', function(t) {
	t.deepEqual(arrayOne.filter(notDupe), arrayOneDeduped, 'notDupe filters as expected')

	t.deepEqual(arrayOne.filter(isDupe), arrayOneDupes, 'isDupe filters as expected')

	t.end()
})

test('it works in array.some', function (t) {
	t.ok(arrayOne.some(isDupe), 'finds duplicates')
	t.notOk(arrayOneDeduped.some(isDupe), 'finds no duplicates')

	t.notOk(arrayOne.every(notDupe), 'finds some duplicates')
	t.ok(arrayOneDeduped.every(notDupe), 'finds no duplicates')
	t.end()
})
