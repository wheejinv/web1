module.exports = {
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
	transform: {
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: [
		"<rootDir>/src/setupTests.js"
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileMock.js",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy"
	},
	testMatch: [
		'<rootDir>/**/*.test.(js|jsx|ts|tsx)',
		'<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
	],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
