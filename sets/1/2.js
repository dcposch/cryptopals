var in1 = '1c0111001f010100061a024b53535009181c'
var in2 = '686974207468652062756c6c277320657965'

console.log('fixed xor')
console.log('in1: ' + in1)
console.log('in2: ' + in2)
console.log('xor: ' + xor(new Buffer(in1, 'hex'), new Buffer(in2, 'hex')).toString('hex'))

function xor (a, b) {
  var n = a.length
  var ret = new Buffer(n)
  for (var i = 0; i < n; i++) ret[i] = a[i] ^ b[i]
  return ret
}
