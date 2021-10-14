const initialStatesPhoto = (element) => {
  element.classList.add('hidden');
  document.querySelector('.social__comment-count').classList.remove('hidden');
  document.querySelector('.comments-loader').classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const viewImagen = (data) => {
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__cancel').addEventListener('click', () => {
    initialStatesPhoto(bigPicture);
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
      initialStatesPhoto(bigPicture);
    }
  });

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

export default viewImagen;
