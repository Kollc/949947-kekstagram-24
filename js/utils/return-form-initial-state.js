const returnFormInitialState = (modal) => {
  const hashTagInput = modal.querySelector('.text__hashtags');
  const commentTextarea = modal.querySelector('.img-upload__form textarea');
  const originEffectInput = modal.querySelector('#effect-none');
  const imagePreview = modal.querySelector('.img-upload__preview img');
  const effetctlevelInput = modal.querySelector('.effect-level__value');
  const uploadFileInput = document.querySelector('.img-upload__input');

  commentTextarea.value = '';
  imagePreview.style = '';
  imagePreview.className = '';
  hashTagInput.value = '';
  effetctlevelInput.value = '';
  uploadFileInput.value = '';

  originEffectInput.checked = true;
};

export default returnFormInitialState;
