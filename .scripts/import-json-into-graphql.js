const en = require('./src/translations/en-GB');
const nl = require('./src/translations/nl-NL');
const de = require('./src/translations/de-DE');
const fr = require('./src/translations/fr-FR');

const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

if (!process.env.ACCESS_TOKEN) throw new Error('ACCESS_TOKEN is required to access GraphQL');

const transportOptions = {
  handleErrors: (errors, data) => {
    const message = errors[0].message;
    const error = new Error(`GraphQL Error: ${message}`);
    error.rawError = errors;
    error.rawData = data;
    throw new Error(error);
  },
  headers: {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
};

const client = new Lokka({
  transport: new Transport('https://dev.sensorfact.nl/api/graph/', transportOptions),
});

const getCreateTranslationQuery = () => `
  (
    $key: String!
    $namespaces: [String!]
    $en_GB: String
    $nl_NL: String
    $fr_FR: String
    $de_DE: String
    $es_ES: String
  ) {
    createTranslation(
      key: $key
      en_GB: $en_GB
      nl_NL: $nl_NL
      fr_FR: $fr_FR
      de_DE: $de_DE
      es_ES: $es_ES
      namespaces: $namespaces
    ) {
      key
    }
  }
`;

const allVars = Object.keys(en)
  .map((translationKey) => {
    return {
      key: translationKey,
      en_GB: en[translationKey],
      nl_NL: nl[translationKey],
      de_DE: de[translationKey],
      fr_FR: fr[translationKey],
      namespaces: ['webclient', 'office'],
    };
  });


const promisses = allVars.map((variables) => {
  client.mutate(getCreateTranslationQuery(), variables);
});

Promise.all(promisses)
  .then((...args) => {
    console.log(args);
  })
  .catch(err => console.log(err));