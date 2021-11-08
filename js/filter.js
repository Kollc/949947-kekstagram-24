import renderImages from './render-images.js';
import getRandomNumberInRange from './utils/get-random-positive-integer.js';
import {
  debounce
} from './utils/debounce.js';

const RERENDER_DELAY = 500;
const COUNT_RANDOM_PHOTO = 10;

const fitlerContainerElement = document.querySelector('.img-filters');
const filterFormElement = document.querySelector('.img-filters__form');
const filterInputElements = filterFormElement.querySelectorAll('.img-filters__button');

const addActiveClass = (element) => {
  filterInputElements.forEach((input) => input.classList.remove('img-filters__button--active'));
  element.classList.add('img-filters__button--active');
};

const activateFilterRenderImage = (data) => {
  renderImages(data);
  fitlerContainerElement.classList.remove('img-filters--inactive');
  const showDefaultPhoto = (element) => {
    addActiveClass(element);
    renderImages(data);
  };

  const showRandomPhoto = (element) => {
    addActiveClass(element);
    const dataRandom = Array();
    const dataCopy = data.slice();
    for (let i = 0; i < COUNT_RANDOM_PHOTO; i++) {
      const random = getRandomNumberInRange(0, dataCopy.length - 1);
      dataRandom.push(dataCopy[random]);
      dataCopy.splice(random, 1);
    }
    renderImages(dataRandom);
  };

  const showDuscussedPhoto = (element) => {
    addActiveClass(element);
    const dataSorted = data.slice().sort((itemFirst, itemSecond) => itemSecond.comments.length - itemFirst.comments.length);
    renderImages(dataSorted);
  };

  const formFilterClickHandler = (evt) => {
    switch (evt.target.id) {
      case 'filter-default':
        showDefaultPhoto(evt.target);
        break;

      case 'filter-random':
        showRandomPhoto(evt.target);
        break;

      case 'filter-discussed':
        showDuscussedPhoto(evt.target);
        break;

      default:
        break;
    }
  };

  filterFormElement.addEventListener('click', debounce(formFilterClickHandler, RERENDER_DELAY));
};

export default activateFilterRenderImage;
