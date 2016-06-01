mocha.setup('bdd');

var assert = chai.assert;
// var expect = chai.expect;

describe('svg-icon', function () {
    it('exists', function () {
        assert.typeOf(svgIcon, 'object');
    });
});

mocha.run();

module.exports = svgIcon;
