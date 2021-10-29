import './render-imagen.js';
import './form-upload.js';
import {
  getData
} from './utils/api.js';
import renderImagen from './render-imagen.js';
import {
  showErrorMessage
} from './utils/show-message-api.js';

getData(renderImagen, showErrorMessage); // загружаем данные
