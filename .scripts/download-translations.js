import { writeFileSync } from 'fs';
import currentDutch from '../src/translations/nl-NL';
import currentEnglish from '../src/translations/en-GB';

const Tabletop = require('tabletop');
const yargs = require('yargs');

const fileMap = {
  NL: 'nl-NL',
  EN: 'en-GB',
};

function mergeTranslations(translations) {
  const dutch = Object.assign({}, currentDutch, translations.NL);
  const english = Object.assign({}, currentEnglish, translations.EN);
  const newTranslations = {
    NL: dutch,
    EN: english,
  };

  return newTranslations;
}

function transformTranslations(rawTranslations) {
  const formattedTranslations = rawTranslations.reduce((prev, curr) => {
    Object.keys(curr)
      .filter(key => key !== 'KEY')
      .forEach((key) => {
        prev[key] = Object.assign({}, prev[key]);
        prev[key][curr.KEY] = curr[key];
      });
    return prev;
  }, {});

  const newTranslations = mergeTranslations(formattedTranslations);

  Object.keys(newTranslations).forEach((lang) => {
    const fileContents = `export default ${JSON.stringify(newTranslations[lang], null, 2)};`;
    writeFileSync(`${__dirname}/../src/translations/${fileMap[lang]}.js`, fileContents);
  });
  console.log('All done, thanks for waiting!');
}

function main(args) {
  const key = args.S ? args.S : args.sheetId;
  if (!key) throw Error('Please supply an id to fetch');
  console.log('Starting download of translations, hold on tight');
  Tabletop.init({
    key,
    callback: (data, table) => { transformTranslations(table.sheets('Blad1').all(), table); },
    simpleSheet: true,
  });
}

yargs.usage('$0 <cmd> [args]')
  .option('sheetId', {
    alias: 'S',
    describe: 'Provide an spreadsheet ID.',
  }).command('download', 'Downloads all translations from a given sheet', {}, main)
  .help('help')
  .argv;
