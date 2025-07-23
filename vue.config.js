const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    svgSprite: {
        /*
         * The directory containing your SVG files.
         */
        dir: 'src/assets/icons',
        /*
         * The regex that will be used for the Webpack rule.
         */
        test: /\.(svg)(\?.*)?$/,
        /*
         * @see https://github.com/kisenka/svg-sprite-loader#configuration
         */
        loaderOptions: {
            extract: process.env.NODE_ENV === 'production', // true только в production  
            spriteFilename: 'img/icons.svg', // or 'img/icons.svg' if filenameHashing == false
            symbolId: 'icon-[name]'
        },
        /*
         * @see https://github.com/kisenka/svg-sprite-loader#configuration
         */
        pluginOptions: {
            plainSprite: true
        }    
    }    
  },   
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false // Сохраняем viewBox
              }
            }
          },
          {
            name: 'removeAttrs',
            params: {
              attrs: '(fill|stroke|stroke-width)' // Удаляем эти атрибуты
            }
          }
        ]
      })
  }
})
