const path = require('path');
const { whenProd } = require('@craco/craco');
const cssnano = require('cssnano');
const {
  compilerOptions: { paths },
} = require('./tsconfig.json');

module.exports = {
  eslint: {
    mode: 'file',
  },
  webpack: {
    // Set them your alias in the tsconfig.json
    alias: Object.keys(paths).reduce(
      (all, alias) => ({
        ...all,
        [alias.replace('/*', '')]: path.resolve(
          __dirname,
          'src',
          paths[alias][0].replace('/*', '')
        ),
      }),
      {}
    ),
  },
  style: {
    postcss: {
      plugins: (plugins) => whenProd(() => [...plugins, cssnano], []),
    },
    sass: {
      loaderOptions: {
        additionalData: `
              @import "src/scss/_mixins.scss";
            `,
      },
    },
  },
  jest: {
    configure: {
      // Set them your alias in the tsconfig.json
      moduleNameMapper: Object.keys(paths).reduce(
        (all, alias) => ({
          ...all,
          [alias.replace('/*', '/(.*)')]: path.join(
            '<rootDir>/src/',
            paths[alias][0].replace('/*', '/$1')
          ),
        }),
        {}
      ),
    },
  },
};
