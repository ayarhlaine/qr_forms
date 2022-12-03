const { Deta } = require('deta');

const deta = Deta(process.env.PROJECT_KEY); // configure your Deta project
const forms = deta.Base('forms');
const forms_config = deta.Base('forms-config');

module.exports = {
    forms,
    forms_config,
};