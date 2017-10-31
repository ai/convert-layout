// Remove dev fields from package.json
module.exports = function cleanupPackageJson (pkgJsonStr) {
  var pkgJson = JSON.parse(pkgJsonStr)

  // Allow publication to npm
  delete pkgJson.private

  // Remove tests and devdeps
  delete pkgJson.scripts
  delete pkgJson.jest
  delete pkgJson.devDependencies
  delete pkgJson.eslintConfig
  delete pkgJson['lint-staged']
  delete pkgJson['pre-commit']
  delete pkgJson['size-limit']

  return JSON.stringify(pkgJson, null, 2)
}
