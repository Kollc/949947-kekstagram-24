const getRandomNumberInRange = (min, max) => {
  if (min > max) {
    throw Error('Wrong arguments');
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const checkStringLength = (checkString, maxLenght) => checkString.length < maxLenght;

getRandomNumberInRange(4, 6);
checkStringLength('some string', 10);
