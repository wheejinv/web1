// 순열(permutation)과 조합(combination)

// nPr
function nPr(n, r) {
	let result = 1;
	for (let i = n -r + 1; i <= n; i++) {
		result *= i;
	}

	return result;
}

// nCr
// 순열에 대한 공부를 하려면 조합이 유도되는 강의같은건 봐야 리마인드될거 같다.
// 재귀적인 방식: nCr = (n-1Cr-1) + (n-1Cr)
// 아래 함수는 재귀적인 방식으로 하게되면 함수 스택과 관련된 문제가 발생하는걸 예방하는 점화식을 사용한 풀이 예제임.
function nCr(n, r) {
	let result = 1;
	for (let i = 1; i < r; i++) {
		result = result * (n - i + 1) / i;
	}

	return result;
}

console.log(nCr(3, 2))
