var main = require('./')
var ru = require('./ru')

it('has all languages in index', function () {
  expect(main.ru).toEqual(ru)
})

it('converts lowers to English', function () {
  expect(ru.fromEn('ntcn/')).toEqual('тест.')
})

it('converts uppers to English', function () {
  expect(ru.fromEn('NTCN?&')).toEqual('ТЕСТ,?')
})

it('converts lowers from English', function () {
  expect(ru.toEn('еуыею')).toEqual('test.')
})

it('converts uppers from English', function () {
  expect(ru.toEn('ЕУЫЕ№')).toEqual('TEST#')
})

it('ignores unknown symbols', function () {
  expect(ru.toEn('test!')).toEqual('test!')
})

it('ignores unknown symbols in reverse direction', function () {
  expect(ru.fromEn('проверка!')).toEqual('проверка!')
})
