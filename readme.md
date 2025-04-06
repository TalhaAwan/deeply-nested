[//]: # "The code structure for the repo: https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c"

# deeply-nested ![deeply-nested](https://github.com/TalhaAwan/deeply-nested/actions/workflows/build.yml/badge.svg)

> Get information about deeply nested keys in JavaScript objects and arrays

## Install

```
$ npm install deeply-nested
```

## Usage

### ES Module

```js
import { countKey, hasKey } from "deeply-nested";
```

### CommonJS

```js
const { countKey, hasKey } = require("deeply-nested");
```

## Examples

```js
import { countKey, hasKey } from "deeply-nested";

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
