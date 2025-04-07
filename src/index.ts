interface Object {
  [x: string]: any
}

const hasKey = (obj: Object, key: string): Boolean => {
  if (!obj || typeof key !== "string" || (typeof obj !== "object" && !Array.isArray(obj))) {
    return false;
  } else if (obj.hasOwnProperty(key) && !Array.isArray(obj)) { // don't consider array indexes as key
    return true;
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const result = hasKey(obj[i], key);
      if (result) {
        return result;
      }
    }
  } else {
    for (const k in obj) {
      const result = hasKey(obj[k], key);
      if (result) {
        return result;
      }
    }
  }

  return false;
};

const countKey = (obj: Object, key: string): Number => {
  let keyCount = 0;
  const countExistingKey = (obj: Object, key: string): Boolean => {
    if (!obj || typeof key !== "string" || (typeof obj !== "object" && !Array.isArray(obj))) {
      return false;
    }
    if (obj.hasOwnProperty(key) && !Array.isArray(obj)) { // don't consider array indexes as key
      keyCount += 1;
    }
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const result = countExistingKey(obj[i], key);
        if (result) {
          return result;
        }
      }
    } else {
      for (const k in obj) {
        const result = countExistingKey(obj[k], key);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  countExistingKey(obj, key);
  return keyCount;
};

const findPaths = (obj: Object, targetKey: string): string[] => {
  const paths: string[] = [];

  const helper = (currentObj: Object, currentPath: string[]) => {
    if (typeof currentObj !== "object" || currentObj === null) {
      return;
    }

    if (currentObj.hasOwnProperty(targetKey)) {
      paths.push([...currentPath, targetKey].join("."));
    }

    if (Array.isArray(currentObj)) {
      currentObj.forEach((item, index) => {
        helper(item, [...currentPath.slice(0, -1), `${currentPath.length ? currentPath[currentPath.length - 1] : ""}[${index}]`]);
      });
    } else {
      for (const key in currentObj) {
        helper(currentObj[key], [...currentPath, key]);
      }
    }
  };

  helper(obj, []);

  return paths;
};

const getValues = (obj: Object, targetKey: string): any[] => {
  const values: any[] = [];

  const helper = (currentObj: any, currentPath: string[]) => {
    if (typeof currentObj !== "object" || currentObj === null) {
      return;
    }

    if (currentObj.hasOwnProperty(targetKey)) {
      values.push(currentObj[targetKey]);
    }

    if (Array.isArray(currentObj)) {
      currentObj.forEach((item, index) => {
        helper(item, [...currentPath.slice(0, -1), `${currentPath[currentPath.length - 1]}[${index}]`]);
      });
    } else {
      for (const key in currentObj) {
        helper(currentObj[key], [...currentPath, key]);
      }
    }
  };

  helper(obj, []);

  return values;
};

export {
  hasKey,
  countKey,
  findPaths,
  getValues
};