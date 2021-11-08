import {
  closePopup,
  showPopup
} from './utils/popup.js';

import checkEscapeKeydown from './utils/check-escape-keydown.js';

const DEFAULT_COUNT_COMMENTS = 5;
let defaultCountCommentsCurrentPhoto = DEFAULT_COUNT_COMMENTS;

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentCountElement = document.querySelector('.social__comment-count');
const commentLoaderButtonElement = document.querySelector('.comments-loader');
const socialCommentsContainerElement = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = socialCommentsContainerElement.querySelector('.social__comment');
const commentsLoadedElement = document.querySelector('.comments-loaded');

const imagenElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');

commentCountElement.classList.remove('hidden');
commentLoaderButtonElement.classList.remove('hidden');

const loadPhotoComments = ({
  comments,
}, template, incCountComments = false) => {
  const currentCountCommentRequest = incCountComments ? defaultCountCommentsCurrentPhoto += 5 : defaultCountCommentsCurrentPhoto;
  const countElementCurrent = comments.length < currentCountCommentRequest ? comments.length : currentCountCommentRequest;

  commentLoaderButtonElement.classList.remove('hidden');
  socialCommentsContainerElement.innerHTML = '';
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
    commentLoaderButtonElement.classList.add('hidden');
  }

  commentsLoadedElement.textContent = countElementCurrent;
  socialCommentsContainerElement.appendChild(fragment);
};

const addDataBigPicture = ({
  url,
  likes,
  comments,
  description,
}) => {
  imagenElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  socialCaptionElement.textContent = description;
};

const setupBigPictureDisplay = (data) => {
  defaultCountCommentsCurrentPhoto = DEFAULT_COUNT_COMMENTS;
  showPopup(bigPictureElement);

  const commentLoaderClickHandler = () => {
    loadPhotoComments(data, socialCommentElement, true);
  };

  const closeClickHandler = () => {
    closePopup(bigPictureElement);
    resetListeners();
  };

  const closeKeydownHandler = (evt) => {
    if (checkEscapeKeydown(evt, bigPictureElement)) {
      closePopup(bigPictureElement);
    }

    resetListeners();
  };

  // объявляем функцию по другому, тк нужен hoisting
  function resetListeners() {
    closeButtonElement.removeEventListener('click', closeClickHandler);
    document.removeEventListener('keydown', closeKeydownHandler);
    commentLoaderButtonElement.removeEventListener('click', commentLoaderClickHandler);
  }

  commentLoaderButtonElement.addEventListener('click', commentLoaderClickHandler);
  closeButtonElement.addEventListener('click', closeClickHandler);
  document.addEventListener('keydown', closeKeydownHandler);

  addDataBigPicture(data);
  loadPhotoComments(data, socialCommentElement);
};

export default setupBigPictureDisplay;
