// Builtins
var fs = require('fs')
var path = require('path')

// Tools
var mappingToJs = require('./mapping-to-js')
var createIndex = require('./create-index')
var oldGeneratedFiles = require('./old-generated-files')

var resolvePath = path.resolve.bind(path, __dirname, '..')

// Remove all old generated files
oldGeneratedFiles(resolvePath())
  .forEach(function (filename) {
    fs.unlinkSync(filename)
  })

// Get a list of mapping files
var mappingNames = (fs
  .readdirSync(resolvePath())
  .filter(function (filename) {
    return /^[a-z][a-z].json$/.test(filename)
  })
  .map(function (filename) {
    return path.basename(filename, '.json')
  })
  .sort()
)

// Convert each json file to js with string mappings
var mappingTemplate = (fs
  .readFileSync(
    resolvePath('tools', 'templates', 'locale.template.js')
  )
  .toString('utf-8')
)
for (var i = 0; i < mappingNames.length; i++) {
  var mapping = JSON.parse(fs
    .readFileSync(
      resolvePath(mappingNames[i] + '.json')
    )
    .toString('utf-8')
  )
  fs.writeFileSync(
    resolvePath(mappingNames[i] + '.js'),
    mappingToJs(mapping, mappingTemplate)
  )
}

// Create index file
fs.writeFileSync(
  resolvePath('index.js'),
  createIndex(mappingNames)
)
