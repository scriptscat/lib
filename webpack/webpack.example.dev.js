const { merge } = require('webpack-merge');
const common = require('./webpack.example.js');

module.exports = merge(common, {
  watch: true,
})
