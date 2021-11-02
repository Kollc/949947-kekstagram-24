const returnFormInitialState = () => {
  const hashTagInputElement = document.querySelector('.text__hashtags');
  const commentTextareaElement = document.querySelector('.img-upload__form textarea');
  const originEffectInputElement = document.querySelector('#effect-none');
  const imagePreviewElement = document.querySelector('.img-upload__preview img');
  const effetctlevelInputElement = document.querySelector('.effect-level__value');
  const uploadFileInputElement = document.querySelector('.img-upload__input');

  commentTextareaElement.value = '';
  imagePreviewElement.style = '';
  imagePreviewElement.className = '';
  hashTagInputElement.value = '';
  effetctlevelInputElement.value = '';
  uploadFileInputElement.value = '';

  originEffectInputElement.checked = true;
};

export default returnFormInitialState;
