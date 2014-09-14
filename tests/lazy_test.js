describe('lazy', function () {
    'use strict';

    var loaded, lazy, expect;

    beforeEach(function () {
        expect = require('expect.js');
        lazy = require('..');
    });

    describe('lazy loading', function () {
        var lazy_test;

        beforeEach(function () {
            loaded = false;
            lazy_test = lazy(function (mod) {
                loaded = mod;
                return function() {};
            });
        });

        it('is loaded when called as a function', function () {
            var mod = lazy_test('hi1');
            expect(loaded).to.be(false);
            mod();
            expect(loaded).to.be('hi1');
        });

        it('is loaded when the .get() method is called', function () {
            var mod = lazy_test('hi2');
            expect(loaded).to.be(false);
            mod.get();
            expect(loaded).to.be('hi2');
        });

        it('gives direct acces to a function', function () {
            var isPlainObject = lazy('lodash isPlainObject');
            expect(isPlainObject({})).to.be(true);
        });

        it('gives direct acces to a function', function () {
            var prop = lazy(require)('./modules/props one two three');
            expect(prop.get()).to.be(true);
        });
    });

    describe('loading using a local require', function () {
        beforeEach(function () {
            lazy = require('..')(require);
        });

        it('loads modules using a local require object', function () {
            var local = lazy('./modules/local.js');
            local.get();
            expect(true).to.be(true);
        });

        it('calls the module function when triggered as a function', function () {
            var plus1 = lazy('./modules/plus-one.js');
            expect(plus1(10)).to.be(11);
        });
    });

    describe('loading using a global require', function () {
        it('calls the module function when triggered as a function', function () {
            var json5 = lazy('json5');
            json5 = json5.get();
            expect(json5.parse('{a:true}')).to.eql({a: true});
        });
    });
});
