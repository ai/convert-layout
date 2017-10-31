var preferredOrder = '.exports=func'

// Chars in mapping strings has arbitrary order. We'll try to sort it in a way
// it's better compressable by GZIP:
// First there are '.exports=' (if any) so a backreference can be used.
// Other chars are ordered alphabetically, so there's a better chance
// backrefs would be used when several mapping string are bundled.
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

module.exports = function mappingToJs (map, template) {
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
  var keysStr = tuples.map(function (tuple) {
    return tuple[0]
  }).join('')
  var valuesStr = tuples.map(function (tuple) {
    return tuple[1]
  }).join('')

  template = template.split('__build.keysStr').join(JSON.stringify(keysStr))
  template = template.split('__build.valuesStr').join(JSON.stringify(valuesStr))

  return template
}
