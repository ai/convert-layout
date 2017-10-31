// Remove old generated ??.js files
var fs = require('fs')
var path = require('path')

module.exports = function oldGeneratedFiles (dirname) {
  return (fs
    .readdirSync(dirname)
    .filter(function (filename) {
      return /^[a-z][a-z]\.js$/.test(filename) || filename === 'index.js'
    })
    .map(function (filename) {
      return path.resolve(dirname, filename)
    })
  )
}
