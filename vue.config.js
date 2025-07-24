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
          extract: false,
          spriteFilename: 'img/icons.svg'
        })
        .end()
  }
});