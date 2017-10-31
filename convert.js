module.exports = function convert (keys, values) {
  var reverse = { }
  var full = { }
  var i

  for (i = keys.length; i--;) {
    full[keys[i].toUpperCase()] = values[i].toUpperCase()
    full[keys[i]] = values[i]
  }

  for (i in full) {
    reverse[full[i]] = i
  }

  return {
    fromEn: function (str) {
      return str.replace(/./g, function (ch) {
        return full[ch] || ch
      })
    },
    toEn: function (str) {
      return str.replace(/./g, function (ch) {
        return reverse[ch] || ch
      })
    }
  }
}
