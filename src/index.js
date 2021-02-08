require('@formatjs/intl-numberformat/polyfill');
require('@formatjs/intl-numberformat/locale-data/de');
require('@formatjs/intl-numberformat/locale-data/en-GB');
require('@formatjs/intl-numberformat/locale-data/es');
require('@formatjs/intl-numberformat/locale-data/fr');
require('@formatjs/intl-numberformat/locale-data/it');
require('@formatjs/intl-numberformat/locale-data/nl');
require('@formatjs/intl-numberformat/locale-data/pt');
require('@formatjs/intl-datetimeformat/polyfill');
require('@formatjs/intl-datetimeformat/locale-data/de');
require('@formatjs/intl-datetimeformat/locale-data/en-GB');
require('@formatjs/intl-datetimeformat/locale-data/es');
require('@formatjs/intl-datetimeformat/locale-data/fr');
require('@formatjs/intl-datetimeformat/locale-data/it');
require('@formatjs/intl-datetimeformat/locale-data/nl');
require('@formatjs/intl-datetimeformat/locale-data/pt');
require('@formatjs/intl-datetimeformat/add-all-tz');

const { IntlMessageFormat } = require('intl-messageformat');

function isValidDate(date) {
  return (date instanceof Date);
}

function getTranslationMessage(key, translations) {
  return translations.find(({ key: x }) => x === key);
}

function toValidIntlLocale(locale) {
  return locale.replace('_', '-');
}

const defaultI18n = {
  text: (translations, locale) => (key, value) => {
    const translationMessage = getTranslationMessage(key, translations);
    const msg = (translationMessage && translationMessage[locale])
      ? translationMessage[locale]
      : null;

    if (!msg) {
      return key;
    }
    const formatter = new IntlMessageFormat(msg, toValidIntlLocale(locale));
    return formatter.format(value);
  },
  number: (_, locale) => (num, options = {}) => {
    const formatter = new Intl.NumberFormat(toValidIntlLocale(locale), options);
    return formatter.format(num);
  },
  currency: (_, locale) => (num, currencyCode) => {
    const formatter = new Intl.NumberFormat(toValidIntlLocale(locale), {
      style: 'currency',
      currency: currencyCode,
    });
    return formatter.format(num);
  },
  date: (_, locale) => (date, options = {}) => {
    if (!isValidDate(date)) {
      throw new Error('Invalid date, please pass only Date objects');
    }
    const formatter = new Intl.DateTimeFormat(toValidIntlLocale(locale), options);
    return formatter.format(date);
  },
};

function defaultFuncPropType(props, propName, componentName) {
  if (typeof props[propName] !== 'function') {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`,
    );
  }
  return null;
}

const props = Object.keys(defaultI18n)
  .reduce((acc, curr) => {
    /* eslint-disable no-param-reassign */
    acc[curr] = defaultFuncPropType;
    /* eslint-enable no-param-reassign */
    return acc;
  }, {});

const getSupportedLocales = (translations = [{ en_GB: '' }]) => Object.keys(translations[0]).filter((x) => x !== 'key');

const getKeyFromTranslation = (translation, locale, translations) => {
  const values = translations.map((t) => t[locale]);
  const index = values.indexOf(translation);

  if (index === -1) return null;

  return translations[index].key;
};

function getI18n(translations, locale) {
  const supportedLocale = getSupportedLocales(translations);
  if (!supportedLocale.includes(locale)) {
    throw new Error(`Unsupported locale. supported locales are ${supportedLocale.join(', ')}`);
  }

  return {
    locale,
    supportedLocale,
    text: defaultI18n.text(translations, locale),
    number: defaultI18n.number(translations, locale),
    date: defaultI18n.date(translations, locale),
    currency: defaultI18n.currency(translations, locale),
    getKeyFromTranslation: (translation) => getKeyFromTranslation(
      translation, locale, translations,
    ),
    setLocale(newLocale) {
      if (!supportedLocale.includes(newLocale)) {
        throw new Error(`Unsupported locale. supported locales are ${supportedLocale.join(', ')}`);
      }

      this.locale = newLocale;
      Object.keys(defaultI18n).forEach((method) => {
        if (typeof this[method] === 'function') {
          this[method] = defaultI18n[method](translations, newLocale);
        }
      });
    },
  };
}

module.exports = {
  getI18n,
  props,
};
