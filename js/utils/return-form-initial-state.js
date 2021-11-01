const returnFormInitialState = () => {
  const hashTagInput = document.querySelector('.text__hashtags');
  const commentTextarea = document.querySelector('.img-upload__form textarea');
  const originEffectInput = document.querySelector('#effect-none');
  const imagePreview = document.querySelector('.img-upload__preview img');
  const effetctlevelInput = document.querySelector('.effect-level__value');
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
