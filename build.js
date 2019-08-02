var fs = require('fs')
var path = require('path')

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return /^[a-z][a-z].js$/.test(file) || file === 'index.js'
  })
  .forEach(function (file) {
    fs.unlinkSync(path.join(__dirname, file))
  })

var langs = fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return /^([a-z][a-z]|dvorak|colemak).json$/.test(file)
  })
  .map(function (file) {
    return path.basename(file, '.json')
  })
  .sort()

var preferredOrder = '.exports=func'

function sortHash (mappingTuple) {
  var index = preferredOrder.indexOf(mappingTuple[0])
  if (index > -1) {
    return '\u0000' + String.fromCharCode(index)
  }
  return '\u0020' + mappingTuple[0]
}

function sortFn (a, b) {
  a = sortHash(a)
  b = sortHash(b)
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  } else {
    return 0
  }
}

function toJs (map) {
  var tuples = []
  for (var key in map) {
    if (key === map[key]) {
      continue
    }
    tuples.push([
      key,
      map[key]
    ])
  }
  tuples.sort(sortFn)
  var keys = tuples.map(function (tuple) {
    return tuple[0]
  }).join('')
  var values = tuples.map(function (tuple) {
    return tuple[1]
  }).join('')

  return 'module.exports = require(\'./convert\')(\n' +
         '  ' + JSON.stringify(keys) + ',\n' +
         '  ' + JSON.stringify(values) + '\n' +
         ')\n'
}

for (var i = 0; i < langs.length; i++) {
  var mapping = JSON.parse(fs
    .readFileSync(path.join(__dirname, langs[i] + '.json'))
    .toString('utf-8')
  )
  fs.writeFileSync(path.join(__dirname, langs[i] + '.js'), toJs(mapping))
}

var index = 'module.exports = {\n' +
            (langs
              .map(function (name) {
                return '  ' + name + ': require(\'./' + name + '\')'
              })
              .join(',\n')
            ) + '\n' +
            '}\n'
fs.writeFileSync(path.join(__dirname, 'index.js'), index)
