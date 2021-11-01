import setupBigPictureDisplay from './setup-big-picture-display.js';

const renderImagen = (discriptionPhotos) => {
  const templateImages = document.querySelector('#picture').content.querySelector('.picture');
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  const allPicture = container.querySelectorAll('.picture');

  allPicture.forEach((item) => {
    item.remove();
  });

  discriptionPhotos.forEach((image) => {
    const elem = templateImages.cloneNode(true);
    elem.querySelector('img').src = image.url;
    elem.querySelector('.picture__likes').textContent = image.likes;
    elem.querySelector('.picture__comments').textContent = image.comments.length;

    elem.addEventListener('click', () => setupBigPictureDisplay(image));

    fragment.appendChild(elem);
  });

  container.appendChild(fragment);
};

export default renderImagen;
