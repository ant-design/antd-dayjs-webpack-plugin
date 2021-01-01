# antd-dayjs-webpack-plugin

[![NPM version](http://img.shields.io/npm/v/antd-dayjs-webpack-plugin.svg?&colorB=51C838&style=flat-square)](https://www.npmjs.org/package/antd-dayjs-webpack-plugin)

A webpack plugin for [Day.js](https://github.com/iamkun/dayjs). 一个 Day.js 的 Webpack 插件。

Replace Moment.js with Day.js in antd project in ONE step. Bundle size reduced from 65 kb -> 4.19 kb.

只需一步操作即可使用 Day.js 替换 Moment.js ，打包体积由 65 kb 优化至 4.19 kb。

|Name |Size|Size gzip|
|------|---|---|
|Moment.js|231 kb |65.55 kb|
|Day.js|11.11 kb |4.19 kb|

<div>
  <img width="300" height="170" alt="moment dayjs" src="https://user-images.githubusercontent.com/17680888/54087182-73926580-438b-11e9-9899-cd68849f9f8d.png">

  <img width="300" height="170" alt="moment dayjs 2kb" src="https://user-images.githubusercontent.com/17680888/54087181-72613880-438b-11e9-878a-a01ff0fdf7bf.png">
<div>

## Usage 使用方法

0. Install `npm i dayjs --save`. 安装 `dayjs`。
1. Install `npm i antd-dayjs-webpack-plugin --save-dev`. 安装 `antd-dayjs-webpack-plugin`。
2. Add an instance of the plugin to the webpack plugin configuration. 更新 webpack 配置。


## Example 示例

```js
// webpack-config.js
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new AntdDayjsWebpackPlugin()
  ]
};

// index.js
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
// 如果要使用非"英语"语言，请在项目文件里引入对应的语言包
// if using locale other than 'en', please load the locale file in advance
```

## Ant Design 3.x Notice Ant Design 3.x 注意事项
If you are using this plugin in a Ant Design 3.x project, you have to config it manually.
如果在 Ant Design 3.x 的项目中使用本插件，需要传入以下配置。

```js
  plugins: [
    new AntdDayjsWebpackPlugin({
      preset: 'antdv3'
    })
  ]
```

### Configuration 配置

No configuration needed unless you know what these configs mean. 默认无需额外配置，除非有特殊需要。

| Attribute      | Description          | Type      | Accepted Values       | Default  |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| plugins           | plugin name    | Array[string]          |   all support plugins    |    []    |
| replaceMoment              | replace moment to dayjs with webpack alias config  | Boolean | true / false |   |
| preset              | name of preset configuration                   | String | 'antd' | 'antd' |

Preset 'antd' contains the following plugins and set `replaceMoment` to `true`, you can pass your own plugin config/ replaceMoment config to override it.
'antd' 预设包含以下插件，并开启了‘替换Moment’配置，你可以通过 plugin 选项来配置自定义的插件组合及‘替换Moment’配置。
```js
[
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
]
```
### Notice 说明

1. Day.js is a lightweight library with only 2kb size, but we have to use some other plugins to make full compatible to moment.js in Antd, so the final bundle size is 4.19 kb (Still small 😀)

- Day.js 是一个只有 2kb 的轻量级时间库，但为了完成对 moment.js 和 Antd 代码的替换，我们需要引入一些特殊的插件，这会使最终的体积变成 4.19 kb （但仍然很小呀😀 ）

2. If you are using preset `antdv3` in a Ant Design 3.x project, please note: Day.js is designed to be immutable, however, in order to make full compatible to moment.js in Antd 3.x, we have to use a plugin 🚨 `BadMutable` 🚨 to make Day.js mutable. This's not good and not what we want, but there's no better option. With this plugin enabled, all setters will update the instance itself.

- 如果是在 Ant Design 3.x 项目中使用了 `antdv3` 配置，请注意： Day.js 被设计成不可变的对象，但是为了完成对 moment.js 的替换，必须要引入一个 🚨 `BadMutable` 🚨插件让其变成可变对象，这并不是一个好的选择，但为了兼容也没有更好的办法。当使用这个插件后，所有的 setter 都会更新当前实例。
