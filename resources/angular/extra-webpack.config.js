const webpack = require('webpack');
const dotenv = require('dotenv');
const expand = require('dotenv-expand').expand;

module.exports = (config, options) => {
  expand(dotenv.config({ path: __dirname + '/../../.env' }));

  const IS_DEV_SERVER = Boolean(config.devServer || false);
  const ASSET_URL = (process.env.ASSET_URL || '') + (IS_DEV_SERVER ? '' : '/angular/');
  const MIX_VAPOR_ASSET_URL = (process.env.ASSET_URL || '') + (IS_DEV_SERVER ? '' : "/angular");

  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.ASSET_PATH": JSON.stringify(ASSET_URL),
      "process.env.MIX_VAPOR_ASSET_URL": JSON.stringify(MIX_VAPOR_ASSET_URL)
    }),
  );

  config.output.publicPath = ASSET_URL;

  return config;
};
