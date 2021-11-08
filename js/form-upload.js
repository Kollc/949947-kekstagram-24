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

const closeClickHandler = () => {
  closePopup(uploadOverlayElement);
  uploadInputElement.value = '';
  resetListeners();
};

const closeKeydownHandler = (evt) => {
  const elementName = evt.target.tagName;

  if (elementName === 'INPUT' || elementName === 'TEXTAREA') {
    evt.stopPropagation();
  } else if (checkEscapeKeydown(evt, uploadInputElement)) {
    uploadInputElement.value = '';
    closePopup(uploadOverlayElement);
    resetListeners();
  }
};

const scaleClickHandler = (evt) => {
  if (evt.target.matches('.scale__control--bigger')) {
    scaleOperationWithImagen('bigger');
  } else if (evt.target.matches('.scale__control--smaller')) {
    scaleOperationWithImagen('smaller');
  }
};

const addEffectClickHandler = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    effectOperationWithImagen(evt.target.value);
  }
};

const clickSubmitButtonHandler = () => {
  addErrorMessage(hashTagInputElement, checkHashTagsValidity(hashTagInputElement.value));
  addErrorMessage(commentInputElement, checkCommentValidation(commentInputElement.value));
};

const submitFormHandler = (evt) => {
  evt.preventDefault();

  const data = new FormData(evt.target);
  sendData(showSuccessMessage, showErrorMessage, data);
};

// объявляем функцию по другому, тк нужен hoisting
function resetListeners() {
  closeButtonElement.removeEventListener('click', closeClickHandler);
  document.removeEventListener('keydown', closeKeydownHandler);
  uploadScaleElement.removeEventListener('click', scaleClickHandler);
  effectButtonsFieldElement.removeEventListener('click', addEffectClickHandler);
  formElement.removeEventListener('submit', submitFormHandler);
  submitButtonElement.removeEventListener('click', clickSubmitButtonHandler);
}

uploadInputElement.addEventListener('change', () => {
  addLoadedPhotoToPreview();

  showPopup(uploadOverlayElement);
  uploadScaleValueElement.value = DEFAULT_SCALE_VALUE;
  fieldSliderElementElement.style.display = 'none'; // прячем полоску в которой должен быть слайдер

  closeButtonElement.addEventListener('click', closeClickHandler);
  document.addEventListener('keydown', closeKeydownHandler);

  uploadScaleElement.addEventListener('click', scaleClickHandler);
  effectButtonsFieldElement.addEventListener('click', addEffectClickHandler);

  formElement.addEventListener('submit', submitFormHandler);
  submitButtonElement.addEventListener('click', clickSubmitButtonHandler);
});
