import { countKey, findPaths, getValues, hasKey } from '../index';
import _ from "lodash";

const deeplyNestedObj = {
  a: {
    b: {
      c: {
        d: {
          e: "e",
          f: "f",
          g: {
            G: undefined,
            h: {
              i: {},
              j: {
                k: {
                  K: null,
                  l: {
                    abc: 123,
                    m: {
                      n: {
                        o: {
                          p: {
                            q: "q",
                            r: "r",
                            s: "s",
                            u: "u",
                            d: "D",
                            gibberishObjects: [
                              { gibberishId: 1 },
                              { gibberishId: 2 },
                              "Gibberish String",
                              null,
                            ],
                            aFunction: () => {
                              return true;
                            },
                            anotherDeepObject: {
                              randomDates: {
                                "1999-06-06": {
                                  users: 100,
                                },
                                "2024-jan": "Euro Cup",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  e1: {
    d: "dee",
  },
  f2: {},
  P1: {
    q1: {
      r1: "r1",
    },
    g: "gee",
    2: "two"
  },
};

describe('NestedKeys', () => {
  describe('hasKey', () => {
    test('returns true for key at depth 1', () => {
      expect(hasKey(deeplyNestedObj, "a")).toBe(true);
    });
    test('returns true for key at depth 2', () => {
      expect(hasKey(deeplyNestedObj, "b")).toBe(true);
    });
    test('returns true for key at depth 3', () => {
      expect(hasKey(deeplyNestedObj, "c")).toBe(true);
    });
    test('returns true for deeply nested keys', () => {
      expect(hasKey(deeplyNestedObj, "2024-jan")).toBe(true);
      expect(hasKey(deeplyNestedObj, "P1")).toBe(true);
      expect(hasKey(deeplyNestedObj, "r1")).toBe(true);
    });
    test('returns false for non-existent keys at any depth', () => {
      expect(hasKey(deeplyNestedObj, "xyz")).toBe(false);
      expect(hasKey(deeplyNestedObj, "P2")).toBe(false);
      expect(hasKey(deeplyNestedObj, "google")).toBe(false);
    });
    test('works with root array containing object', () => {
      const arrayWithObject = [deeplyNestedObj];
      expect(hasKey(arrayWithObject, "a")).toBe(true);
      expect(hasKey(arrayWithObject, "b")).toBe(true);
      expect(hasKey(arrayWithObject, "google")).toBe(false);
    });
    test('works with root array containing array containing object', () => {
      const objectInsideArrayInsideArray = [[deeplyNestedObj]];
      expect(hasKey(objectInsideArrayInsideArray, "a")).toBe(true);
      expect(hasKey(objectInsideArrayInsideArray, "b")).toBe(true);
      expect(hasKey(objectInsideArrayInsideArray, "google")).toBe(false);
    });
    test('returns false for any other type than object and array', () => {
      // @ts-ignore
      expect(hasKey(7, "a")).toBe(false);
      // @ts-ignore
      expect(hasKey("a", "a")).toBe(false);
      // @ts-ignore
      expect(hasKey(true, "a")).toBe(false);
      // @ts-ignore
      expect(hasKey(null, "a")).toBe(false);
      // @ts-ignore
      expect(hasKey(undefined, "a")).toBe(false);
      // @ts-ignore
      expect(hasKey(new Date(), "a")).toBe(false);
      // @ts-ignore
      expect(hasKey(() => { }, "a")).toBe(false);
    });
    test('returns false for any other key type than string', () => {
      // @ts-ignore
      expect(hasKey(deeplyNestedObj, 2)).toBe(false);
      expect(hasKey(deeplyNestedObj, "2")).toBe(true);
      // @ts-ignore
      expect(hasKey([deeplyNestedObj], 2)).toBe(false);
      expect(hasKey([deeplyNestedObj], "2")).toBe(true);
    })
  })
  describe('countKey', () => {
    test('returns 1 for key existing once', () => {
      expect(countKey(deeplyNestedObj, "a")).toBe(1);
    });
    test('returns 2 for key existing twice', () => {
      expect(countKey(deeplyNestedObj, "g")).toBe(2);
    });
    test('returns 3 for key existing thrice', () => {
      expect(countKey(deeplyNestedObj, "d")).toBe(3);
    });
    test('returns 0 for non-existent keys', () => {
      expect(countKey(deeplyNestedObj, "d3")).toBe(0);
      expect(countKey(deeplyNestedObj, "google")).toBe(0);
      expect(countKey(deeplyNestedObj, "microsoft")).toBe(0);
    });
    test('works with root array containing object', () => {
      const arrayWithObject = [deeplyNestedObj];
      expect(countKey(arrayWithObject, "a")).toBe(1);
      expect(countKey(arrayWithObject, "b")).toBe(1);
      expect(countKey(arrayWithObject, "google")).toBe(0);
    });
    test('works with root array containing array containing object', () => {
      const objectInsideArrayInsideArray = [[deeplyNestedObj]];
      expect(countKey(objectInsideArrayInsideArray, "a")).toBe(1);
      expect(countKey(objectInsideArrayInsideArray, "b")).toBe(1);
      expect(countKey(objectInsideArrayInsideArray, "google")).toBe(0);
    });
    test('returns 0 for any other type than object and array', () => {
      // @ts-ignore
      expect(countKey(7, "a")).toBe(0);
      // @ts-ignore
      expect(countKey("a", "a")).toBe(0);
      // @ts-ignore
      expect(countKey(true, "a")).toBe(0);
      // @ts-ignore
      expect(countKey(null, "a")).toBe(0);
      // @ts-ignore
      expect(countKey(undefined, "a")).toBe(0);
      // @ts-ignore
      expect(countKey(new Date(), "a")).toBe(0);
      // @ts-ignore
      expect(countKey(() => { }, "a")).toBe(0);
    });
    test('returns 0 for any other key type than string', () => {
      // @ts-ignore
      expect(countKey(deeplyNestedObj, 2)).toBe(0);
      expect(countKey(deeplyNestedObj, "2")).toBe(1);
      // @ts-ignore
      expect(countKey([deeplyNestedObj], 2)).toBe(0);
      expect(countKey([deeplyNestedObj], "2")).toBe(1);
    })
  })
  describe('findPaths', () => {
    test('return all valid nested paths to the given key', () => {
      const pathA = "a";
      const pathB = "a.b";
      const pathD1 = "a.b.c.d";
      const pathD2 = "a.b.c.d.g.h.j.k.l.m.n.o.p.d";
      const pathD3 = "e1.d";
      const gibberishIdPath1 = "a.b.c.d.g.h.j.k.l.m.n.o.p.gibberishObjects[0].gibberishId";
      const gibberishIdPathArray1 = "[0].a.b.c.d.g.h.j.k.l.m.n.o.p.gibberishObjects[0].gibberishId";
      const gibberishIdPath2 = "a.b.c.d.g.h.j.k.l.m.n.o.p.gibberishObjects[1].gibberishId";
      const gibberishIdPathArray2 = "[0].a.b.c.d.g.h.j.k.l.m.n.o.p.gibberishObjects[1].gibberishId";

      expect(findPaths(deeplyNestedObj, "a")).toStrictEqual([pathA]);
      expect(typeof _.get(deeplyNestedObj, pathA)).toBe("object");

      expect(findPaths(deeplyNestedObj, "b")).toStrictEqual([pathB]);
      expect(typeof _.get(deeplyNestedObj, pathB)).toBe("object");

      expect(findPaths(deeplyNestedObj, "d")).toStrictEqual([
        pathD1, pathD2, pathD3
      ]);

      expect(typeof _.get(deeplyNestedObj, pathD1)).toBe("object");
      expect(_.get(deeplyNestedObj, pathD2)).toBe("D");
      expect(_.get(deeplyNestedObj, pathD3)).toBe("dee");

      expect(findPaths(deeplyNestedObj, "gibberishId")).toStrictEqual([
        gibberishIdPath1,
        gibberishIdPath2
      ]);
      expect(_.get(deeplyNestedObj, gibberishIdPath1)).toBe(1);
      expect(_.get(deeplyNestedObj, gibberishIdPath2)).toBe(2);

      expect(findPaths([deeplyNestedObj], "gibberishId")).toStrictEqual([
        gibberishIdPathArray1,
        gibberishIdPathArray2
      ]);
      expect(_.get([deeplyNestedObj, { a: 1 }], gibberishIdPathArray1)).toBe(1);
      expect(_.get([deeplyNestedObj, { a: 1 }], gibberishIdPathArray2)).toBe(2);
    });
    test('return empty for non-existent key', () => {
      expect(findPaths(deeplyNestedObj, "xyz")).toStrictEqual([]);
      expect(findPaths([deeplyNestedObj], "xyz")).toStrictEqual([]);
    })
  })

  describe('getValues', () => {
    test('return all values of the key occurances in the nested object', () => {
      const a = getValues(deeplyNestedObj, "a");

      expect(a.length).toBe(1);
      expect(typeof a[0]).toBe("object");

      const b = getValues(deeplyNestedObj, "b");
      expect(b.length).toBe(1);
      expect(typeof b[0]).toBe("object");

      const ds = getValues(deeplyNestedObj, "d");
      expect(ds.length).toBe(3);
      expect(typeof ds[0]).toBe("object");
      expect(ds[1]).toBe("D");
      expect(ds[2]).toBe("dee");

      expect(getValues(deeplyNestedObj, "gibberishId").length).toBe(2);
      expect(getValues([deeplyNestedObj], "gibberishId").length).toBe(2);
      expect(getValues(deeplyNestedObj, "gibberishId")).toStrictEqual([1, 2]);
      expect(getValues([deeplyNestedObj], "gibberishId")).toStrictEqual([1, 2]);
      expect(getValues(deeplyNestedObj, "aFunction")[0]()).toBe(true);
      expect(getValues([deeplyNestedObj], "aFunction")[0]()).toBe(true);
      expect(getValues([deeplyNestedObj, { a: 1 }], "aFunction")[0]()).toBe(true);
    });
    test('return empty for non-existent key', () => {
      expect(getValues(deeplyNestedObj, "xyz")).toStrictEqual([]);
      expect(getValues([deeplyNestedObj], "xyz")).toStrictEqual([]);
      expect(getValues([deeplyNestedObj, { a: 1 }], "xyz")).toStrictEqual([]);
    })
  })
});
