# Sensorfact i18n

## Usage

```bash
npm i @sensorfactdev/sf-i18n -S
```

```javascript
import { getI18n } from 'sf-i18n';

const i18n = getI18n('en-GB');
i18n.text('some.id.you.want.to.translate');
i18n.number(10000);
i18n.date(new Date(Date.now()));
i18n.formatRelative(new Date(Date.now()));
```
For more usage info check the unit tests or [MDN docs on Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

## Updating locales

All translated labels can be found inside this [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1qDDH0aTg089GTEevK1hKLDcqNzKugMkH3OzK2uTpIkA/edit#gid=0).
When you need to add a new label, add it in a "logical" place in the list.
The headers of the document should guide in this process.
Labels will be placed in the `KEY` area. The translated label should on placed underneath the locale header.
Like so:

| KEY | EN | NL |
|:---:|:--:|:--:|
| page.context.hypinated-label | Label | Label |

Don't even bother translating for all locale, this will be done by a native speaker we hire. Fill in all label with the English label and turn the row red. This way a translator can see which labels need to be translated.

Once that's done, run:
```
yarn update:translations
```
Which will download the updated translations, commit the changes and bump the version.

If you want more control over the incrementation of the version, just run `yarn download:translations` and take care of committing and bumping the version yourself.

Finally, `git push` the commits and run `npm publish`.
