"use strict";
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const { shuffle, getRandomInt } = require(`../../utils`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_NAME = `mocks.json`;
const DEFAULT_COUNT = 1;

const getFullText = (announces) => {
  let result = [];
  for (let i = 0; i < 6; i++) {
    const announce = shuffle(announces)[getRandomInt(0, announces.length - 1)];
    result.push(announce);
  }

  return result.join(` `);
};

const getCategory = (categories) => {
  const result = [];
  const max = getRandomInt(1, 3);
  for (let i = 0; i < max; i++) {
    const name = shuffle(categories)[max];
    if (result.indexOf(name) === -1) {
      result.push(name);
    }
  }
  return result;
};

const getDate = () => {
  let d = new Date();
  d.setDate(d.getDate() - getRandomInt(0, 3));
  return d.toLocaleString();
};

const generateOffers = (count, titles, categories, sentences) => {
  return Array(count)
    .fill({})
    .map(() => ({
      title: shuffle(titles)[getRandomInt(0, titles.length - 1)],
      announce: shuffle(sentences)[getRandomInt(0, categories.length - 1)],
      fullText: getFullText(sentences),
      createdDate: getDate(),
      category: getCategory(categories),
    }));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  run: async (count) => {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(
      generateOffers(countOffer, titles, categories, sentences),
      null,
      4
    );

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }

    return;
  },
};
