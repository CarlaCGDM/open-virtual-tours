
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.watch = false; // Disable Webpack's watch mode
      webpackConfig.watchOptions = {
        ignored: ['public/uploads'], // Ignore unnecessary files
      };

      // Ensure Hot Module Replacement (HMR) is disabled too
      if (webpackConfig.devServer) {
        webpackConfig.devServer.hot = false; // Disable hot reload
        webpackConfig.devServer.liveReload = false; // Disable auto-refresh
      }

      return webpackConfig;
    }
  }
};