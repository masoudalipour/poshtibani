const path = require('path');

const getPath = (extension) => path.resolve(__dirname, `./src/**/*.${extension}`);

module.exports = {
  client: {
    includes: ['ts', 'tsx'].map((extension) => getPath(extension)),
    excludes: ['stories.tsx'].map((extension) => getPath(extension)),
    service: {
      name: 'repo-backend-local',
      localSchemaFile: path.resolve(
        __dirname,
        '../backend/src/shared/types/schema.graphql',
      ),
    },
    addTypename: true,
  },
};
