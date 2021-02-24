const { createMetroConfiguration } = require('expo-yarn-workspaces');

const defaultConfig = createMetroConfiguration(__dirname);

module.exports = {
  ...defaultConfig,
  server: {
    ...defaultConfig.server,
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // When an asset is imported outside the project root, it has wrong path on Android
        // So we fix the path to correct one
        if (/\/packages\/.+\.png\?.+$/.test(req.url)) {
          req.url = `/assets/../${req.url}`;
        }

        return middleware(req, res, next);
      };
    },
  },
};
