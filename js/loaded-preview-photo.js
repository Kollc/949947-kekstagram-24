
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imagenPreview = document.querySelector('.img-upload__preview img');
const uploadInput = document.querySelector('.img-upload__input');

const addLoadedPhotoToPreview = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagenPreview.src = URL.createObjectURL(file);
  }
};


export default addLoadedPhotoToPreview;
