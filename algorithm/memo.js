/*
여러 개의 테이블에 사람을 나누어 앉게 하려고 한다.
한 사람만 앉는 테이블이 없게 그룹을 지어야 한다.

한개의 테이블에 앉을 수 있는 사람은 최대 10명일 때,
100명이 하나 이상의 테이블에 나누어 앉는 패턴을 구하세요.

ex. 6명이면, 4가지 경우가 나옴
- 2 + 2 + 2
- 2 + 4
- 3 + 3
- 6
* */

// 남은 사람 수와 이전 테이블에 배치한 사람 수만 알면,
// 재귀적으로 검색할 수 있다.
// 남은 사람 수와 이전 테이블에 배치한 사람 수를 매개 변수로 전달하면 됨.

const TABLE_ALLOWED_SEAT = 10;
const PEOPLE = 100;

let memo = {};

function check(remain, pre) {
	// 이전에 계산한 적 있다면, 메모했던 값을 반환
	if (memo[[remain, pre]]) {
		return memo[[remain, pre]];
	}

	// 배치할 사람이 더 이상 없으면 종료
	if (remain < 0) {
		return 0;
	}
	if (remain === 0) {
		return 1;
	}

	let cnt = 0;
	for (let i = pre; i <= TABLE_ALLOWED_SEAT; i++) {
		cnt += check(remain - i, i);
	}

	// 계산결과를 메모하면서 반환
	return memo[[remain, pre]] = cnt;
}

console.log(check(PEOPLE, 2)); // 437,420
// console.log(check(4, 2))
// console.log(JSON.stringify(memo));
