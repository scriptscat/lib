const path = require("path");

const home = __dirname + "/src";

module.exports = {
  entry: {
    gm: home + "/gm/index.ts",
    scsite: home + "/scsite/index.js",
    utils: home + "/utils/index.ts",
    ui: home + "/ui/index.ts"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
  },
  plugins: [],
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
