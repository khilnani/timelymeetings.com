module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'xproduction') {
        // remove console in production
        const TerserPlugin = webpackConfig.optimization.minimizer.find((i) => i.constructor.name === 'TerserPlugin');
        if (TerserPlugin) {
          TerserPlugin.options.terserOptions.compress['drop_console'] = true;
        }
      }

      return webpackConfig;
    },
  },
};