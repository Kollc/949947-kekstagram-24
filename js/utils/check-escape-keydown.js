const checkEscapeKeydown = (evt, element) => (evt.key === 'Escape' && !element.classList.contains('hidden'));

export default checkEscapeKeydown;
