var test = require('ava')

var main = require('./')
var ru = require('./ru')

test('has all languages in index', function (t) {
  t.same(main.ru, ru)
  t.end()
})

test('converts lowers to English', function (t) {
  t.same(ru.fromEn('ntcn/'), 'тест.')
  t.end()
})

test('converts uppers to English', function (t) {
  t.same(ru.fromEn('NTCN?&'), 'ТЕСТ,?')
  t.end()
})

test('converts lowers from English', function (t) {
  t.same(ru.toEn('еуыею'), 'test.')
  t.end()
})

test('converts uppers from English', function (t) {
  t.same(ru.toEn('ЕУЫЕ№'), 'TEST#')
  t.end()
})

test('ignores unknown symbols', function (t) {
  t.same(ru.toEn('test!'), 'test!')
  t.end()
})
