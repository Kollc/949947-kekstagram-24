const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 1;

const commentValidation = (element) => {
  if (element.value.length > MAX_COMMENT_LENGTH) {
    element.setCustomValidity(`Удалите лишние ${element.value.length - MAX_COMMENT_LENGTH} симв.`);
  } else {
    element.setCustomValidity('');
  }

  element.reportValidity();
};

const hashTagValidity = (element) => {
  const errorMessageArray = Array();

  const arrayHashTags = element.value.split(' ');
  if (arrayHashTags.length > 5) {
    errorMessageArray.push('Количество Хэштегов не должно превышать 5 штук');
  }

  const findDuplicates = arrayHashTags.filter((item, index) => arrayHashTags.indexOf(item.toLowerCase()) !== index);
  if (findDuplicates.length > 0) {
    errorMessageArray.push('Один и тот же хэш-тег не может быть использован дважды');
  }

  arrayHashTags.forEach((item) => {
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

    const errorMessage = errorMessageArray.filter((message, index) => errorMessageArray.indexOf(message) === index).join('\n');

    if (errorMessage.length > 0) {
      element.setCustomValidity(errorMessage);
    } else {
      element.setCustomValidity('');
    }
  });

  element.reportValidity();
};

export {
  hashTagValidity,
  commentValidation
};
