const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 1;
const MAX_HASHTAG_COUNT = 5;

const checkCommentValidation = (elementValue) => {
  let errorMessage = '';

  if (elementValue.length > MAX_COMMENT_LENGTH) {
    errorMessage += `Удалите лишние ${elementValue.length - MAX_COMMENT_LENGTH} симв.`;
  }

  return errorMessage;
};

const checkHashTagsValidity = (elementValue) => {
  const errorMessages = Array();
  const allHashTags = elementValue.trim().toLowerCase().split(' ');

  if (allHashTags.length > 0 && elementValue) {

    if (allHashTags.length > MAX_HASHTAG_COUNT) {
      errorMessages.push('Количество Хэштегов не должно превышать 5 штук');
    }

    const uniqueHashTags = new Set(allHashTags);

    if (uniqueHashTags.size < allHashTags.length) {
      errorMessages.push('Один и тот же хэш-тег не может быть использован дважды');
    }

    allHashTags.forEach((item) => {
      if (item.match(/^#/) === null) {
        errorMessages.push('Хэштег должен начинаться с #');
      } else if (item.match(/^#[a-zA-Zа-яА-ЯЁё0-9]{1,}$/) === null) {
        errorMessages.push('В Хэштеге могут быть использованны только цифры и буквы латиницы и кириллицы');
      }

      if (item.length <= MIN_HASHTAG_LENGTH) {
        errorMessages.push('Хэштег не может состоять из одной решетки');
      } else if (item.length > MAX_HASHTAG_LENGTH) {
        errorMessages.push('Максимальная длинна хэштега не превышает 20 символов');
      }
    });
  }

  return errorMessages.filter((message, index) => errorMessages.indexOf(message) === index).join('\n');
};

export {
  checkHashTagsValidity,
  checkCommentValidation
};
