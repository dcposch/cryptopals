var fs = require('fs')
var crypto = require('crypto')

var key = new Buffer('YELLOW SUBMARINE')
var ciphertext = new Buffer(fs.readFileSync('7.txt', 'utf8'), 'base64')
var plaintext = decrypt(ciphertext, key)
console.log(plaintext.toString('utf8'))

function decrypt (ciphertext, key) {
  var decipher = crypto.createDecipheriv('aes-128-ecb', key, '')
  decipher.setAutoPadding(false)
  return decipher.update(ciphertext)
}

