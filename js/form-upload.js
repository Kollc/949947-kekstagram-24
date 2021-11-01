import {
  closePopup,
  showPopup
} from './utils/popup.js';

import {
  checkHashTagsValidity,
  checkCommentValidation
} from './from-validation.js';

import {
  effectOperationWithImagen,
  scaleOperationWithImagen
} from './image-editing.js';

import {
  sendData
} from './utils/api.js';

import {
  showSuccessMessage,
  showErrorMessage
} from './utils/show-message-api.js';

import checkEscapeKeydown from './utils/check-escape-keydown.js';
import addErrorMessage from './utils/add-error-message.js';
import addLoadedPhotoToPreview from './loaded-preview-photo.js';

const DEFAULT_SCALE_VALUE = '100%';

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');

const uploadScale = document.querySelector('.img-upload__scale');
const uploadScaleValue = uploadScale.querySelector('.scale__control--value');
const effectButtonsField = document.querySelector('.effects__list');
const hashTagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const fieldSliderElement = document.querySelector('.effect-level');

const closeClickHundler = () => {
  closePopup(uploadOverlay);
  uploadInput.value = '';
  resetListeners();
};

const closeKeydownHundler = (evt) => {
  const elementName = evt.target.tagName;

  if (elementName === 'INPUT' || elementName === 'TEXTAREA') {
    evt.stopPropagation();
  } else if (checkEscapeKeydown(evt, uploadInput)) {
    uploadInput.value = '';
    closePopup(uploadOverlay);
    resetListeners();
  }
};

const scaleClickHundler = (evt) => {
  if (evt.target.matches('.scale__control--bigger')) {
    scaleOperationWithImagen('bigger');
  } else if (evt.target.matches('.scale__control--smaller')) {
    scaleOperationWithImagen('smaller');
  }
};

const addEffectClickHundler = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    effectOperationWithImagen(evt.target.value);
  }
};

const clickSubmitButtonHundler = () => {
  addErrorMessage(hashTagInput, checkHashTagsValidity(hashTagInput.value));
  addErrorMessage(commentInput, checkCommentValidation(commentInput.value));
};

const submitFormHundler = (evt) => {
  evt.preventDefault();

  const data = new FormData(evt.target);
  sendData(showSuccessMessage, showErrorMessage, data);
};

// объявляем функцию по другому, тк нужен hoisting
function resetListeners() {
  closeButton.removeEventListener('click', closeClickHundler);
  document.removeEventListener('keydown', closeKeydownHundler);
  uploadScale.removeEventListener('click', scaleClickHundler);
  effectButtonsField.removeEventListener('click', addEffectClickHundler);
  form.removeEventListener('submit', submitFormHundler);
  submitButton.removeEventListener('click', clickSubmitButtonHundler);
}

uploadInput.addEventListener('change', () => {
  addLoadedPhotoToPreview();

  showPopup(uploadOverlay);
  uploadScaleValue.value = DEFAULT_SCALE_VALUE;
  fieldSliderElement.style.display = 'none'; // прячем полоску в которой должен быть слайдер

  closeButton.addEventListener('click', closeClickHundler);
  document.addEventListener('keydown', closeKeydownHundler);

  uploadScale.addEventListener('click', scaleClickHundler);
  effectButtonsField.addEventListener('click', addEffectClickHundler);

  form.addEventListener('submit', submitFormHundler);
  submitButton.addEventListener('click', clickSubmitButtonHundler);
});
