var input = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'

console.log('hex to base64')
console.log('in: ' + input)
console.log('out: ' + convert(input))

function convert (input) {
  var b = new Buffer(input, 'hex')
  return b.toString('base64')
}
