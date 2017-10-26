import { getI18n } from '../index';

const mockTranslations = [
  {
    key: 'this.is.a.test.key.key',
    en_GB: 'Testing a key',
    nl_NL: null,
    de_DE: null,
    fr_FR: null,
    es_ES: null,
  },
  {
    key: 'this.is.a.test.key.key.key',
    en_GB: 'Testing a key',
    nl_NL: null,
    de_DE: null,
    fr_FR: null,
    es_ES: null,
  },
  {
    key: 'this.is.a.a.test.key.key.key',
    en_GB: 'Testing a key ',
    nl_NL: null,
    de_DE: null,
    fr_FR: null,
    es_ES: null,
  },
  {
    key: 'branding.app',
    en_GB: '{app}',
    nl_NL: '{app}',
    de_DE: null,
    fr_FR: null,
    es_ES: null,
  },
  {
    key: 'graph.measurements.current',
    en_GB: 'Power',
    nl_NL: 'Vermogen',
    de_DE: null,
    fr_FR: null,
    es_ES: null,
  },
];


describe('i18n', () => {
  describe('getI18n', () => {
    it('should throw an error on unknown locale', () => {
      expect(getI18n.bind('pizza')).toThrow(/Unsupported locale./);
    });
    describe('should return the i18n object with locale set', () => {
      it('en_GB', () => {
        const i18n = getI18n(mockTranslations, 'en_GB');
        expect(i18n.locale).toEqual('en_GB');
      });
      it('nl_NL', () => {
        const i18n = getI18n(mockTranslations, 'nl_NL');
        expect(i18n.locale).toEqual('nl_NL');
      });
    });
  });
  describe('setLocale', () => {
    it('should be able to change locale', () => {
      const i18n = getI18n(mockTranslations, 'en_GB');
      i18n.setLocale('nl_NL');
      expect(i18n.locale).toEqual('nl_NL');
    });
    it('should be able to translate with changed locale', () => {
      const i18n = getI18n(mockTranslations, 'en_GB');
      i18n.setLocale('nl_NL');
      expect(i18n.text('branding.app', { app: 'Pizza' })).toEqual('Pizza');
    });
  });
  describe('text', () => {
    describe('should return the correct string for simple translate', () => {
      it('en_GB', () => {
        const i18n = getI18n(mockTranslations, 'en_GB');
        expect(i18n.text('graph.measurements.current')).toEqual('Power');
      });
      it('nl_NL', () => {
        const i18n = getI18n(mockTranslations, 'nl_NL');
        expect(i18n.text('graph.measurements.current')).toEqual('Vermogen');
      });
    });
    describe('should return the key when no translation has being found', () => {
      it('en_GB', () => {
        const i18n = getI18n(mockTranslations, 'en_GB');
        expect(i18n.text('pizza.pizza.pizza')).toEqual('pizza.pizza.pizza');
      });
      it('nl_NL', () => {
        const i18n = getI18n(mockTranslations, 'nl_NL');
        expect(i18n.text('pizza.pizza.pizza')).toEqual('pizza.pizza.pizza');
      });
    });
    describe('should return the correct string for formatted translate', () => {
      it('en_GB', () => {
        const i18n = getI18n(mockTranslations, 'en_GB');
        expect(i18n.text('branding.app', { app: 'Pizza' })).toEqual('Pizza');
      });
      it('nl_NL', () => {
        const i18n = getI18n(mockTranslations, 'nl_NL');
        expect(i18n.text('branding.app', { app: 'Pizza' })).toEqual('Pizza');
      });
    });
  });
  describe('number', () => {
    describe('should return the correctly formatted number', () => {
      it('en_GB', () => {
        const i18n = getI18n(mockTranslations, 'en_GB');
        expect(i18n.number(10000)).toEqual('10,000');
      });
      it('nl_NL', () => {
        const i18n = getI18n(mockTranslations, 'nl_NL');
        expect(i18n.number(10000)).toEqual('10.000');
      });
    });
  });
  describe('currency', () => {
    describe('should return the correctly formatted number', () => {
      describe('for small numbers', () => {
        it('nl_NL', () => {
          const i18n = getI18n(mockTranslations, 'nl_NL');
          expect(i18n.currency(0.064, 'EUR')).toEqual('€ 0,06');
        });
      });
      describe('GBP for locale', () => {
        it('en_GB', () => {
          const i18n = getI18n(mockTranslations, 'en_GB');
          expect(i18n.currency(10000, 'GBP')).toEqual('£10,000.00');
        });
        it('nl_NL', () => {
          const i18n = getI18n(mockTranslations, 'nl_NL');
          expect(i18n.currency(10000, 'GBP')).toEqual('£ 10.000,00');
        });
      });
      describe('EUR for locale', () => {
        it('en_GB', () => {
          const i18n = getI18n(mockTranslations, 'en_GB');
          expect(i18n.currency(10000, 'EUR')).toEqual('€10,000.00');
        });
        it('nl_NL', () => {
          const i18n = getI18n(mockTranslations, 'nl_NL');
          expect(i18n.currency(10000, 'EUR')).toEqual('€ 10.000,00');
        });
      });
    });
  });
  describe('date', () => {
    it('should throw an error for invalid dates', () => {
      const i18n = getI18n(mockTranslations, 'en_GB');
      expect(i18n.date.bind(Date.now())).toThrow(/Invalid date/);
    });
    describe('should return the correctly formatted date', () => {
      it('en_GB', () => {
        const i18n = getI18n(mockTranslations, 'en_GB');
        const date = new Date(1476875568085);
        expect(i18n.date(date)).toEqual('19/10/2016');
      });
      it('nl_NL', () => {
        const i18n = getI18n(mockTranslations, 'nl_NL');
        const date = new Date(1476875568085);
        expect(i18n.date(date)).toEqual('19-10-2016');
      });
    });
    describe('should return the correctly formatted date from options', () => {
      it('en_GB', () => {
        const i18n = getI18n(mockTranslations, 'en_GB');
        const date = new Date(1476875568085);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        expect(i18n.date(date, options)).toEqual('Wednesday, 19 October 2016');
      });
      it('nl_NL', () => {
        const i18n = getI18n(mockTranslations, 'nl_NL');
        const date = new Date(1476875568085);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        expect(i18n.date(date, options)).toEqual('woensdag 19 oktober 2016');
      });
    });
  });
  describe('formatRelative', () => {
    describe('should return the relatively formatted date', () => {
      it('en_GB', () => {
        const i18n = getI18n(mockTranslations, 'en_GB');
        const date = new Date(Date.now());
        expect(i18n.formatRelative(date)).toEqual('now');
      });
      it('nl_NL', () => {
        const i18n = getI18n(mockTranslations, 'nl_NL');
        const date = new Date(Date.now());
        expect(i18n.formatRelative(date)).toEqual('nu');
      });
    });
    describe('should return the relatively formatted date from options', () => {
      it('en_GB', () => {
        const i18n = getI18n(mockTranslations, 'en_GB');
        const date = new Date(Date.now());
        const options = { style: 'numeric' };
        expect(i18n.formatRelative(date, options)).toEqual('in 0 seconds');
      });
      it('nl_NL', () => {
        const i18n = getI18n(mockTranslations, 'nl_NL');
        const date = new Date(Date.now());
        const options = { style: 'numeric' };
        expect(i18n.formatRelative(date, options)).toEqual('over 0 seconden');
      });
    });
  });
});
