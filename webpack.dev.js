const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = merge(baseConfig, {
    watch: true,
    // devtool: 'inline-source-map'
})
