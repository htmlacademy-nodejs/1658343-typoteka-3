"use strict";

const fs = require("fs");
const {
  shuffle,
  getRandomInt,
} = require("../../../../1658343-buy-and-sell-3/src/utils");


const FILE_NAME = 'mocks.json';
const DEFAULT_COUNT = 1;

const TITLES = [
  "Ёлки. История деревьев",
  "Как перестать беспокоиться и начать жить",
  "Как достигнуть успеха не вставая с кресла",
  "Обзор новейшего смартфона",
  "Лучшие рок-музыканты 20-века",
  "Как начать программировать",
  "Учим HTML и CSS",
  "Что такое золотое сечение",
  "Как собрать камни бесконечности",
  "Борьба с прокрастинацией",
  "Рок — это протест",
  "Самый лучший музыкальный альбом этого года",
];

const ANNOUNCES = [
  "Ёлки — это не просто красивое дерево. Это прочная древесина.",
  "Первая большая ёлка была установлена только в 1938 году.",
  "Вы можете достичь всего. Стоит только немного постараться и запастись книгами.",
  "Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.",
  "Золотое сечение — соотношение двух величин, гармоническая пропорция.",
  "Собрать камни бесконечности легко, если вы прирожденный герой.",
  "Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.",
  "Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.",
  "Программировать не настолько сложно, как об этом говорят.",
  "Простые ежедневные упражнения помогут достичь успеха.",
  "Это один из лучших рок-музыкантов.",
  "Он написал больше 30 хитов.",
  "Из под его пера вышло 8 платиновых альбомов.",
  "Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.",
  "Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?",
  "Достичь успеха помогут ежедневные повторения.",
  "Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
  "Как начать действовать? Для начала просто соберитесь.",
  "Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.",
  "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.",
];

const CATEGORIES = [
  "Деревья",
  "За жизнь",
  "Без рамки",
  "Разное",
  "IT",
  "Музыка",
  "Кино",
  "Программирование",
  "Железо",
];

const getFullText = () => {
  let result = [];
  for (let i = 0; i < 6; i++) {
    const announce = shuffle(ANNOUNCES)[getRandomInt(0, ANNOUNCES.length - 1)];
    result.push(announce);
  }

  return result.join(" ");
};

const getCategory = () => {
  const result = [];
  const max = getRandomInt(1, 3);
  for (let i = 0; i < max; i++) {
      const name = shuffle(CATEGORIES)[max];
      if(result.indexOf(name)=== -1) {
        result.push(name);
      }
  }
  return result;
};

const getDate = () => {
  var d = new Date();
  d.setDate(d.getDate() - getRandomInt(0, 3));
  return d.toLocaleString();
};


const generateOffers = (count) => {
    return Array(count)
    .fill({})
    .map(() => ({
      title: shuffle(TITLES)[getRandomInt(0, TITLES.length - 1)],
      announce: shuffle(ANNOUNCES)[getRandomInt(0, ANNOUNCES.length - 1)],
      fullText: getFullText(),
      createdDate: getDate(),
      category: getCategory(),
    }));
}

module.exports = {
  name: "--generate",
  run: (args) => {
    const [count] = args;
    
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer), null, 4);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  },
};
