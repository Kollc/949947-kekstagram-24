
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imagenPreviewElement = document.querySelector('.img-upload__preview img');
const uploadInputElement = document.querySelector('.img-upload__input');

const addLoadedPhotoToPreview = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagenPreviewElement.src = URL.createObjectURL(file);
  }
};


export default addLoadedPhotoToPreview;
