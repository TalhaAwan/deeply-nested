[//]: # "The code structure for the repo: https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c"

# nested-keys ![nested-keys](https://github.com/TalhaAwan/nested-keys/actions/workflows/build.yml/badge.svg)

> Get information about nested keys in JavaScript objects and arrays

## Install

```
$ npm install nested-keys
```

## Usage

### ES Module

```js
import { countKey, hasKey } from "nested-keys";
```

### CommonJS

```js
const { countKey, hasKey } = require("nested-keys").default;
```

## Examples

```js
import { countKey, hasKey } from "nested-keys";

const deeplyNestedObj = {
  a: {
    b: {
      c: {
        d: {
          e: "e",
          f: "f",
        },
      },
    },
    G: undefined,
    aFunction: () => {
      return true;
    },
  },
  d: {
    e: {
      f: "F",
    },
  },
  e: "Eeee",
};

hasKey(deeplyNestedObj, "a");
// => true

hasKey(deeplyNestedObj, "b");
// => true

hasKey(deeplyNestedObj, "x");
// => false

countKey(deeplyNestedObj, "a");
// => 1

countKey(deeplyNestedObj, "d");
// => 2

countKey(deeplyNestedObj, "e");
// => 3

countKey(deeplyNestedObj, "x");
// => 0
```

---

## APIs

### hasKey(obj, key)

Returns `true` or `false` depending on the key is found in the nested object or not.

#### obj

Type: `Object` (or `Array`)

#### key

Type: `String`

### countKey(obj, key)

Returns the number of occurrences of the key in the nested object.

#### obj

Type: `Object` (or `Array`)

#### key

Type: `String`

---

## License

MIT © Talha Awan
