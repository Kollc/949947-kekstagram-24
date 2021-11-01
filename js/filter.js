import renderImagen from './render-imagen.js';
import getRandomNumberInRange from './utils/get-random-positive-integer.js';
import {
  throttle
} from './utils/throttle.js';

const RERENDER_DELAY = 500;

const fitlerContainer = document.querySelector('.img-filters');

const filterDefaultInput = document.querySelector('#filter-default');
const filterRandomInput = document.querySelector('#filter-random');
const filterDiscussedInput = document.querySelector('#filter-discussed');

const addActiveClass = (element) => {
  filterDefaultInput.classList.remove('img-filters__button--active');
  filterRandomInput.classList.remove('img-filters__button--active');
  filterDiscussedInput.classList.remove('img-filters__button--active');

  element.classList.add('img-filters__button--active');
};

const activateFilterRenderImage = (data) => {

  renderImagen(data);
  fitlerContainer.classList.remove('img-filters--inactive');

  const viewDefaultClickHundler = (evt) => {
    addActiveClass(evt.target);
    renderImagen(data);
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

    renderImagen(dataRandom);
  };

  const viewDuscussedClickHundler = (evt) => {
    addActiveClass(evt.target);

    const dataSorted = data.slice().sort((itemFirst, itemSecond) => itemSecond.comments.length - itemFirst.comments.length);
    renderImagen(dataSorted);
  };

  filterDefaultInput.addEventListener('click', throttle(viewDefaultClickHundler, RERENDER_DELAY));
  filterRandomInput.addEventListener('click', throttle(viewRandomClickHundler, RERENDER_DELAY));
  filterDiscussedInput.addEventListener('click', throttle(viewDuscussedClickHundler, RERENDER_DELAY));
};

export default activateFilterRenderImage;
