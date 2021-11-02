const addErrorMessage = (element, message) => {
  if (message) {
    element.setCustomValidity(message);
    element.style.border = '3px solid red';
  } else {
    element.setCustomValidity('');
  }

  element.reportValidity();
};

export default addErrorMessage;
