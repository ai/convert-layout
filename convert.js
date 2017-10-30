module.exports = function convert (map) {
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

  return {
    fromEn: function (str) {
      return str.replace(/./g, function (i) {
        return full[i] || i
      })
    },
    toEn: function (str) {
      return str.replace(/./g, function (i) {
        return reverse[i] || i
      })
    }
  }
}
