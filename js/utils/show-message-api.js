import {
  closePopup
} from './popup.js';

import checkEscapeKeydown from './check-escape-keydown.js';

const body = document.querySelector('body');
const modal = document.querySelector('.img-upload__overlay');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorButton = errorMessageTemplate.querySelector('.error__button');
const successButton = successMessageTemplate.querySelector('.success__button');


const createMessageErrorGetData = (className, backgroundColor, message) => {
  const container = document.createElement('div');

  container.classList.add(className);
  container.style.width = '100%';
  container.style.height = '50px';
  container.style.backgroundColor = backgroundColor;
  container.style.color = '#fff';
  container.style.position = 'absolute';
  container.style.top = '0';
  container.style.padding = '15px';
  container.style.textAlign = 'center';
  container.style.zIndex = '100';
  container.textContent = message;

  body.appendChild(container);
};

const closeSuccessMessageClickHundler = () => {
  successMessageTemplate.remove();

  resetListeners();
};

const closeErrorMessageClickHundler = () => {
  errorMessageTemplate.remove();

  resetListeners();
};

const closeErrorMessageSubstrateClickHundler = (evt) => {
  evt.stopPropagation();

  if (evt.target.classList.contains('error')) {
    errorMessageTemplate.remove();
    resetListeners();
  }
};

const closeSuccessMessageSubstrateClickHundler = (evt) => {
  evt.stopPropagation();

  if (evt.target.classList.contains('success')) {
    successMessageTemplate.remove();
    resetListeners();
  }
};

const closeSuccessMessageKeydownHundler = (evt) => {
  if (checkEscapeKeydown(evt, successMessageTemplate)) {
    closePopup(successMessageTemplate);
  }

  resetListeners();
};

const closeErrorMessageKeydownHundler = (evt) => {
  if (checkEscapeKeydown(evt, errorMessageTemplate)) {
    closePopup(errorMessageTemplate);
  }

  resetListeners();
};

// объявляем функцию по другому, тк нужен hoisting
function resetListeners() {
  successButton.removeEventListener('click', closeSuccessMessageClickHundler);
  successMessageTemplate.removeEventListener('click', closeSuccessMessageSubstrateClickHundler);
  document.removeEventListener('keydown', closeSuccessMessageKeydownHundler);

  errorButton.removeEventListener('click', closeErrorMessageClickHundler);
  errorMessageTemplate.removeEventListener('click', closeErrorMessageSubstrateClickHundler);
  document.removeEventListener('keydown', closeErrorMessageKeydownHundler);
}

const showErrorMessage = (errorMassege, sendDataError = false) => {
  if (sendDataError) {
    closePopup(modal);

    errorButton.addEventListener('click', closeErrorMessageClickHundler);
    errorMessageTemplate.addEventListener('click', closeErrorMessageSubstrateClickHundler);
    document.addEventListener('keydown', closeErrorMessageKeydownHundler);
    body.insertAdjacentElement('beforeend', errorMessageTemplate);
  } else {
    createMessageErrorGetData('show-error-message', 'red', errorMassege);
  }
};

const showSuccessMessage = () => {
  closePopup(modal);

  successButton.addEventListener('click', closeSuccessMessageClickHundler);
  successMessageTemplate.addEventListener('click', closeSuccessMessageSubstrateClickHundler);
  document.addEventListener('keydown', closeSuccessMessageKeydownHundler);
  body.insertAdjacentElement('beforeend', successMessageTemplate);
};

export {
  showErrorMessage,
  showSuccessMessage
};
