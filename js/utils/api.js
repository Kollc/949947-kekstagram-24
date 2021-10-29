const URL_GET_DATA = 'https://24.javascript.pages.academy/kekstagram/data';
const URL_SEND_DATA = 'https://24.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(URL_GET_DATA).then((response) => {
    if (!response.ok) {
      onFail('Произошла ошибка при загрузке данных!');
    }

    return response.json();
  }).then((data) => {
    onSuccess(data);
  }).catch(() => {
    onFail('Произошла ошибка при загрузке данных!');
  });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(URL_SEND_DATA, {
    method: 'POST',
    body,
  }).then((response) => {
    if (response.ok) {
      onSuccess('Форма успешно отправлена!');
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз', true);
    }
  }).catch(() => {
    onFail('Не удалось отправить форму. Попробуйте ещё раз', true);
  });
};

export {
  getData,
  sendData
};
