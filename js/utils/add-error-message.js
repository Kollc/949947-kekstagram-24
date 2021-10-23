const addErrorMessage = (element, message) => {
  if (message) {
    element.setCustomValidity(message);
  } else {
    element.setCustomValidity('');
  }

  element.reportValidity();
};

export default addErrorMessage;
