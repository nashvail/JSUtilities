// Flattening 
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeCreate = Object.create;

var isArray = nativeIsArray || function(obj) {
  return toString.call(obj) === '[object Array]';
};

var property = function(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
};

var getLength = property('length');

// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
var has = function(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
};

var isArguments = function(obj) {
  return has(obj, 'callee');
};

// Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.
var isArrayLike = function(collection) {
  var length = getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// Flatten out an array, either recursively (by default), or just one level.
var _flatten = function(array, shallow) {
  return __flatten(array, shallow, false);
};

var __flatten = function(input, shallow, strict, output) {

  output = output || [];
  var idx = output.length;
  for (var i = 0, length = getLength(input); i < length; i++) {
    var value = input[i];
    if (isArrayLike(value) && (isArray(value) || _.isArguments(value))) {
      // Flatten current level of array or arguments object.
      if (shallow) {
        var j = 0, len = value.length;
        while (j < len) output[idx++] = value[j++];
      } else {
        _flatten(value, shallow, strict, output);
        idx = output.length;
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
};
