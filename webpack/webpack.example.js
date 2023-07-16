const path = require("path");
const ScriptCatWebpackPlugin = require("scriptcat-webpack-plugin");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.lib");

module.exports = merge(baseConfig, {
  entry: {
    "ui": "./src/ui/index.ts",
    "ui.user": "./example/ui.user.js",
    "ast.user": "./example/ast.user.js",
  },
  output: {
    path: __dirname + "/../dist/example",
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new ScriptCatWebpackPlugin({
      file: "ui.user.js",
      name: "脚本猫UI库",
      namespace: "https://scriptcat.org/",
      version: "0.1.0",
      description: "基于Arco做的UI库, 用于快速开发脚本的UI界面",
      author: "You",
      metadata: {
        match: "https://bbs.tampermonkey.net.cn/",
      },
      requireFile: [
        "./dist/example/ui.js"
      ],
    }),
    new ScriptCatWebpackPlugin({
      file: "ast.user.js",
      name: "脚本猫UI库（AST）",
      namespace: "https://scriptcat.org/",
      version: "0.1.0",
      description: "基于Arco做的UI库, 用于快速开发脚本的UI界面",
      author: "You",
      metadata: {
        match: "https://bbs.tampermonkey.net.cn/",
      },
      requireFile: [
        "./dist/example/ui.js"
      ],
    }),
  ],
});
