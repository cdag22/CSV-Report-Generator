const cleanString = function cleanString(str) {
  str = str.split('=');
  str = str[str.length - 1];
  return str.replace(/[;]+/g, '');
};

const getUnique = function getUnique(one, two) {
  return [...new Set([...one, ...two])];
}

const buildKeyList = function buildKeyList(obj) {
  let keys = Object.keys(obj).filter(key => key !== 'children');
  for (let item of obj.children) {
    keys = getUnique(buildKeyList(item), keys);
  }
  return keys;
};

const flattenObject = function flattenObject(obj) {
  let list = []
  if (!obj.children.length) {
    delete obj['children']
    return [obj];
  }
  for (let sub of obj.children) {
    list = list.concat(flattenObject(sub));
  }
  delete obj['children']
  list.push(obj);
  return list;
};

const addMissingKeys = function addMissingKeys(objectList, allKeysPresent) {
  // append missing keys to objects if not present
  return objectList.map(obj => {
    let newKeys = allKeysPresent.filter(key => !obj.hasOwnProperty(key));
    for (let key of newKeys) {
      obj[key] = '';
    }
    return obj;
  });
};

const convertObjectsToLists = function convertObjectsToLists(objectList, keys) {
  return objectList.map(obj => keys.map(key => obj[key]).join(','));
};

const buildCSV = function buildCSV(list, keys) {
  return [].concat(keys.join(','), ...list).join('\n');
};



module.exports.convertToCSV = function convertToCSV(str) {
  let obj = JSON.parse(cleanString(str));
  let allKeysPresent = buildKeyList(obj);
  let objectList = flattenObject(obj);

  objectList = addMissingKeys(objectList, allKeysPresent);
  objectList = convertObjectsToLists(objectList, allKeysPresent);

  return buildCSV(objectList, allKeysPresent);
}