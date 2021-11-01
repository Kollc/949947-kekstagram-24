import './render-imagen.js';
import './form-upload.js';
import {
  getData
} from './utils/api.js';
import activateFilterRenderImage from './filter.js';
import {
  showErrorMessage
} from './utils/show-message-api.js';

getData(activateFilterRenderImage, showErrorMessage); // загружаем данные
