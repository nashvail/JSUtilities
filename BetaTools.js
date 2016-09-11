// BetaTools.js v0.01
// Attempt at cloining Underscore.js/Lodash.js just for fun :-)
// ------------------------------------------------------------
// Finished Features - [_](To Begin) [-](In Progress) [x](Done)
// ------------------------------------------------------------
// [-] differnce
// [-] flatten (Array)
// [-] flattenObject
// [-] invert
// [-] unFlattenObject
// [-] without
// [_] intersection

module.exports = ß = {};

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
		var newScope = scope === '' ? key : `${scope}.${key}`;

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

// This is flawed
ß.intersection = function intersection(array) {
	let toIntersectWith = ß.flatten(Array.from(arguments).slice(1));
	return array.filter( elem => ~toIntersectWith.indexOf(elem));
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
let unfFlattenObject = function unFlattenObject(toUnflatten) {
	let result = {};

	if (typeof toUnflatten === 'object' && !Array.isArray(toUnflatten)) {
		Object.keys(toUnflatten).forEach(key => {
			if (isProp(key)) {
				result[key] = toUnflatten[key];
			} else if (isPropWithScope(key)) {
				let keys = key.split('.'),
					terminalKey = keys[keys.length - 1],
					value = toUnflatten[key];

				addProp(result, keys, 0, terminalKey, value);
			}
		});
	}

	function addProp(obj, keys, currentKeyIndex, terminalKey, value) {
		if (keys[currentKeyIndex] === terminalKey) {
			obj[terminalKey] = value;
			return;
		} else {
			if (!obj.hasOwnProperty(keys[currentKeyIndex]))
				obj[keys[currentKeyIndex]] = {};

			addProp(obj[keys[currentKeyIndex]], keys, currentKeyIndex + 1, terminalKey, value);
		}
	}


	function isProp(key) {
		return key.split('.').length === 1;
	}

	function isPropWithScope(key) {
		return key.split('.').length > 1;
	}

	return result;

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
