const fs = require('fs')
const path = require('path')

const presets = {
  antd: {
    plugins: [
      'isSameOrBefore',
      'isSameOrAfter',
      'advancedFormat',
      'customParseFormat',
      'weekday',
      'weekYear',
      'weekOfYear',
      'isMoment',
      'localeData',
      'localizedFormat',
    ],
    replaceMoment: true
  },
  antdv3: {
    plugins: [
      'isSameOrBefore',
      'isSameOrAfter',
      'advancedFormat',
      'customParseFormat',
      'weekday',
      'weekYear',
      'weekOfYear',
      'isMoment',
      'localeData',
      'localizedFormat',
      'badMutable'
    ],
    replaceMoment: true
  }
}

const makeEntry = (entry, initEntry) => {
  if (typeof entry === "object" && !Array.isArray(entry)) {
    Object.keys(entry).forEach(e => {
      entry[e] = makeEntry(entry[e], initEntry);
    });
    return entry;
  }
  if (typeof entry === "string") {
    return [initEntry, entry];
  }
  if (Array.isArray(entry)) {
    return [initEntry].concat(entry);
  }
  if (typeof entry === "function") {
    return async () => {
      const originalEntry = await entry();
      return makeEntry(originalEntry, initEntry);
    };
  }
};

class WebpackDayjsPlugin {
  constructor(options = { preset: 'antd' }) {
    const { preset, plugins, replaceMoment } = options;
    if (preset && presets[preset]) {
      this.plugins = presets[preset].plugins
      this.replaceMoment = presets[preset].replaceMoment
    }
    if (plugins) this.plugins = plugins
    if (replaceMoment !== undefined) this.replaceMoment = replaceMoment
  }

  apply(compiler) {
    // add init dayjs entry
    if (this.plugins) {
      const initFilePath = path.resolve(__dirname, 'init-dayjs.js')
      let initContent = `var dayjs = require( 'dayjs');`
      this.plugins.forEach((plugin) => {
        initContent += `var ${plugin} = require( 'dayjs/plugin/${plugin}');`
      })
      this.plugins.forEach((plugin) => {
        initContent += `dayjs.extend(${plugin});`
      })
      // special plugin
      initContent += `var antdPlugin = require( 'antd-dayjs-webpack-plugin/src/antd-plugin');dayjs.extend(antdPlugin);`
      fs.writeFileSync(initFilePath, initContent)
      const { entry } = compiler.options;
      const initEntry = require.resolve(initFilePath)
      compiler.options.entry = makeEntry(entry, initEntry);
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
