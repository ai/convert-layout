# Convert Layout [![Build Status][ci-img]][ci]

Converts keyboard layouts, when user forgot to change it.

[ci-img]: https://travis-ci.org/ai/convert-layout.svg
[ci]:     https://travis-ci.org/ai/convert-layout

```js
var ru = require('convert-layout/ru');

bankcardName.keyup(function () {
    bankcardName.value = ru.toEn(bankcardName.value);
});
```

## Usage

There are 2 ways to load layout. If you need only one layout,
just load file directly:

```js
var ru = require('convert-layout/ru');
```

Also you can get objects with all layouts:

```js
var layouts = require('convert-layout');
layout = layouts[name];
```

Every layout has `fromEn` and `toEn` methods:

```js
ru.toEn('руддщ')    //=> "hello"
ru.fromEn('ghbdtn') //=> "привет"
```

## Layouts

Supported keyboard layouts:

* English QWERTY.
* Russian

If you want to add new keyboard layout:

1. Fork a project. Create a branch.
2. Add `CODE.js` file with layout buttons map. See example in `ru.js`.
   Lower case letters will be converted to upper case automatically.
   But all non-letters symbol should be added in both cases.
3. Add `CODE` key to `index.js`.
4. Send a pull request.
