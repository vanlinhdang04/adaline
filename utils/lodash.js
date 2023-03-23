//https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_isempty
export const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

//https://www.geeksforgeeks.org/flatten-javascript-objects-into-a-single-depth-object/#:~:text=We%20make%20a%20function%20called,the%20value%20in%20the%20result.
export const flattenObj = (ob) => {
  let result = {};

  for (const i in ob) {
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObj(ob[i]);
      for (const j in temp) {
        result[i + "." + j] = temp[j];
        // result[j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
};

export const uniqify = (array, key) =>
  array.reduce(
    (prev, curr) =>
      prev.find((a) => a[key] === curr[key]) ? prev : prev.push(curr) && prev,
    []
  );
