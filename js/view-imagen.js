import {
  closePopup,
  showPopup
} from './utils/popup.js';

import checkEscapeKeydown from './utils/check-escape-keydown.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

document.querySelector('.social__comment-count').classList.remove('hidden');
document.querySelector('.comments-loader').classList.remove('hidden');

const initialStatesPhoto = () => {
  closePopup(bigPicture);
};


const closeClickHundler = () => {
  initialStatesPhoto();
  resetListeners();
};

const closeKeydownHundler = (evt) => {
  if (checkEscapeKeydown(evt, bigPicture)) {
    closePopup(bigPicture);
  }

  resetListeners();
};

// объявляем функцию по другому, тк нужен hoisting
function resetListeners() {
  closeButton.removeEventListener('click', closeClickHundler);
  document.removeEventListener('keydown', closeKeydownHundler);
}

const setupBigPictureDisplay = (data) => {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  showPopup(bigPicture);

  closeButton.addEventListener('click', closeClickHundler);
  document.addEventListener('keydown', closeKeydownHundler);

  bigPicture.querySelector('.big-picture__img img').src = data.url;
  bigPicture.querySelector('.likes-count').textContent = data.likes;
  bigPicture.querySelector('.comments-count').textContent = data.comments.length;
  bigPicture.querySelector('.social__caption').textContent = data.description;

  const socialCommentsContainer = bigPicture.querySelector('.social__comments');
  const socialComment = socialCommentsContainer.querySelector('.social__comment');

  socialCommentsContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  data.comments.forEach((comment) => {
    const socialCommentTemplate = socialComment.cloneNode(true);
    socialCommentTemplate.querySelector('.social__text').textContent = comment.message;
    const avatar = socialCommentTemplate.querySelector('img');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;

    fragment.appendChild(socialCommentTemplate);
  });

  socialCommentsContainer.appendChild(fragment);
};

export default setupBigPictureDisplay;
