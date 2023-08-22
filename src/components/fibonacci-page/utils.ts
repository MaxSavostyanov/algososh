export function getFibonacciNumbers(num: number) {
	const arr = [1, 1];
	for (let i = 2; i <= num; i++) {
		arr.push(arr[i-1] + arr[i-2]);
	}
	return arr;
}