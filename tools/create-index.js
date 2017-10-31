module.exports = function createIndex (mappingNames) {
  return (
    'module.exports = {\n' +
    (mappingNames
      .map(function (name) {
        return '  ' + name + ": require('./" + name + "')"
      })
      .join(',\n')
    ) +
    '\n}'
  )
}
