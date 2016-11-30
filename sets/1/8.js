var fs = require('fs')

var ciphertexts = fs.readFileSync('8.txt', 'utf8')
  .split('\n')
  .map(function (line) { return new Buffer(line, 'hex') })

ciphertexts.forEach(function (ciphertext, i) {
  var numDupes = countDupes(ciphertext)
  if (numDupes === 0) return
  console.log('ciphertext line %d num dupe blocks %d', i, numDupes)
})

function countDupes (buf) {
  var numDupes = 0
  var map = {}
  for (var i = 0; i < buf.length; i += 16) {
    var blockHex = buf.slice(i, i + 16).toString('hex')
    if (map[blockHex]) numDupes++
    else map[blockHex] = true
  }
  return numDupes
}
