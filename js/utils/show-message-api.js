import {
  closePopup
} from './popup.js';

const createMessageContainer = (className, backgroundColor, message) => {
  const container = document.createElement('div');
  const body = document.querySelector('body');

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

const showErrorMessage = (errorMassege, sendDataError = false) => {
  createMessageContainer('show-error-message', 'red', errorMassege);

  if (sendDataError) {
    setTimeout(() => {
      document.querySelector('.show-error-message').remove();
    }, 2000);
  }
};

const showSuccessMessage = (successMassege) => {
  createMessageContainer('show-success-message', 'green', successMassege, true);

  setTimeout(() => {
    document.querySelector('.show-success-message').remove();
    closePopup(document.querySelector('.img-upload__overlay'));
  }, 2000);
};

export {
  showErrorMessage,
  showSuccessMessage
};
