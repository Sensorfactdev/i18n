import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';
import 'intl/locale-data/jsonp/nl';
import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import includes from 'lodash/includes';
import enGB from './translations/en-GB';
import nlNL from './translations/nl-NL';
import deDE from './translations/de-DE';
import frFR from './translations/fr-FR';
import ru from './translations/ru';

const messageMap = {
  'en-GB': enGB,
  'nl-NL': nlNL,
  'de-DE': deDE,
  'fr-FR': frFR,
  ru,
};

function isValidDate(date) {
  return (date instanceof Date);
}

const defaultI18n = {
  text: locale => (key, value) => {
    const msg = messageMap[locale][key];
    if (!msg) {
      /* eslint-disable */
      console.warn(`No translation key found for ${key}. Using provided key instead`);
      /* eslint-disable */
      return key;
    }
    const formatter = new IntlMessageFormat(msg, locale);
    return formatter.format(value);
  },
  number: locale => (num) => {
    const formatter = new IntlPolyfill.NumberFormat(locale);
    return formatter.format(num);
  },
  currency: locale => (num, currencyCode) => {
    const formatter = new IntlPolyfill.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    });
    return formatter.format(num);
  },
  date: locale => (date, options = {}) => {
    if (!isValidDate(date)) {
      throw new Error('Invalid date, please pass only Date objects');
    }
    const formatter = new IntlPolyfill.DateTimeFormat(locale, options);
    return formatter.format(date);
  },
  formatRelative: locale => (date, options = {}) => {
    if (!isValidDate(date)) {
      throw new Error('Invalid date, please pass only Date objects');
    }
    const formatter = new IntlRelativeFormat(locale, options);
    return formatter.format(date);
  },
};

export function getI18n(locale) {
  const supportedLocales = Object.keys(messageMap);
  if (!includes(supportedLocales, locale)) {
    throw new Error(`Unsupported locale. supported locales are ${supportedLocales.join(', ')}`);
  }
  return {
    locale,
    text: defaultI18n.text(locale),
    number: defaultI18n.number(locale),
    date: defaultI18n.date(locale),
    currency: defaultI18n.currency(locale),
    formatRelative: defaultI18n.formatRelative(locale),
    setLocale(newLocale) {
      this.locale = newLocale;
      Object.keys(defaultI18n).forEach((key) => {
        if (typeof this[key] === 'function') {
          this[key] = defaultI18n[key](newLocale);
        }
      });
    },
  };
}

export default {
  getI18n,
};
