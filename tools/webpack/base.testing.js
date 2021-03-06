const baseClient = require('./base.client');
const webpack = require('webpack');
const { envVariables } = require('./constants');

baseClient.plugins.unshift(
  new webpack.DefinePlugin({
    'process.env': envVariables
  })
);

module.exports = {
  entry: baseClient.entry,
  output: baseClient.output,
  resolve: baseClient.resolve,
  plugins: baseClient.plugins,
  target: baseClient.target
};
