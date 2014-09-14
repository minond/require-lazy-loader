'use strict';

var assert = require('assert'),
    deep = require('deep-get-set');

/**
 * loades a module or a reference to a module's property or method. path to
 * method or property should be delimeted by spaces and comes after the module
 *
 * @function get
 * @param {string} module
 * @param {require} req
 */
function get(module, req) {
    var path = module.split(' '),
        name = path.shift(),
        prop = path.join('.');

    return prop ? deep(req(name), prop) : req(name);
}

/**
 * generates a module loader
 * @function loader
 * @param {string} module
 * @param {require} req
 * @return {Function}
 */
function loader(module, req) {
    var ref = function lazyRef() {
        return get(module, req).apply(null, arguments);
    };

    ref.get = function lazyRefGet() {
        return get(module, req);
    };

    return ref;
}

/**
 * @function lazy
 * @param {string|require} req pass a local requre object to generate a new
 *     lazy loader that uses that when calling require
 * @return {Function}
 */
module.exports = function lazy(req) {
    if (typeof req === 'string') {
        return loader(req, require);
    }

    return function lazyGlobal(module) {
        assert.ok(module);
        return loader(module, req);
    };
};
