"use strict";

var IntlPolyfill = require('intl');

var IntlMessageFormat = require('intl-messageformat');

var IntlRelativeFormat = require('intl-relativeformat');

require('intl/locale-data/jsonp/en');

require('intl/locale-data/jsonp/fr');

require('intl/locale-data/jsonp/nl');

function isValidDate(date) {
  return date instanceof Date;
}

function getTranslationMessage(key, translations) {
  return translations.find(function (_ref) {
    var x = _ref.key;
    return x === key;
  });
}

function toValidIntlLocale(locale) {
  return locale.replace('_', '-');
}

var defaultI18n = {
  text: function text(translations, locale) {
    return function (key, value) {
      var translationMessage = getTranslationMessage(key, translations);
      var msg = translationMessage && translationMessage[locale] ? translationMessage[locale] : null;

      if (!msg) {
        return key;
      }

      var formatter = new IntlMessageFormat(msg, toValidIntlLocale(locale));
      return formatter.format(value);
    };
  },
  number: function number(_, locale) {
    return function (num) {
      var formatter = new IntlPolyfill.NumberFormat(toValidIntlLocale(locale));
      return formatter.format(num);
    };
  },
  currency: function currency(_, locale) {
    return function (num, currencyCode) {
      var formatter = new IntlPolyfill.NumberFormat(toValidIntlLocale(locale), {
        style: 'currency',
        currency: currencyCode
      });
      return formatter.format(num);
    };
  },
  date: function date(_, locale) {
    return function (date) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!isValidDate(date)) {
        throw new Error('Invalid date, please pass only Date objects');
      }

      var formatter = new IntlPolyfill.DateTimeFormat(toValidIntlLocale(locale), options);
      return formatter.format(date);
    };
  },
  formatRelative: function formatRelative(_, locale) {
    return function (date) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!isValidDate(date)) {
        throw new Error('Invalid date, please pass only Date objects');
      }

      var formatter = new IntlRelativeFormat(toValidIntlLocale(locale), options);
      return formatter.format(date);
    };
  }
};

function defaultFuncPropType(props, propName, componentName) {
  if (typeof props[propName] !== 'function') {
    return new Error("Invalid prop `".concat(propName, "` supplied to `").concat(componentName, "`. Validation failed."));
  }

  return null;
}

var props = Object.keys(defaultI18n).reduce(function (acc, curr) {
  /* eslint-disable no-param-reassign */
  acc[curr] = defaultFuncPropType;
  /* eslint-enable no-param-reassign */

  return acc;
}, {});

var getSupportedLocales = function getSupportedLocales() {
  var translations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{
    en_GB: ''
  }];
  return Object.keys(translations[0]).filter(function (x) {
    return x !== 'key';
  });
};

var _getKeyFromTranslation = function getKeyFromTranslation(translation, locale, translations) {
  var values = translations.map(function (t) {
    return t[locale];
  });
  var index = values.indexOf(translation);
  if (index === -1) return null;
  return translations[index].key;
};

function getI18n(translations, locale) {
  var supportedLocale = getSupportedLocales(translations);

  if (!supportedLocale.includes(locale)) {
    throw new Error("Unsupported locale. supported locales are ".concat(supportedLocale.join(', ')));
  }

  return {
    locale: locale,
    supportedLocale: supportedLocale,
    text: defaultI18n.text(translations, locale),
    number: defaultI18n.number(translations, locale),
    date: defaultI18n.date(translations, locale),
    currency: defaultI18n.currency(translations, locale),
    formatRelative: defaultI18n.formatRelative(translations, locale),
    getKeyFromTranslation: function getKeyFromTranslation(translation) {
      return _getKeyFromTranslation(translation, locale, translations);
    },
    setLocale: function setLocale(newLocale) {
      var _this = this;

      if (!supportedLocale.includes(newLocale)) {
        throw new Error("Unsupported locale. supported locales are ".concat(supportedLocale.join(', ')));
      }

      this.locale = newLocale;
      Object.keys(defaultI18n).forEach(function (method) {
        if (typeof _this[method] === 'function') {
          _this[method] = defaultI18n[method](translations, newLocale);
        }
      });
    }
  };
}

module.exports = {
  getI18n: getI18n,
  props: props
};
