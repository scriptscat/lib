const path = require("path");
const ScriptCatWebpackPlugin = require("scriptcat-webpack-plugin");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.lib");

module.exports = merge(baseConfig, {
  entry: {
    ui: "./src/ui/index.ts",
    "ui.user": "./example/ui.user.js",
    "ast.user": "./example/ast.user.js",
  },
  output: {
    path: __dirname + "/../dist/example",
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new ScriptCatWebpackPlugin(
      {
        file: "ui.user.js",
        name: "脚本猫UI库",
        namespace: "https://scriptcat.org/",
        version: "0.1.0",
        description: "基于Arco做的UI库, 用于快速开发脚本的UI界面",
        author: "You",
        metadata: {
          match: "https://bbs.tampermonkey.net.cn/",
        },
        requireFile: ["./dist/example/ui.js"],
      },
      {
        group1: {
          configA: {
            // 键值为group.config,例如本键为:group1.configA
            title: "配置A", // 配置的标题
            description: "这是一个文本类型的配置", // 配置的描述内容
            type: "text", // 选项类型,如果不填写会根据数据自动识别
            default: "默认值", // 配置的默认值
            min: 2, // 文本最短2个字符
            max: 18, // 文本最长18个字符
            password: true, // 设置为密码
          },
        },
      }
    ),
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
      requireFile: ["./dist/example/ui.js"],
    }),
  ],
});
