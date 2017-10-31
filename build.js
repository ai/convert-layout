// Builtins
var fs = require('fs')
var path = require('path')

// Devdeps.
// eslint-disable-next-line node/no-unpublished-require
var rimraf = require('rimraf')

// Tools
var mappingToJs = require('./tools/mapping-to-js')
var createIndex = require('./tools/create-index')
var cleanupPackageJson = require('./tools/cleanup-package-json')

var resolvePath = path.resolve.bind(path, __dirname)

// First, remove dist directory entirely
rimraf.sync(resolvePath('dist'))

// Create dist directory anew
fs.mkdirSync(resolvePath('dist'))

// Get a list of mapping files
var mappingNames = (fs
  .readdirSync(resolvePath('src', 'layouts'))
  .filter(function (filename) {
    return path.extname(filename) === '.json'
  })
  .map(function (filename) {
    return path.basename(filename, '.json')
  })
  .sort()
)

// Convert each json file to js with string mappings
var mappingTemplate = (fs
  .readFileSync(
    resolvePath('src', 'templates', 'locale.template.js')
  )
  .toString('utf-8')
)
for (var i = 0; i < mappingNames.length; i++) {
  var mapping = JSON.parse(fs
    .readFileSync(
      resolvePath('src', 'layouts', mappingNames[i] + '.json')
    )
    .toString('utf-8')
  )
  fs.writeFileSync(
    resolvePath('dist', mappingNames[i] + '.js'),
    mappingToJs(mapping, mappingTemplate)
  )
}

// Create index file
fs.writeFileSync(
  resolvePath('dist', 'index.js'),
  createIndex(mappingNames)
)

// Copy cleaned package.json
fs.writeFileSync(
  resolvePath('dist', 'package.json'),
  cleanupPackageJson(
    fs
      .readFileSync(
        resolvePath('package.json')
      )
      .toString('utf-8')
  )
)

// Copy files as-is
fs.copyFileSync(
  resolvePath('CHANGELOG.md'),
  resolvePath('dist', 'CHANGELOG.md')
)
fs.copyFileSync(
  resolvePath('README.md'),
  resolvePath('dist', 'README.md')
)
fs.copyFileSync(
  resolvePath('LICENSE'),
  resolvePath('dist', 'LICENSE')
)
fs.copyFileSync(
  resolvePath('src', 'convert.js'),
  resolvePath('dist', 'convert.js')
)
