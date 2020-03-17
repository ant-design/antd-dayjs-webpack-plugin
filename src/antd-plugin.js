const localeMap = {
  en_GB: 'en-gb',
  en_US: 'en',
  zh_CN: 'zh-cn',
  zh_TW: 'zh-tw'
};

const parseLocale = function parseLocale(locale) {
  var mapLocale = localeMap[locale];
  return mapLocale || locale.split('_')[0];
};

module.exports = function (option, dayjsClass, dayjsFactory) {
  const oldLocale = dayjsClass.prototype.locale
  dayjsClass.prototype.locale = function(arg) {
    if (typeof arg === 'string') {
      arg = parseLocale(arg)
    }
    return oldLocale.call(this, arg)
  }
}