var main = require('./');
var ru   = require('./ru');

var expect = require('chai').expect;

describe('convert-layout', function () {

    it('has all languages in index', function () {
        expect(main.ru).to.eql(ru);
    });

});
