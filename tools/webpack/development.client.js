const config = require('./base.client');
const webpack = require('webpack');
const { envVariables } = require('./constants');

// const port = process.env.PORT;
config.entry.app.unshift('webpack-hot-middleware/client');
config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
config.plugins.unshift(
  new webpack.DefinePlugin({
    'process.env': envVariables
  })
);
config.node = {
  fs: 'empty'
};
config.mode = 'development';
// config.devServer = {
//   host: 'localhost',
//   port,
// };

module.exports = config;
