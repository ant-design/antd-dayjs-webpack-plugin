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
}

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
    // add init dayjs entry and loader
    if (this.plugins) {
      const { entry, module } = compiler.options

      const initLoaderRule = {
        test: /init-dayjs-webpack-plugin-entry\.js$/,
        use: [{
          loader: path.resolve(__dirname, './init-loader.js'),
          options: {
            plugins: this.plugins
          }
        }]
      }

      if (module.rules) {
        module.rules.push(initLoaderRule)
      } else {
        compiler.options.module.rules = [initLoaderRule]
      }

      const initFilePath = path.resolve(__dirname, 'init-dayjs-webpack-plugin-entry.js')
      const initEntry = require.resolve(initFilePath)

      compiler.options.entry = makeEntry(entry, initEntry)
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
