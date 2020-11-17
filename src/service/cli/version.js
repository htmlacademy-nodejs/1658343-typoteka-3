"use strict";

const pack = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run: () => {
    console.log(pack.version);
  },
};

