"use strict";

const { Cli } = require("./cli");
const chalk = require(`chalk`);

const DEFAULT_COMMAND = "--version";
const USER_ARGV_INDEX = 2;
const ExitCode = {
    success: 0,
    error: 1
}

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

const count = userArguments.slice(1);

if(+count > 1000) { 
    console.error(chalk.red(`Не больше 1000 публикаций`));
    return process.exit(ExitCode.error);
  }

const command = userArguments.length === 0 || !Cli[userCommand] ? DEFAULT_COMMAND : userCommand;

Cli[command].run(count);
