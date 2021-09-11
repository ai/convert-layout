let { writeFileSync, readFileSync, readdirSync, unlinkSync } = require('fs')
let { join, basename } = require('path')

readdirSync(__dirname)
  .filter(file => /^[a-z]{2}.js$/.test(file) || file === 'index.js')
  .forEach(file => {
    unlinkSync(join(__dirname, file))
  })

let langs = readdirSync(__dirname)
  .filter(file => /^([a-z]{2}|dvorak|colemak).json$/.test(file))
  .map(file => basename(file, '.json'))
  .sort()

let preferredOrder = '.exports=func'

function sortHash(mappingTuple) {
  let index = preferredOrder.indexOf(mappingTuple[0])
  if (index > -1) {
    return '\u0000' + String.fromCharCode(index)
  }
  return '\u0020' + mappingTuple[0]
}

function sortFn(a, b) {
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

function toJs(map) {
  let tuples = []
  for (let key in map) {
    if (key === map[key]) {
      continue
    }
    tuples.push([key, map[key]])
  }
  tuples.sort(sortFn)
  let keys = tuples.map(tuple => tuple[0]).join('')
  let values = tuples.map(tuple => tuple[1]).join('')

  return (
    "module.exports = require('./convert')(\n" +
    '  ' +
    JSON.stringify(keys) +
    ',\n' +
    '  ' +
    JSON.stringify(values) +
    '\n' +
    ')\n'
  )
}

for (let lang of langs) {
  let mapping = JSON.parse(
    readFileSync(join(__dirname, lang + '.json')).toString('utf-8')
  )
  writeFileSync(join(__dirname, lang + '.js'), toJs(mapping))
}

writeFileSync(
  join(__dirname, 'index.js'),
  'module.exports = {\n' +
    langs.map(name => '  ' + name + ": require('./" + name + "')").join(',\n') +
    '\n' +
    '}\n'
)
