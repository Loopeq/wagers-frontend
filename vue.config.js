const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module.rules.delete('svg');

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]',
          extract: process.env.NODE_ENV === 'production',
          spriteFilename: 'img/icons.svg'
        })
        .end()
        .use('svgo-loader')
        .loader('svgo-loader')
        .options({
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false
                }
              }
            },
            {
              name: 'removeAttrs',
              params: {
                attrs: '(fill|stroke|stroke-width)'
              }
            }
          ]
        });
  }
});