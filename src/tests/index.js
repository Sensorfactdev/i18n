import { expect } from 'chai';
import { getI18n } from '../index';

const { describe, it } = global;

describe('i18n', () => {
  describe('getI18n', () => {
    it('should throw an error on unknown locale', () => {
      expect(getI18n.bind('pizza')).to.throw(/Unsupported locale./);
    });
    describe('should return the i18n object with locale set', () => {
      it('en-GB', () => {
        const i18n = getI18n('en-GB');
        expect(i18n.locale).to.equal('en-GB');
      });
      it('nl-NL', () => {
        const i18n = getI18n('nl-NL');
        expect(i18n.locale).to.equal('nl-NL');
      });
    });
  });
  describe('setLocale', () => {
    it('should be able to change locale', () => {
      const i18n = getI18n('en-GB');
      i18n.setLocale('nl-NL');
      expect(i18n.locale).to.equal('nl-NL');
    });
    it('should be able to translate with changed locale', () => {
      const i18n = getI18n('en-GB');
      i18n.setLocale('nl-NL');
      expect(i18n.text('branding.app', { app: 'Pizza' })).to.equal('Pizza');
    });
  });
  describe('text', () => {
    describe('should return the correct string for simple translate', () => {
      it('en-GB', () => {
        const i18n = getI18n('en-GB');
        expect(i18n.text('graph.measurements.current')).to.equal('Current measurements');
      });
      it('nl-NL', () => {
        const i18n = getI18n('nl-NL');
        expect(i18n.text('graph.measurements.current')).to.equal('Stroom metingen');
      });
    });
    describe('should return the correct string for formatted translate', () => {
      it('en-GB', () => {
        const i18n = getI18n('en-GB');
        expect(i18n.text('branding.app', { app: 'Pizza' })).to.equal('Pizza');
      });
      it('nl-NL', () => {
        const i18n = getI18n('nl-NL');
        expect(i18n.text('branding.app', { app: 'Pizza' })).to.equal('Pizza');
      });
    });
  });
  describe('number', () => {
    describe('should return the correctly formatted number', () => {
      it('en-GB', () => {
        const i18n = getI18n('en-GB');
        expect(i18n.number(10000)).to.equal('10,000');
      });
      it('nl-NL', () => {
        const i18n = getI18n('nl-NL');
        expect(i18n.number(10000)).to.equal('10.000');
      });
    });
  });
  describe('currency', () => {
    describe('should return the correctly formatted number', () => {
      describe('GBP for locale', () => {
        it('en-GB', () => {
          const i18n = getI18n('en-GB');
          expect(i18n.currency(10000, 'GBP')).to.equal('£10,000');
        });
        it('nl-NL', () => {
          const i18n = getI18n('nl-NL');
          expect(i18n.currency(10000, 'GBP')).to.equal('£ 10.000');
        });
      });
      describe('EUR for locale', () => {
        it('en-GB', () => {
          const i18n = getI18n('en-GB');
          expect(i18n.currency(10000, 'EUR')).to.equal('€10,000');
        });
        it('nl-NL', () => {
          const i18n = getI18n('nl-NL');
          expect(i18n.currency(10000, 'EUR')).to.equal('€ 10.000');
        });
      });
    });
  });
  describe('date', () => {
    it('should throw an error for invalid dates', () => {
      const i18n = getI18n('en-GB');
      expect(i18n.date.bind(Date.now())).to.throw(/Invalid date/);
    });
    describe('should return the correctly formatted date', () => {
      it('en-GB', () => {
        const i18n = getI18n('en-GB');
        const date = new Date(1476875568085);
        expect(i18n.date(date)).to.equal('19/10/2016');
      });
      it('nl-NL', () => {
        const i18n = getI18n('nl-NL');
        const date = new Date(1476875568085);
        expect(i18n.date(date)).to.equal('19-10-2016');
      });
    });
    describe('should return the correctly formatted date from options', () => {
      it('en-GB', () => {
        const i18n = getI18n('en-GB');
        const date = new Date(1476875568085);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        expect(i18n.date(date, options)).to.equal('Wednesday, 19 October 2016');
      });
      it('nl-NL', () => {
        const i18n = getI18n('nl-NL');
        const date = new Date(1476875568085);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        expect(i18n.date(date, options)).to.equal('woensdag 19 oktober 2016');
      });
    });
  });
  describe('formatRelative', () => {
    describe('should return the relatively formatted date', () => {
      it('en-GB', () => {
        const i18n = getI18n('en-GB');
        const date = new Date(Date.now());
        expect(i18n.formatRelative(date)).to.equal('now');
      });
      it('nl-NL', () => {
        const i18n = getI18n('nl-NL');
        const date = new Date(Date.now());
        expect(i18n.formatRelative(date)).to.equal('nu');
      });
    });
    describe('should return the relatively formatted date from options', () => {
      it('en-GB', () => {
        const i18n = getI18n('en-GB');
        const date = new Date(Date.now());
        const options = { style: 'numeric' };
        expect(i18n.formatRelative(date, options)).to.equal('in 0 seconds');
      });
      it('nl-NL', () => {
        const i18n = getI18n('nl-NL');
        const date = new Date(Date.now());
        const options = { style: 'numeric' };
        expect(i18n.formatRelative(date, options)).to.equal('over 0 seconden');
      });
    });
  });
});
