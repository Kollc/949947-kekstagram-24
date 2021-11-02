import returnFormInitialState from './return-form-initial-state.js';

const bodyElement = document.querySelector('body');

const closePopup = (modal) => {
  modal.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  returnFormInitialState(modal);
};

const showPopup = (modal) => {
  modal.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

export {
  showPopup,
  closePopup
};
