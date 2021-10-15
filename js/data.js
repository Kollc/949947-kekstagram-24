import getRandomNumberInRange from './utils/get-random-positive-integer.js';

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!',
];

const DESCRIPTION = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!',
];

const NAME = ['Дима', 'Даша', 'Миша', 'Анатолий', 'Сергей', 'Виктор', 'Ольга', 'Ирина'];

const COUNT_PHOTO = 25;

const createComments = (...args) => {
  const [, index] = args;
  const idAvatar = getRandomNumberInRange(1, 6);

  return {
    id: index + 1,
    avatar: `img/avatar-${idAvatar}.svg`,
    message: MESSAGE[getRandomNumberInRange(0, MESSAGE.length - 1)],
    name: NAME[getRandomNumberInRange(0, NAME.length - 1)],
  };
};

const createDescriptionPhoto = (...args) => {
  const [, index] = args;

  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTION[getRandomNumberInRange(0, DESCRIPTION.length - 1)],
    likes: getRandomNumberInRange(15, 200),
    comments: Array.from({
      length: getRandomNumberInRange(1, 4),
    }, createComments),
  };
};

const discriptionPhotos = Array.from({
  length: COUNT_PHOTO,
}, createDescriptionPhoto);

export default discriptionPhotos;
