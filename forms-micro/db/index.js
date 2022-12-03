const { Deta } = require('deta');

const deta = Deta('c05ysac3_PaKKNKw6EpYA5ft98ZeWBQfgjYozxknr'); // configure your Deta project
const forms = deta.Base('forms');
const forms_config = deta.Base('forms-config');

module.exports = {
    forms,
    forms_config,
};