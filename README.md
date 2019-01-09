# Convert Layout

A JavaScript library to convert text from one keyboard layout to other.

Useful to prevent errors on english-only fields, like a credit card owner field.

```js
var ru = require('convert-layout/ru');

bankcardName.keyup(function () {
  bankcardName.value = ru.toEn(bankcardName.value);
});
```

<a href="https://evilmartians.com/?utm_source=convert-layout">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>


## Usage

There are two ways to load a keyboard layout definition.
If you plan on using a single layout, just load the file directly:

```js
var ru = require('convert-layout/ru');
```

Also you can get a object with all layouts (but app size will be bigger):

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

Currently supported keyboard layouts:

* Belarusian
* English (QWERTY, Dvorak, Colemak)
* German
* Kazakh
* Korean
* Russian
* Spanish
* Ukrainian
* Hebrew
* Persian

If you want to add a new keyboard layout definition:

1. Fork a project. Create a branch.
2. Add a `CODE.json` file with layout buttons map. See example in `ru.json`.
   Lower case letters will be converted to upper case automatically.
   However, all non-letters symbols should be added both
   in uppercase and lowercase.
3. Run `yarn test`. Project will be built automatically.
4. Add layout to the list above.
5. Send a pull request.
