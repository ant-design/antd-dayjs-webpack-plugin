# antd-dayjs-webpack-plugin

[![NPM version](http://img.shields.io/npm/v/antd-dayjs-webpack-plugin.svg?style=flat-square)](https://www.npmjs.org/package/antd-dayjs-webpack-plugin)

A webpack plugin for [dayjs](https://github.com/iamkun/dayjs). 

- Pre-pack all the needed plugins and locales. 
- Auto replace `moment` with `dayjs` in source code.

## Usage

1. Install `antd-dayjs-webpack-plugin`.
1. Add an instance of the plugin to the webpack plugin configuration.


## Example

```js
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

const configuration = {};

module.exports = {
  // ...
  plugins: [
    new AntdDayjsWebpackPlugin(configuration)
  ]
};
```

### Configuration

| Attribute      | Description          | Type      | Accepted Values       | Default  |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| plugins           | plugin name    | Array[string]          |   all support plugins    |    []    |
| locales              | locale name                | Array[string] | all support locales | []  |
| replaceMoment              | replace moment to dayjs with webpack alias config  | Boolean | true / false | false  |
| preset              | name of preset configuration                   | String | antd | -  |
