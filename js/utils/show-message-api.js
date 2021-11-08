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

const closeSuccessMessageClickHandler = () => {
  successMessageTemplateElement.remove();

  resetListeners();
};

const closeErrorMessageClickHandler = () => {
  errorMessageTemplateElement.remove();

  resetListeners();
};

const closeErrorMessageSubstrateClickHandler = (evt) => {
  evt.stopPropagation();

  if (evt.target.classList.contains('error')) {
    errorMessageTemplateElement.remove();
    resetListeners();
  }
};

const closeSuccessMessageSubstrateClickHandler = (evt) => {
  evt.stopPropagation();

  if (evt.target.classList.contains('success')) {
    successMessageTemplateElement.remove();
    resetListeners();
  }
};

const closeSuccessMessageKeydownHandler = (evt) => {
  if (checkEscapeKeydown(evt, successMessageTemplateElement)) {
    closePopup(successMessageTemplateElement);
  }

  resetListeners();
};

const closeErrorMessageKeydownHandler = (evt) => {
  if (checkEscapeKeydown(evt, errorMessageTemplateElement)) {
    closePopup(errorMessageTemplateElement);
  }

  resetListeners();
};

// объявляем функцию по другому, тк нужен hoisting
function resetListeners() {
  successButtonElement.removeEventListener('click', closeSuccessMessageClickHandler);
  successMessageTemplateElement.removeEventListener('click', closeSuccessMessageSubstrateClickHandler);
  document.removeEventListener('keydown', closeSuccessMessageKeydownHandler);

  errorButtonElement.removeEventListener('click', closeErrorMessageClickHandler);
  errorMessageTemplateElement.removeEventListener('click', closeErrorMessageSubstrateClickHandler);
  document.removeEventListener('keydown', closeErrorMessageKeydownHandler);
}

const showErrorMessage = (errorMassege, sendDataError = false) => {
  if (sendDataError) {
    closePopup(modalElement);

    errorButtonElement.addEventListener('click', closeErrorMessageClickHandler);
    errorMessageTemplateElement.addEventListener('click', closeErrorMessageSubstrateClickHandler);
    document.addEventListener('keydown', closeErrorMessageKeydownHandler);
    bodyElement.insertAdjacentElement('beforeend', errorMessageTemplateElement);
  } else {
    createMessageErrorGetData('show-error-message', 'red', errorMassege);
  }
};

const showSuccessMessage = () => {
  closePopup(modalElement);

  successButtonElement.addEventListener('click', closeSuccessMessageClickHandler);
  successMessageTemplateElement.addEventListener('click', closeSuccessMessageSubstrateClickHandler);
  document.addEventListener('keydown', closeSuccessMessageKeydownHandler);
  bodyElement.insertAdjacentElement('beforeend', successMessageTemplateElement);
};

export {
  showErrorMessage,
  showSuccessMessage
};
