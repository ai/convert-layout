module.exports = function createIndex (mappingNames) {
  return (
    '/* eslint-disable global-require */\n' +
    'module.exports = {\n' +
    (mappingNames
      .map(function (name) {
        return '  ' + name + ": require('./" + name + "')"
      })
      .join(',\n')
    ) +
    '\n}\n'
  )
}
