# antd-dayjs-webpack-plugin

[![NPM version](http://img.shields.io/npm/v/antd-dayjs-webpack-plugin.svg?style=flat-square)](https://www.npmjs.org/package/antd-dayjs-webpack-plugin)

A webpack plugin for [dayjs](https://github.com/iamkun/dayjs). 

Replace Moment.js with Day.js in antd project in ONE step. Bundle size reduced from 65 kb -> 4.19 kb.

|Name |Size|Size gzip|  
|------|---|---|
|Moment.js|231 kb |65.55 kb|
|Day.js|11.11 kb |4.19 kb|

<div>
  <img width="300" height="170" alt="moment dayjs" src="https://user-images.githubusercontent.com/17680888/54087182-73926580-438b-11e9-9899-cd68849f9f8d.png">

  <img width="300" height="170" alt="moment dayjs 2kb" src="https://user-images.githubusercontent.com/17680888/54087181-72613880-438b-11e9-878a-a01ff0fdf7bf.png">
<div>

- Pre-pack all the needed plugins and locales. 
- Auto replace `moment` with `dayjs` in source code.

## Usage

1. Install `antd-dayjs-webpack-plugin`.
1. Add an instance of the plugin to the webpack plugin configuration.


## Example

```js
// webpack-config.js
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

module.exports = {
  // ...
  plugins: [
    new AntdDayjsWebpackPlugin()
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
