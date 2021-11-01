import {
  closePopup,
  showPopup
} from './utils/popup.js';

import checkEscapeKeydown from './utils/check-escape-keydown.js';

const DEFAULT_COUNT_COMMENTS = 5;
let defaultCountCommentsCurrentPhoto = DEFAULT_COUNT_COMMENTS;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentCountElement = document.querySelector('.social__comment-count');
const commentLoaderButton = document.querySelector('.comments-loader');
const socialCommentsContainer = bigPicture.querySelector('.social__comments');
const socialComment = socialCommentsContainer.querySelector('.social__comment');
const commentsLoadedElement = document.querySelector('.comments-loaded');

commentCountElement.classList.remove('hidden');
commentLoaderButton.classList.remove('hidden');

const loadPhotoComments = ({
  comments,
}, template, incCountComments = false) => {
  const currentCountCommentRequest = incCountComments ? defaultCountCommentsCurrentPhoto += 5 : defaultCountCommentsCurrentPhoto;
  const countElementCurrent = comments.length < currentCountCommentRequest ? comments.length : currentCountCommentRequest;

  commentLoaderButton.classList.remove('hidden');
  socialCommentsContainer.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < countElementCurrent; i++) {
    const socialCommentTemplate = template.cloneNode(true);
    socialCommentTemplate.querySelector('.social__text').textContent = comments[i].message;
    const avatar = socialCommentTemplate.querySelector('img');
    avatar.src = comments[i].avatar;
    avatar.alt = comments[i].name;
    fragment.appendChild(socialCommentTemplate);
  }

  if (comments.length <= currentCountCommentRequest) {
    commentLoaderButton.classList.add('hidden');
  }

  commentsLoadedElement.textContent = countElementCurrent;
  socialCommentsContainer.appendChild(fragment);
};

const addDataBigPicture = ({
  url,
  likes,
  comments,
  description,
}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const initialStatesPhoto = () => {
  closePopup(bigPicture);
};

const setupBigPictureDisplay = (data) => {
  defaultCountCommentsCurrentPhoto = DEFAULT_COUNT_COMMENTS;
  showPopup(bigPicture);

  const commentLoaderClickHundler = () => {
    loadPhotoComments(data, socialComment, true);
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
    commentLoaderButton.removeEventListener('click', commentLoaderClickHundler);
  }

  commentLoaderButton.addEventListener('click', commentLoaderClickHundler);
  closeButton.addEventListener('click', closeClickHundler);
  document.addEventListener('keydown', closeKeydownHundler);

  addDataBigPicture(data);
  loadPhotoComments(data, socialComment);
};

export default setupBigPictureDisplay;
