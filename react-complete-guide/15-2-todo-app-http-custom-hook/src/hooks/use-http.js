import {useState} from "react";

function useHttp(requestConfig, applyData) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// 다른 url 로 요청 가능, 데이터 변환 가능
	// 그렇지만 항상 로딩과 에러라는 동일한 상태를 관리해야 하고,
	// 동일한 과정을 동일한 순서로 실행하는게 목표
	const sendRequest = async (taskText) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method ? requestConfig.method : 'GET',
				headers: requestConfig.headers ? requestConfig.headers : {},
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();
			applyData(data)
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	};

	return {
		isLoading,
		error,
		sendRequest,
	}
}

export default useHttp;
