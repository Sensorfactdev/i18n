# Sensorfact i18n

## Usage

```bash
npm i @sensorfactdev/sf-i18n -S
```

```javascript
import { getI18n } from 'sf-i18n';


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
i18n.date(new Date(Date.now()));
i18n.formatRelative(new Date(Date.now()));
```
For more usage info check the unit tests or [MDN docs on Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

## Updating translations

Translations can be editted via [SF-Office](https://office.sensorfact.nl)[[DEV](https://office-dev.sensorfact.nl)].

## Legacy
In the initial version of this module we used Google Spreadsheets to manage the translations.
In the current implementation the translations should be fetched from GraphQL.
Because of this change we have some old translations.
The scripts used for exporting from Google Spreadsheet and importing into GraphQL are saved in the `.scripts` directory.