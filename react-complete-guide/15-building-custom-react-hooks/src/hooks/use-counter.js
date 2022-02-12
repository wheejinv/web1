import {useEffect, useState} from "react";

// 컴포넌트에서 사용 시 컴스텀 훅을 호출하면
// 이 상태나 이펙트는 커스텀 훅을 사용하고 있는 컴포넌트와 묶이게 된다.

// use 가 붙으면 해당 함수를 훅의 규칙에 따라서 사용하겠다고 보장해주는 것.
function useCounter(isPlus = false) {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCounter((prevCounter) => {
				if (isPlus) {
					return prevCounter + 1;
				} else {
					return prevCounter - 1;
				}
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isPlus]);

	return counter;
}

export default useCounter;
