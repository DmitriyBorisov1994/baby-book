const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#e91e63',
              '@component-background': 'white',
              '@body-background': 'white',
              '@layout-header-background': '#C2185B',
              '@label-color': '#757575',
              '@text-color': '#212121',
              '@text-color-secondary': '#757575',
              '@heading-color': '#212121',
              '@border-color-split': '#BDBDBD',
              '@background-color-light': '#f8bbd07b',
              '@border-radius-base': '0px',
              '@layout-header-padding': '0 24px'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};