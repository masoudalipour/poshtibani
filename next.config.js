const withTM = require('next-transpile-modules');

const singleInstanceModules = require('./singleInstanceModules');

module.exports = withTM([], {
  distDir: 'build',
  env: {
    BUILD_COMMIT_SHA: process.env.DRONE_COMMIT_SHA || 'development-build',
    BUILD_COMMIT_MSG: process.env.DRONE_COMMIT_MESSAGE || 'feat: add something awesome',
    DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV, // can be `nightly`, `qa`, `production`, etc
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 8,
  },
  // We can use next.js global css support to load typeface-x fonts
  // We are also waiting for postcss support https://github.com/zeit/next.js/issues/8983#issuecomment-539169860
  // TODO: add next css support when stable
  // experimental: {
  // css: true,
  // },
  webpack: (config, { isServer }) => {
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
    // read aliases from tsconfig paths
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    // only one version of react, react-dom, etc will be loaded
    config.resolve.alias = {
      ...config.resolve.alias,
      ...singleInstanceModules,
    };

    // https://github.com/martpie/next-transpile-modules/issues/50#issuecomment-558318688
    if (isServer) {
      config.externals = config.externals.concat(Object.keys(singleInstanceModules));
    }

    return config;
  },
});
