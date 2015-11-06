var main = require('./');
var ru   = require('./ru');

var expect = require('chai').expect;

describe('convert-layout', function () {

    it('has all languages in index', function () {
        expect(main.ru).to.eql(ru);
    });

    describe('ru', function () {

        it('converts lowers to English', function () {
            expect(ru.fromEn('ntcn/')).to.eql('тест.');
        });

        it('converts uppers to English', function () {
            expect(ru.fromEn('NTCN?&')).to.eql('ТЕСТ,?');
        });

        it('converts lowers from English', function () {
            expect(ru.toEn('еуыею')).to.eql('test.');
        });

        it('converts uppers from English', function () {
            expect(ru.toEn('ЕУЫЕ№')).to.eql('TEST#');
        });

    });

});
