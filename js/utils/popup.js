const body = document.querySelector('body');

const closePopup = (modal) => {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');
};

const showPopup = (modal) => {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');
};

export {
  showPopup,
  closePopup
};
