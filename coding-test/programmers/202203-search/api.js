const API_END_POINT = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=';

export const request = async (url, options = {}) => {
	try {
		const fullUrl = `${API_END_POINT}${url}`
		const response = await fetch(fullUrl, options)

		if (response.ok) {
			const json = await response.json()
			return json;
		}
		throw new Error('API 통신 실패')
	} catch (e) {
		alert(e.message);
	}
}
