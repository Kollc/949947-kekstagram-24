import setupBigPictureDisplay from './setup-big-picture-display.js';

const renderImages = (discriptionPhotos) => {
  const templateImagesElement = document.querySelector('#picture').content.querySelector('.picture');
  const containerPicturesElement = document.querySelector('.pictures');
  const fragmentElement = document.createDocumentFragment();

  const allPictureElements = containerPicturesElement.querySelectorAll('.picture');

  allPictureElements.forEach((item) => {
    item.remove();
  });

  discriptionPhotos.forEach((image) => {
    const elem = templateImagesElement.cloneNode(true);
    elem.querySelector('img').src = image.url;
    elem.querySelector('.picture__likes').textContent = image.likes;
    elem.querySelector('.picture__comments').textContent = image.comments.length;

    elem.addEventListener('click', () => setupBigPictureDisplay(image));

    fragmentElement.appendChild(elem);
  });

  containerPicturesElement.appendChild(fragmentElement);
};

export default renderImages;
