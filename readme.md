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

findPaths(deeplyNestedObj, "a");
// => [ 'a' ]

findPaths(deeplyNestedObj, "b");
// => [ 'a.b' ]

findPaths(deeplyNestedObj, "d");
// => [ 'd', 'a.b.c.d' ]

findPaths(deeplyNestedObj, "e");
// => [ 'e', 'a.b.c.d.e', 'd.e' ]

findPaths(deeplyNestedObj, "x");
// => []

getValues(deeplyNestedObj, "b");
// => [ { c: { d: [Object] } } ]

getValues(deeplyNestedObj, "d");
// => [ { e: { f: 'F' } }, { e: 'e', f: 'f' } ]

getValues(deeplyNestedObj, "e");
// => [ 'Eeee', 'e', { f: 'F' } ]

getValues(deeplyNestedObj, "G");
// => [ undefined ]

getValues(deeplyNestedObj, "aFunction");
// => [ [Function: aFunction] ]

getValues(deeplyNestedObj, "aFunction")[0]();
// => true
```

---

## APIs

### hasKey(obj, key)

**Returns**: `Boolean`

Returns `true` or `false` depending on whether the key is found in the nested object.

#### obj

Type: `Object` (or `Array`)

#### key

Type: `String`

#### Example

```js
hasKey(obj, "id"); // => true
```

### countKey(obj, key)

**Returns**: `Number`

Returns the number of occurrences of the key in the nested object.

#### obj

Type: `Object` (or `Array`)

#### key

Type: `String`

#### Example

```js
countKey(obj, "name"); // => 3
```

### findPaths(obj, key)

**Returns**: `String[]`

Returns an array of all the paths where the key occurs in the nested object, as dot-delimited strings (e.g., `'a.b.c.d.e'`).

#### obj

Type: `Object` (or `Array`)

#### key

Type: `String`

#### Example

```js
findPaths(obj, "email");
// => [ 'employee.addresses[0].email', 'employee.addresses[1].email' ]

// The paths are `lodash.get` compatible:
import _ from "lodash";

const path = findPaths(obj, "provider");
// => [ 'user.profile.addresses[0].emails[0].provider'];

_.get(obj, path[0]);
// => 'gmail'
```

### getValues(obj, key)

**Returns**: `Any[]`

Returns an array of all the values corresponding to the key's occurrences in the nested object.

#### obj

Type: `Object` (or `Array`)

#### key

Type: `String`

#### Example

```js
getValues(obj, "age"); // => [ 25, 30, 45 ]
```

---

## License

MIT © Talha Awan
