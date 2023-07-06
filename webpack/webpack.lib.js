const path = require("path");

module.exports = {
	resolve: {
		extensions: [".js", ".ts", ".tsx"],
		alias: {
			"@App": path.resolve(__dirname, "src/"),
		},
		fallback: {
			crypto: require.resolve("crypto-browserify"),
			stream: require.resolve("stream-browserify"),
			util: false,
		},
	},
	module: {
		rules: [
			{ test: /\.(ts|tsx)?$/, use: "ts-loader" },
			{
				test: /arco\.css$/,
				use: [
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["cssnano"]],
              },
            },
          },
        ],
			}
		],
	},
};
