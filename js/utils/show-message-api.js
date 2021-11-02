import {
  closePopup
} from './popup.js';

import checkEscapeKeydown from './check-escape-keydown.js';

const bodyElement = document.querySelector('body');
const modalElement = document.querySelector('.img-upload__overlay');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorButtonElement = errorMessageTemplateElement.querySelector('.error__button');
const successButtonElement = successMessageTemplateElement.querySelector('.success__button');


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

  bodyElement.appendChild(container);
};

const closeSuccessMessageClickHundler = () => {
  successMessageTemplateElement.remove();

  resetListeners();
};

const closeErrorMessageClickHundler = () => {
  errorMessageTemplateElement.remove();

  resetListeners();
};

const closeErrorMessageSubstrateClickHundler = (evt) => {
  evt.stopPropagation();

  if (evt.target.classList.contains('error')) {
    errorMessageTemplateElement.remove();
    resetListeners();
  }
};

const closeSuccessMessageSubstrateClickHundler = (evt) => {
  evt.stopPropagation();

  if (evt.target.classList.contains('success')) {
    successMessageTemplateElement.remove();
    resetListeners();
  }
};

const closeSuccessMessageKeydownHundler = (evt) => {
  if (checkEscapeKeydown(evt, successMessageTemplateElement)) {
    closePopup(successMessageTemplateElement);
  }

  resetListeners();
};

const closeErrorMessageKeydownHundler = (evt) => {
  if (checkEscapeKeydown(evt, errorMessageTemplateElement)) {
    closePopup(errorMessageTemplateElement);
  }

  resetListeners();
};

// объявляем функцию по другому, тк нужен hoisting
function resetListeners() {
  successButtonElement.removeEventListener('click', closeSuccessMessageClickHundler);
  successMessageTemplateElement.removeEventListener('click', closeSuccessMessageSubstrateClickHundler);
  document.removeEventListener('keydown', closeSuccessMessageKeydownHundler);

  errorButtonElement.removeEventListener('click', closeErrorMessageClickHundler);
  errorMessageTemplateElement.removeEventListener('click', closeErrorMessageSubstrateClickHundler);
  document.removeEventListener('keydown', closeErrorMessageKeydownHundler);
}

const showErrorMessage = (errorMassege, sendDataError = false) => {
  if (sendDataError) {
    closePopup(modalElement);

    errorButtonElement.addEventListener('click', closeErrorMessageClickHundler);
    errorMessageTemplateElement.addEventListener('click', closeErrorMessageSubstrateClickHundler);
    document.addEventListener('keydown', closeErrorMessageKeydownHundler);
    bodyElement.insertAdjacentElement('beforeend', errorMessageTemplateElement);
  } else {
    createMessageErrorGetData('show-error-message', 'red', errorMassege);
  }
};

const showSuccessMessage = () => {
  closePopup(modalElement);

  successButtonElement.addEventListener('click', closeSuccessMessageClickHundler);
  successMessageTemplateElement.addEventListener('click', closeSuccessMessageSubstrateClickHundler);
  document.addEventListener('keydown', closeSuccessMessageKeydownHundler);
  bodyElement.insertAdjacentElement('beforeend', successMessageTemplateElement);
};

export {
  showErrorMessage,
  showSuccessMessage
};
