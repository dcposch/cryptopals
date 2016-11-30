var fs = require('fs')

console.log('detect single-byte xor')

var english = histogram(new Buffer('these are the days of lasers in the jungle'))
var lines = fs.readFileSync('4.txt', 'utf8').split('\n')
var ciphers = lines.map(function (line) { return new Buffer(line, 'hex') })
console.log('read %d lines...', lines.length)

var n = 30
var candidate = new Buffer(n)
var bestScore = -Infinity
var bestCandidate = new Buffer(n)
ciphers.forEach(function (cipher) {
  for (var i = 0; i < 256; i++) {
    for (var j = 0; j < n; j++) {
      candidate[j] = cipher[j] ^ i
    }
    var s = -score(candidate)
    if (s > bestScore) {
      bestScore = s
      bestCandidate.set(candidate)
    }
  }
})
console.log('best candidate: ' + bestCandidate.toString())

function score (candidate) {
  var actual = histogram(candidate)
  return rms(actual, english)
}

function histogram (buf) {
  var counts = new Float32Array(256)
  var inc = 1.0 / buf.length
  for (var i = 0; i < buf.length; i++) counts[buf[i]] += inc
  return counts
}

function rms (a, b) {
  var n = a.length
  var ss = 0
  for (var i = 0; i < n; i++) {
    var d = a[i] - b[i]
    ss += d * d
  }
  return Math.sqrt(ss / n)
}
