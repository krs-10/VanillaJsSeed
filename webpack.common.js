const path = require("path"),
	webpack = require("webpack"),
	HtmlWebpackPlugin = require("html-webpack-plugin");


const COMMON_RULES = [
	// js
	{
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: { loader: "babel-loader" }
	},
	// images
	{
		test: /\.(jpe?g|gif|png|JPG|svg)$/,
		use: [
			{
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
				}
			},
		],
	},

	// fonts
	{
		test: /\.(ttf|eot|otf|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
		use: { loader: "url-loader" }
	},
	// audio/video
	{
		test: /\.(wav|mp3)$/,
		use: ["file-loader"]
	},
]

const COMMON_EXTERNALS = {

}

const COMMON_RESOLVE = {
	extensions: [".js", ".jsx", ".json"],
	alias: {
		components: path.resolve(__dirname, 'src/components/'),
		styles: path.resolve(__dirname, 'src/styles/'),
		assets: path.resolve(__dirname, 'src/assets/'),
		store: path.resolve(__dirname, 'store/')
	}
};

const COMMON_OUTPUT = {
	path: path.resolve(__dirname, "dist"),
	filename: "[name].[hash].js",
	chunkFilename: "[name].[hash].bundle.js",
};

const COMMON_PLUGINS = [
	new webpack.ProvidePlugin({
		'React': 'react',
		'Component': ['react', 'Component'],
		'Fragment': ['react', 'Fragment']
	}),
	new HtmlWebpackPlugin({
		inject: true,
		hash: true,
		template: path.resolve(__dirname, "src/index.html"),
		sourceMap: true,
	})
];


const COMMON = {
	resolve: COMMON_RESOLVE,
	externals: COMMON_EXTERNALS,
	output: COMMON_OUTPUT,
	module: {
		rules: COMMON_RULES
	},
	plugins: COMMON_PLUGINS
}


module.exports = COMMON; 
