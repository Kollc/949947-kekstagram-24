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

const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = document.querySelector('.img-upload__input');
const closeButtonElement = document.querySelector('.img-upload__cancel');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');

const uploadScaleElement = document.querySelector('.img-upload__scale');
const uploadScaleValueElement = uploadScaleElement.querySelector('.scale__control--value');
const effectButtonsFieldElement = document.querySelector('.effects__list');
const hashTagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('.img-upload__submit');
const fieldSliderElementElement = document.querySelector('.effect-level');

const closeClickHundler = () => {
  closePopup(uploadOverlayElement);
  uploadInputElement.value = '';
  resetListeners();
};

const closeKeydownHundler = (evt) => {
  const elementName = evt.target.tagName;

  if (elementName === 'INPUT' || elementName === 'TEXTAREA') {
    evt.stopPropagation();
  } else if (checkEscapeKeydown(evt, uploadInputElement)) {
    uploadInputElement.value = '';
    closePopup(uploadOverlayElement);
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
  addErrorMessage(hashTagInputElement, checkHashTagsValidity(hashTagInputElement.value));
  addErrorMessage(commentInputElement, checkCommentValidation(commentInputElement.value));
};

const submitFormHundler = (evt) => {
  evt.preventDefault();

  const data = new FormData(evt.target);
  sendData(showSuccessMessage, showErrorMessage, data);
};

// объявляем функцию по другому, тк нужен hoisting
function resetListeners() {
  closeButtonElement.removeEventListener('click', closeClickHundler);
  document.removeEventListener('keydown', closeKeydownHundler);
  uploadScaleElement.removeEventListener('click', scaleClickHundler);
  effectButtonsFieldElement.removeEventListener('click', addEffectClickHundler);
  formElement.removeEventListener('submit', submitFormHundler);
  submitButtonElement.removeEventListener('click', clickSubmitButtonHundler);
}

uploadInputElement.addEventListener('change', () => {
  addLoadedPhotoToPreview();

  showPopup(uploadOverlayElement);
  uploadScaleValueElement.value = DEFAULT_SCALE_VALUE;
  fieldSliderElementElement.style.display = 'none'; // прячем полоску в которой должен быть слайдер

  closeButtonElement.addEventListener('click', closeClickHundler);
  document.addEventListener('keydown', closeKeydownHundler);

  uploadScaleElement.addEventListener('click', scaleClickHundler);
  effectButtonsFieldElement.addEventListener('click', addEffectClickHundler);

  formElement.addEventListener('submit', submitFormHundler);
  submitButtonElement.addEventListener('click', clickSubmitButtonHundler);
});
