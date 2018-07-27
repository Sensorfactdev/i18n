# Sensorfact i18n

## Usage

```bash
npm i @sensorfactdev/sf-i18n -S
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
i18n.date(new Date());
i18n.formatRelative(new Date(Date.now()));
```
For more usage info check the unit tests or [MDN docs on Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).
