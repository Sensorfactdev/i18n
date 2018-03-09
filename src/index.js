import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';
import 'intl/locale-data/jsonp/nl';
import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import includes from 'lodash/includes';

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
      /* eslint-disable */
      console.warn(`No translation key found for ${key}. Using provided key instead`);
      /* eslint-disable */
      return key;
    }
    const formatter = new IntlMessageFormat(msg, toValidIntlLocale(locale));
    return formatter.format(value);
  },
  number: (translations, locale) => (num) => {
    const formatter = new IntlPolyfill.NumberFormat(toValidIntlLocale(locale));
    return formatter.format(num);
  },
  currency: (translations, locale) => (num, currencyCode) => {
    const formatter = new IntlPolyfill.NumberFormat(toValidIntlLocale(locale), {
      style: 'currency',
      currency: currencyCode,
    });
    return formatter.format(num);
  },
  date: (translations, locale) => (date, options = {}) => {
    if (!isValidDate(date)) {
      throw new Error('Invalid date, please pass only Date objects');
    }
    const formatter = new IntlPolyfill.DateTimeFormat(toValidIntlLocale(locale), options);
    return formatter.format(date);
  },
  formatRelative: (translations, locale) => (date, options = {}) => {
    if (!isValidDate(date)) {
      throw new Error('Invalid date, please pass only Date objects');
    }
    const formatter = new IntlRelativeFormat(toValidIntlLocale(locale), options);
    return formatter.format(date);
  },
};

function defaultFuncPropType(props, propName, componentName) {
  if (typeof props[propName] !== 'function') {
    return new Error(
      'Invalid prop `' + propName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.'
    );
  }
};

export const props = Object.keys(defaultI18n)
  .reduce((acc, curr) => {
    acc[curr] = defaultFuncPropType;
    return acc;
  }, {});

export function getI18n(translations, locale) {
  const supportedLocale = ['en_GB', 'nl_NL', 'de_DE', 'fr_FR', 'es_ES'];
  if (!includes(supportedLocale, locale)) {
    throw new Error(`Unsupported locale. supported locales are ${supportedLocale.join(', ')}`);
  }

  return {
    locale,
    supportedLocale,
    text: defaultI18n.text(translations, locale),
    number: defaultI18n.number(translations, locale),
    date: defaultI18n.date(translations, locale),
    currency: defaultI18n.currency(translations, locale),
    formatRelative: defaultI18n.formatRelative(translations, locale),
    setLocale(newLocale) {
      if (!includes(supportedLocale, locale)) {
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

export default {
  getI18n,
  props,
};
