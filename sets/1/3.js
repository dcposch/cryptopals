var input = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'

console.log('single-byte xor cipher')
console.log('input: ' + input)
console.log('recovered: ' + recover(new Buffer(input, 'hex')).toString())

function recover (cipher) {
  var n = cipher.length
  var candidate = new Buffer(n)
  var bestScore = -Infinity
  var bestCandidate = new Buffer(n)
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
  return bestCandidate
}

function score (candidate) {
  var actual = histogram(candidate)
  var english = histogram(new Buffer('these are the days of lasers in the jungle'))
  return rms(actual, english)
}

function histogram (buf) {
  var counts = new Int32Array(256)
  for (var i = 0; i < buf.length; i++) counts[buf[i]]++
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
