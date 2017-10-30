function replace (map) {
  return function (str) {
    return str.replace(/./g, function (i) {
      return map[i] || i
    })
  }
}

function convert (map) {
  var reverse = { }
  var full = { }
  var key

  for (key in map) {
    full[key.toUpperCase()] = map[key].toUpperCase()
    full[key] = map[key]
  }

  for (key in full) {
    reverse[full[key]] = key
  }

  return { fromEn: replace(full), toEn: replace(reverse) }
}

module.exports = convert
