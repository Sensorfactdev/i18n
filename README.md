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
