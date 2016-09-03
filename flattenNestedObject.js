let test = {
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

/* Output 
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

function flatten(toFlatten) {
	var result = {};

	if(typeof toFlatten === 'object' && !Array.isArray(toFlatten)) {
		Object.keys(toFlatten).forEach( key => {
			step('', key, toFlatten[key]);
		});
	} else {
		console.err('Passed in parameter is not an object');
	}

	function step(scope, key, value) {
		if(typeof value === 'object' && !Array.isArray(value)) {
			let newScope = scope === '' ? `${key}` : `${scope}.${key}`;
			Object.keys(value).forEach( currentKey => {
				step(newScope, currentKey, value[currentKey]);
			});
		} else { // value is of a primitive type
			let prefix = scope === '' ? scope : `${scope}.`;
			result[`${prefix}${key}`] = value;
		}
	}

	return result;
}

console.log(flatten(test));