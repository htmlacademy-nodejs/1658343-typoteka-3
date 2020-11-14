'use strict'

const pack = require('../../../package.json');

module.exports = {
    name: '--version',
    run: (args) => {
        console.log(pack.version);
    },
};