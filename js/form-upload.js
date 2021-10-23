import {
  closePopup,
  showPopup
} from './utils/popup.js';

import {
  checkHashTagsValidity,
  checkCommentValidation
} from './from-validation.js';

import checkEscapeKeydown from './utils/check-escape-keydown.js';
import addErrorMessage from './utils/add-error-message.js';

const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;
const MIN_SCALE_VALUE = 25;
const DEFAULT_SCALE_VALUE = '100%';

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imagenPreview = document.querySelector('.img-upload__preview img');

const uploadScale = document.querySelector('.img-upload__scale');
const uploadScaleValue = uploadScale.querySelector('.scale__control--value');
const effectButtonsField = document.querySelector('.effects__list');
const hashTagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const scaleOperationWithImagen = (operation) => {
  let currentValue = uploadScaleValue.value.replace(/%/g, '');

  if (operation === 'bigger') {
    currentValue = currentValue >= MAX_SCALE_VALUE ? currentValue : Number(currentValue) + STEP_SCALE_VALUE;
  } else if (operation === 'smaller') {
    currentValue = currentValue <= MIN_SCALE_VALUE ? currentValue : Number(currentValue) - STEP_SCALE_VALUE;
  } else {
    throw Error('Wrong arguments');
  }

  uploadScaleValue.value = `${currentValue}%`;
  imagenPreview.style.transform = `scale(${currentValue/100})`;
};

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

// TODO: Slider
const effectOperationWithImagen = (effect) => {
  imagenPreview.className = '';
  imagenPreview.classList.add(`effects__preview--${effect}`);
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
  //TODO: send data
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
  showPopup(uploadOverlay);
  uploadScaleValue.value = DEFAULT_SCALE_VALUE;

  closeButton.addEventListener('click', closeClickHundler);
  document.addEventListener('keydown', closeKeydownHundler);

  uploadScale.addEventListener('click', scaleClickHundler);
  effectButtonsField.addEventListener('click', addEffectClickHundler);

  form.addEventListener('submit', submitFormHundler);
  submitButton.addEventListener('click', clickSubmitButtonHundler);
});
