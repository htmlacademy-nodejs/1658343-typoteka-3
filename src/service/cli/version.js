"use strict";

const pack = require(`../../../package.json`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run: () => {
    console.log(chalk.blue(pack.version));
  },
};

