// node exercide 2
// calculates the average of elements in arrays

function average(arr) {
	let sum = 0;
	// arr.forEach(function() {
	// 	sum = sum + this.value; - nope: doesn't work
	// })
	
	// arr.forEach(element => console.log(element))
	arr.forEach(element => {
		sum += element;
	})
	
	console.log("Average: " + Math.round(sum/arr.length));
}

let array1 = [90, 98, 89, 100, 100, 86, 94];
let array2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

average(array1);
average(array2);






