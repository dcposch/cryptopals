var fs = require('fs')

var english = histogram(new Buffer([
  'These are the Days of lasers in the jungle',
  'Stacatto signals of constant information',
  'A loose affiliation of millionaires and billionaires',
  'The quick brown fox jumped over the lazy dog',
  'To be or no to be, that is the question; Whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune',
].join('. ')))

var ciphertext = new Buffer(fs.readFileSync('6.txt', 'utf8'), 'base64')
console.log('ciphertext length ' + ciphertext.length)
console.log(decipher(ciphertext).toString())

function decipher (ciphertext) {
  var n = ciphertext.length
  var bestScore = Infinity
  var bestCandidate = Buffer.alloc(n)
  for (var keySize = 1; keySize <= 50; keySize++) {
    var key = Buffer.alloc(keySize)
    var m = Math.ceil(ciphertext.length / keySize)
    var candidate = Buffer.alloc(m)
    for (var i = 0; i < keySize; i++) {
      var bestByte = 0
      var bestByteScore = Infinity
      for (var keyByte = 0; keyByte < 256; keyByte++) {
        for (var j = i; j < n; j += keySize) {
          var ix = Math.floor(j / keySize)
          candidate[ix] = ciphertext[j] ^ keyByte
        }
        var byteScore = score(candidate)
        if (byteScore < bestByteScore) {
          bestByteScore = byteScore
          bestByte = keyByte
        }
      }
      key[i] = bestByte
    }
    var textCandidate = cryptRepeatingKeyXOR(ciphertext, key)
    var textScore = score(textCandidate)
    if (textScore < bestScore) {
      bestScore = textScore
      bestCandidate.set(textCandidate)
    }
  }
  return bestCandidate
}

function cryptRepeatingKeyXOR (buf, key) {
  var ret = new Buffer(buf.length)
  for (var i = 0; i < buf.length; i++) ret[i] = buf[i] ^ key[i % key.length]
  return ret
}

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
