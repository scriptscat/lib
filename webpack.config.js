const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack/webpack.lib");
const home = __dirname + "/src";

module.exports = merge(baseConfig, {
  entry: {
    gm: home + "/gm/index.ts",
    scsite: home + "/scsite/index.js",
    utils: home + "/utils/index.ts",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  plugins: [],
});
