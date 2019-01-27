
const postcssPresetEnv = require("postcss-preset-env");

const config = () => ({
	plugins: [
		postcssPresetEnv({
			stage: 0,
			// features: {
			// 	'nesting-rules': true
			// }
		})
	]
})

module.exports = config
