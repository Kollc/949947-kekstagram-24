import returnFormInitialState from './return-form-initial-state.js';

const body = document.querySelector('body');

const closePopup = (modal) => {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');

  returnFormInitialState(modal);
};

const showPopup = (modal) => {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
};

export {
  showPopup,
  closePopup
};
