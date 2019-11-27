const fs = require('fs')
const path = require('path')

const presets = {
  antd: {
    plugins: [
      'isSameOrBefore',
      'isSameOrAfter',
      'advancedFormat',
      'customParseFormat',
      'weekYear',
      'weekOfYear',
      'isMoment',
      'localeData',
      'badMutable'
    ],
    locales: [
      'zh-cn'
    ],
    replaceMoment: true
  }
}
class WebpackDayjsPlugin {
  constructor(options = { preset: 'antd' }) {
    const { preset, plugins, locales, replaceMoment } = options;
    if (preset && presets[preset]) {
      this.plugins = presets[preset].plugins
      this.locales = presets[preset].locales
      this.replaceMoment = presets[preset].replaceMoment
    }
    if (plugins) this.plugins = plugins
    if (locales) this.locales = locales
    if (replaceMoment !== undefined) this.replaceMoment = replaceMoment
  }

  apply(compiler) {
    // add init dayjs entry
    if (this.plugins || this.locales) {
      const initFilePath = path.resolve(__dirname, 'init-dayjs.js')
      let initContent = `var dayjs = require( 'dayjs');`
      this.plugins.forEach((plugin) => {
        initContent += `var ${plugin} = require( 'dayjs/plugin/${plugin}');`
      })
      this.locales.forEach((locale) => {
        initContent += `require('dayjs/locale/${locale}');`
      })
      this.plugins.forEach((plugin) => {
        initContent += `dayjs.extend(${plugin});`
      })
      // set default locale
      if (this.locales.length) {
        initContent += `dayjs.locale('${this.locales[0]}');`
      }
      fs.writeFileSync(initFilePath, initContent)
      compiler.options.entry.unshift(
        require.resolve(initFilePath)
      )
    }
    // set dayjs alias
    if (this.replaceMoment) {
      const { alias } = compiler.options.resolve
      if (alias) {
        alias.moment = 'dayjs'
      } else {
        compiler.options.resolve.alias = {
          moment: 'dayjs'
        }
      }
    }
  }
}

module.exports = WebpackDayjsPlugin
