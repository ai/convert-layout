# Convert Layout [![Build Status][ci-img]][ci]

Convert keyboard layouts, when user forget to change it.

[ci-img]: https://travis-ci.org/ai/convert-layout.svg
[ci]:     https://travis-ci.org/ai/convert-layout

```js
var ru = require('convert-layout/ru');

bankcardName.keyup(function () {
    bankcardName.value = ru.toEn(bankcardName.value);
});
```

## Usage

There are 2 ways to load layout data. If you need only one layout,
just load file directly:

```js
var ru = require('convert-layout/ru');
```

But you can get objects with all layouts:

```js
var layouts = require('convert-layout');
layout = layouts[name];
```

This project uses English Qwerty layout as base for any transformations.
So every layout has `fromEn` and `toEn` methods:

```js
ru.toEn('руддщ')    //=> "hello"
ru.fromEn('ghbdtn') //=> "привет"
```

## Layouts

Supported keyboard layouts:

* English Qwerty.
* Russian

If you want to add new keyboard layout:

1. Fork a project. Create a branch.
2. Add `CODE.js` file with layout buttons map. See example in `ru.js`.
   We will convert lower case to upper case automatically.
   But all non-letters symbol should be added in both cases.
3. Add `CODE` key to `index.js`.
4. Send a pull request.
