# Sensorfact i18n
[![npm version](https://badge.fury.io/js/%40sensorfactdev%2Fi18n.svg)](https://badge.fury.io/js/%40sensorfactdev%2Fi18n)
[![Build Status](https://travis-ci.org/Sensorfactdev/i18n.svg?branch=master)](https://travis-ci.org/Sensorfactdev/i18n)
[![Coverage Status](https://coveralls.io/repos/github/Sensorfactdev/i18n/badge.svg)](https://coveralls.io/github/Sensorfactdev/i18n)

## Usage

```bash
yarn add @sensorfactdev/sf-i18n
```

```javascript
import { getI18n } from '@sensorfactdev/sf-i18n';

const translations = [
  {
    key: 'some.id.you.want.to.translate',
    en_GB: 'Translated into English',
    nl_NL: 'Vertaald naar Nederlands',
  }
]

const i18n = getI18n(translations, 'en_GB');
i18n.text('some.id.you.want.to.translate');
i18n.number(10000);
i18n.currency(10000, 'EUR');
i18n.date(new Date());
```
For more usage info check the unit tests or [MDN docs on Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
