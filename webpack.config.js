const path = require('path');

const home = __dirname + "/src";

module.exports = {
    entry: {
        "msg-push": home + "/msg-push/main.ts"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
    },
    plugins: [

    ],
    resolve: {
        extensions: [".js", ".ts"],
        alias: {
            "@App": path.resolve(__dirname, "src/")
        },
        fallback: {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify")
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' }
        ],
    }
};