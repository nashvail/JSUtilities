let arr = [1, 2, 3, [4, 5, [6, 7, [8]]]];

function flatten(arr) {

	var result = [];

	recFlatten(arr, result);

	function recFlatten(value, soFar) {
		if(Array.isArray(value)) {
			value.forEach( value => {recFlatten(value, soFar)});
		} else {
			soFar.push(value);
		}
		return;
	}

	return result;
}

console.log(flatten(arr)); // [1, 2, 3, 4, 5, 6, 7, 8]