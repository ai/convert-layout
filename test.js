import test from 'ava';

import main from './';
import ru   from './ru';

test('has all languages in index', t => {
    t.same(main.ru, ru);
    t.end();
});

test('converts lowers to English', t => {
    t.same(ru.fromEn('ntcn/'), 'тест.');
    t.end();
});

test('converts uppers to English', t => {
    t.same(ru.fromEn('NTCN?&'), 'ТЕСТ,?');
    t.end();
});

test('converts lowers from English', t => {
    t.same(ru.toEn('еуыею'), 'test.');
    t.end();
});

test('converts uppers from English', t => {
    t.same(ru.toEn('ЕУЫЕ№'), 'TEST#');
    t.end();
});

test('ignores unknown symbols', t => {
    t.same(ru.toEn('test!'), 'test!');
    t.end();
});
