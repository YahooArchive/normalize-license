var vows = require('vows'),
    assert = require('assert'),
    format = require('../');

var tests = {
    'should export': {
        topic: function () {
            return format;
        },
        'a function': function (d) {
            assert.isFunction(d);
        },
        'with a guess function': function (d) {
            assert.isFunction(d.guess);
        }
    },
    'string': {
        topic: function () {
            return format({
                license: 'mIt'
            });
        },
        'should return MIT': function (d) {
            assert.equal('MIT', d);
        }
    },
    'unknown string': {
        topic: function () {
            return format({
                license: 'My License'
            });
        },
        'should return My License': function (d) {
            assert.equal('My License', d);
        }
    },
    'object': {
        topic: function () {
            return format({
                licenses: {
                    type: 'APache'
                }
            });
        },
        'should return Apache': function (d) {
            assert.equal('Apache', d);
        }
    },
    'array of string': {
        topic: function () {
            return format({
                licenses: [
                    'APache'
                ]
            });
        },
        'should return Apache': function (d) {
            assert.equal('Apache', d);
        }
    },
    'array of object': {
        topic: function () {
            return format({
                licenses: [
                    { type: 'APache' }
                ]
            });
        },
        'should return Apache': function (d) {
            assert.equal('Apache', d);
        }
    },
    'array of empty': {
        topic: function () {
            return format({
                licenses: [  ]
            });
        },
        'should return null': function (d) {
            assert.isNull(d);
        }
    },
    'array of null': {
        topic: function () {
            return format({
                licenses: [ null ]
            });
        },
        'should return null': function (d) {
            assert.isNull(d);
        }
    },
    'array of array': {
        topic: function () {
            return format({
                licenses: [ [] ]
            });
        },
        'should return null': function (d) {
            assert.isNull(d);
        }
    },
    'no license': {
        topic: function () {
            return format({
            });
        },
        'should return null': function (d) {
            assert.isNull(d);
        }
    },
    'guess none': {
        topic: function () {
            return format({
                readme: 'asdf'
            }, true);
        },
        'should return null': function (d) {
            assert.isNull(d);
        }
    },
    'guess MIT': {
        topic: function () {
            return format({
                readme: '\n\nasdfasdfasdfa\n\nasdfasdf\nMIT\n\n'
            }, true);
        },
        'should return MIT': function (d) {
            assert.equal('MIT* (guessed)', d);
        }
    },
    'guess BSD': {
        topic: function () {
            return format({
                readme: '\n\nasdfasdfasdfa\n\nasdfasdf\nBSD\n\n'
            }, true);
        },
        'should return BSD': function (d) {
            assert.equal('BSD* (guessed)', d);
        }
    },
    'guess Apache': {
        topic: function () {
            return format({
                readme: '\n\nasdfasdfasdfa\n\nasdfasdf\nApache License\n\n'
            }, true);
        },
        'should return Apache': function (d) {
            assert.equal('Apache* (guessed)', d);
        }
    },
    'guess WTF': {
        topic: function () {
            return format({
                readme: '\n\nasdfasdfasdfa\n\nasdfasdf\nDO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE\n\n'
            }, true);
        },
        'should return WTF': function (d) {
            assert.equal('WTF* (guessed)', d);
        }
    }
};

vows.describe('normalize-license').addBatch(tests)['export'](module);
