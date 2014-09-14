[![Build Status](https://travis-ci.org/minond/require-lazy-loader.svg?branch=master)](https://travis-ci.org/minond/require-lazy-loader)
[![Coverage Status](https://coveralls.io/repos/minond/require-lazy-loader/badge.png?branch=master)](https://coveralls.io/r/minond/require-lazy-loader?branch=master)

`require-lazy-loader` is a lazy loader for Node.js modules. you use it instead
of `require` in order to load a module only when it is going to be used.

#### installing

```bash
npm install require-lazy-loader
```

#### usage

```js
// use the `require` function in the module
var lazy = require('require-lazy-loader');

// or use your own
// this is needed when you are going to require local module
var lazy = require('require-lazy-loader')(require);

// use instead of `require`
var myFunc = lazy('./myFunc');

// if you're loading a function, you can just call the lazy loader the same you
// would the actual module
myFunc(1, 2, 3);

// you can also load the whole thing by calling `.get()`
myFunc = myFunc.get();

// it's also possible to to straight to a method of an object. paths to methods
// and properties are separated by spaces
var uniq = lazy('lodash uniq');

// when you execute the `uniq` method, lazy will load lodash, get a reference
// to the uniq method, and call it and return the results
uniq([ 1, 1, 2 ]);
```
