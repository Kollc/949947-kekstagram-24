import renderImages from './render-images.js';
import getRandomNumberInRange from './utils/get-random-positive-integer.js';
import {
  throttle
} from './utils/throttle.js';

const RERENDER_DELAY = 500;

const fitlerContainerElement = document.querySelector('.img-filters');

const filterDefaultInputElement = document.querySelector('#filter-default');
const filterRandomInputElement = document.querySelector('#filter-random');
const filterDiscussedInputElement = document.querySelector('#filter-discussed');

const addActiveClass = (element) => {
  filterDefaultInputElement.classList.remove('img-filters__button--active');
  filterRandomInputElement.classList.remove('img-filters__button--active');
  filterDiscussedInputElement.classList.remove('img-filters__button--active');

  element.classList.add('img-filters__button--active');
};

const activateFilterRenderImage = (data) => {

  renderImages(data);
  fitlerContainerElement.classList.remove('img-filters--inactive');

  const viewDefaultClickHundler = (evt) => {
    addActiveClass(evt.target);
    renderImages(data);
  };

  const viewRandomClickHundler = (evt) => {
    addActiveClass(evt.target);

    const dataRandom = Array();
    const dataCopy = data.slice();

    for (let i = 0; i < 10; i++) {
      const random = getRandomNumberInRange(0, dataCopy.length - 1);
      dataRandom.push(dataCopy[random]);
      dataCopy.splice(random, 1);
    }

    renderImages(dataRandom);
  };

  const viewDuscussedClickHundler = (evt) => {
    addActiveClass(evt.target);

    const dataSorted = data.slice().sort((itemFirst, itemSecond) => itemSecond.comments.length - itemFirst.comments.length);
    renderImages(dataSorted);
  };

  filterDefaultInputElement.addEventListener('click', throttle(viewDefaultClickHundler, RERENDER_DELAY));
  filterRandomInputElement.addEventListener('click', throttle(viewRandomClickHundler, RERENDER_DELAY));
  filterDiscussedInputElement.addEventListener('click', throttle(viewDuscussedClickHundler, RERENDER_DELAY));
};

export default activateFilterRenderImage;
