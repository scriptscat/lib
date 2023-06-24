const path = require("path");
const ScriptCatWebpackPlugin = require("scriptcat-webpack-plugin");

module.exports = {
  entry: {
    ui: "./example/ui.js",
  },
  output: {
    path: __dirname + "/dist/example",
    filename: "[name].js",
  },
  plugins: [
    new ScriptCatWebpackPlugin({
      file: "ui.js",
      name: "脚本猫UI库",
      namespace: "基于Arco做的UI库, 用于快速开发脚本的UI界面",
      version: "0.1.0",
      description: "try to take over the world!",
      author: "You",
      metadata: {
        match: "https://bbs.tampermonkey.net.cn/",
      },
      requireFile: [
        "./dist/ui.js"
      ],
    })
  ],
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
        use: ["raw-loader"],
      }
    ],
  },
};
