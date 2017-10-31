module.exports = function convert (keysStr, valuesStr) {
  var reverse = { }
  var full = { }
  var i

  for (i = keysStr.length; i--;) {
    full[keysStr[i].toUpperCase()] = valuesStr[i].toUpperCase()
    full[keysStr[i]] = valuesStr[i]
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
