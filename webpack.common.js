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
		test: /\.(jpe?g|gif|png|svg|JPG)$/,
		use: [
			{
				loader: "file-loader",
				options: {
					name: "[name].[ext]",
					outputPath: "public/images/"
				}
			}
		]
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


const COMMON_RESOLVE = {
		extensions : [".js", ".jsx", ".json"],
		alias: {
			components: path.resolve(__dirname, 'src/components/'),
			styles: path.resolve(__dirname, 'src/styles/'),
			assets: path.resolve(__dirname, 'src/assets/'),
		}
	}; 

const COMMON_OUTPUT = {
		path: path.resolve(__dirname, "build"),
		filename: "[name].[hash].js",
		chunkFilename: "[name].[hash].bundle.js",
	}; 

const COMMON_PLUGINS = [
//   new webpack.ProvidePlugin({
// 	p5: "p5", 
// 	ml5: "ml5"
//   }),
  new HtmlWebpackPlugin({
    inject: true,
    template: path.resolve(__dirname, "src/index.html"),
    sourceMap: true,
    chunksSortMode: "dependency"
  })
];

const COMMON = {
	resolve: COMMON_RESOLVE, 
	output: COMMON_OUTPUT, 
	module: {
		rules: COMMON_RULES
	}, 
	plugins: COMMON_PLUGINS
}


module.exports = COMMON; 
