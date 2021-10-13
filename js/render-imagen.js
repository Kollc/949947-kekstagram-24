import discriptionPhotos from './data.js';

const renderImagen = () => {
  const templateImages = document.querySelector('#picture').content.querySelector('.picture');
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  discriptionPhotos.forEach((image) => {
    const elem = templateImages.cloneNode(true);
    elem.querySelector('img').src = image.url;
    elem.querySelector('.picture__likes').textContent = image.likes;
    elem.querySelector('.picture__comments').textContent = image.comments.length;
    fragment.appendChild(elem);
  });

  container.appendChild(fragment);
};

renderImagen();
