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
  const errorMessageArray = Array();

  const allHashTags = elementValue.split(' ');

  if (allHashTags.length > 0) {

    if (allHashTags.length > MAX_HASHTAG_COUNT) {
      errorMessageArray.push('Количество Хэштегов не должно превышать 5 штук');
    }

    const uniqueHashTags = new Set(allHashTags);

    if (uniqueHashTags.size < allHashTags.length) {
      errorMessageArray.push('Один и тот же хэш-тег не может быть использован дважды');
    }

    allHashTags.forEach((item) => {
      if (item.match(/^#/) === null) {
        errorMessageArray.push('Хэштег должен начинаться с #');
      } else if (item.match(/^#[a-zA-Zа-яА-ЯЁё0-9]{1,}$/) === null) {
        errorMessageArray.push('В Хэштеге могут быть использованны только цифры и буквы латиницы и кириллицы');
      }

      if (item.length <= MIN_HASHTAG_LENGTH) {
        errorMessageArray.push('Хэштег не может состоять из одной решетки');
      } else if (item.length > MAX_HASHTAG_LENGTH) {
        errorMessageArray.push('Максимальная длинна хэштега не превышает 20 символов');
      }
    });
  }

  return errorMessageArray.filter((message, index) => errorMessageArray.indexOf(message) === index).join('\n');
};

export {
  checkHashTagsValidity,
  checkCommentValidation
};
