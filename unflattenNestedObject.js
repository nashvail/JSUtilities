let test = {
	a: 2,
	b: 'hello',
	'c.d.e': 'world',
	'c.d.f': 2,
	'c.d.g.h.i': 'too deep',
	j: 42,
	'k.l': 'greetings'
};

function unflatten(toUnflatten) {
	let result = {};

	if(typeof toUnflatten === 'object' && !Array.isArray(toUnflatten)) {
		Object.keys(toUnflatten).forEach( key => {
			if(isProp(key)) {
				result[key] = toUnflatten[key];
			} else if(isPropWithScope(key)) {
				let keys = key.split('.'),
					terminalKey = keys[keys.length - 1],
					value = toUnflatten[key];

				addProp(result, keys, 0, terminalKey, value);
			}
		});
	}

	function addProp(obj, keys, currentKeyIndex, terminalKey, value) {
		if(keys[currentKeyIndex] === terminalKey) {
			obj[terminalKey] = value;
			return;
		} else {
			if(!obj.hasOwnProperty(keys[currentKeyIndex])) 
				obj[keys[currentKeyIndex]] = {};
			
			addProp(obj[keys[currentKeyIndex]], keys, currentKeyIndex + 1, terminalKey, value);
		}
	}


	function isProp(key) {
		return key.split('.').length === 1;
	}

	function isPropWithScope(key) {
		return key.split('.').length >  1;
	}

	return result;

}

console.log(unflatten(test));	