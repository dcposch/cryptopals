var input = 'Burning \'em, if you ain\'t quick and nimble\n' +
 'I go crazy when I hear a cymbal'
var key = 'ICE'
var output = cryptRepeatingKeyXOR(new Buffer(input), new Buffer(key))
console.log(output.toString('hex'))

function cryptRepeatingKeyXOR (buf, key) {
  var ret = new Buffer(buf.length)
  for (var i = 0; i < buf.length; i++) ret[i] = buf[i] ^ key[i % key.length]
  return ret
}
