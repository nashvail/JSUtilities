// BetaTools.js v0.01
// Attempt at cloining Underscore.js/Lodash.js just for fun :-)
// ------------------------------------------------------------
// Finished Features - [_](To Begin) [-](In Progress) [x](Done)
// ------------------------------------------------------------
// [_] contains (for both objects and arrays)
// [-] differnce
// [-] flatten (Array)
// [-] flattenObject
// [-] invert
// [-] isArray
// [-] removeDuplicates
// [-] unflattenObject
// [-] values
// [-] without
// [-] intersection

module.exports = ß = {};


// [WIP]
ß.contains = function contains(obj, item) {
	// The passed in thing could be an array or a regular object alright? 
	let type = Object.prototype.toString.call(obj);
	console.log(type);
	if(type === '[object Object]') {
		return obj.hasOwnProperty(value);
	} else if(type === '[object Array]') {
		return !!~obj.indexOf(value);
	}
};

/*
* Similar to without except returns the value from array that are not present in 
* any of the other arrays.
*/
ß.difference = function difference(array) {
	if(arguments.length <= 1) return array; else {
		let allValues = ß.flatten(Array.from(arguments).slice(1));
		return array.filter( elem => !~allValues.indexOf(elem));
	}
};

/* 
 * Flattens a nested array (the nesting can be to any depth). 
 * If you pass shallow, the array will only be flattened a single level.
 */
ß.flatten = function flatten(arr, shallow) {

	let result = [];

	recFlatten(arr, 0, 1);

	function recFlatten(value, currentDepth, maxDepth) {
		if (shallow) { // For flattening to a specific level
			if (currentDepth <= maxDepth) {
				if (Array.isArray(value)) {
					value.forEach(value => {
						recFlatten(value, currentDepth + 1, maxDepth)
					});
				} else {
					result.push(value);
				}
			} else {
				result.push(value);
			}
		} else { // For flattening all the way through
			if (Array.isArray(value)) {
				value.forEach(value => {
					recFlatten(value, result)
				});
			} else {
				result.push(value);
			}
		}
	}

	return result;
};

/*
* Flatten nested Objects, e.g
* Input: 
* let test = {
	a: 2,
	b: 'hello',
	c: {
		d: {
			e: 'world',
			f: 2,
			g: {
				h: {
					i: 'too deep'
				}
			}
		}
	},
	j: 42,
	k: {
		l: 'greetings'
	}
};
* Output:
	{
		a: 2,
		b: hello,
		c.d.e: 'world',
		c.d.e.f: 2,
		c.d.e.g.h.i: 'too deep',
		...
		..
		.
	}
*/
ß.flattenObject = function flattenObject(toFlatten) {
	let result = {};

	if (typeof toFlatten === 'object' && !Array.isArray(toFlatten)) {
		Object.keys(toFlatten).forEach(key => {
			recFlatten('', key, toFlatten[key]);
		});
	} else {
		console.err('Passed in parameter is not an object');
	}

	function recFlatten(scope, key, value) {
		let newScope = scope === '' ? key : `${scope}.${key}`;

		if(typeof value === 'object' && !Array.isArray(value)) {
			Object.keys(value).forEach( currentKey => {
				recFlatten(newScope, currentKey, value[currentKey]);
			});
		} else { 
			result[newScope] = value;
			return;
		}
	}

	return result;
};

/*
* Returns an array of values that is present in each of the passed in ararys
*/
ß.intersection = function intersection() {
	let arrays = Array.from(arguments); // or you can use [].slice.call(arguments) to get an Array
	return ß.removeDuplicates(arrays[0]).filter( value => isPresentInAll(value));

	function isPresentInAll(val) {
		for(let i = 0, length = arrays.length; i < length; i++ ) if(!~arrays[i].indexOf(val)) return false;
		return true;
	}
};

/*
* Inverts an object - where in all the keys become values and all the values become keys.
* All object values should be unique and string serializable.
*/
ß.invert = function invert(obj) {
	let keys = Object.keys(obj);
	let result = {};

	keys.forEach( key => {
		result[obj[key]] = key;
	});

	return result;

};

/*
* Returns true if passed in object(a) is an array, false otherwise
*/
ß.isArray = Array.isArray || function(a) {
	return Object.prototype.toString.call(a) === '[object Array]';
};

/*
* Removes duplicates from the passed in array.
* ---- Don't know how well this works alright ---
*/
ß.removeDuplicates = function removeDuplicates(arr) {
	return [...new Set(arr)];
};

/*
* Unflattens and returns an object to intial state as flattened by flattenObject function.
* e.g.
* Input: 
	let test = {
		a: 2,
		b: 'hello',
		'c.d.e': 'world',
		'c.d.f': 2,
		'c.d.g.h.i': 'too deep',
		j: 42,
		'k.l': 'greetings'
	};
	* Output: 
	* {
		a: 2,
		b: 'hello',
		c: {
			d: {
				e: 'world',
				f: 2,
				g: {
					h: {
						i: 'too deep'
					}
				}
			}
		},
		j: 42,
		k: {
			l: 'greetings'
		}
	};
*/
ß.unflattenObject = function unFlattenObject(toUnflatten) {
	let result = {};

	if(Object.prototype.toString.call(toUnflatten) === '[object Object]') {
		Object.keys(toUnflatten).forEach( key => {
			addPropToResult(result, key, toUnflatten[key]);
		});
	} else {
		return toUnflatten;
	}

	function addPropToResult(container, key, value) {
		let keys = key.split('.');
		let currentKey = keys[0];

		if(keys.length === 1) container[currentKey] = value; else {
			if(!container.hasOwnProperty(currentKey)) container[currentKey] = {};
			addPropToResult(container[currentKey], keys.slice(1).join('.'), value);
		}
	}

	return result;
};

/*
* Returns the values in an object wrapped in an array
*/
ß.values = function values(obj) {
	let keys = Object.keys(obj);
	let length = keys.length;
	let values = Array(length); // Array() constructor is 2x fast in major browswers than []
	for(let i = 0; i < length; i++) 
		values[i] = obj[keys[i]];

	return values;
};

/*
 * Returns a copy of the array with all instances of the values(arguments passed after array) removed.
 */
ß.without = function without(array) {
	// Using differnce function
	return ß.difference(array, Array.from(arguments).slice(1));
	// Without using ß.difference as a helper	
	// let toRemove = Array.from(arguments).slice(1);
	// return array.filter(elem => !~toRemove.indexOf(elem));
};
