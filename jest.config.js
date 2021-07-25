module.exports = {
	// a set of setting that give typescript support to jest
	preset: 'ts-jest',

	// transform ts|tsx to a jest understandable format
	transform: {
		'.ts|tsx': 'ts-jest',
	},
	// mocking and transforming of css modules and other files
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/src/__mocks__/fileMock.js',
		'\\.(css|less)$': 'identity-obj-proxy',
	},
	// important to expose all the jest-dom api globally in each test
  setupFilesAfterEnv: ["@testing-library/jest-dom/"]
};
