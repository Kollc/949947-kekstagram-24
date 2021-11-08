const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;
const MIN_SCALE_VALUE = 25;

const DEFAULT_START_SLIDER_VALUE = 100;
const DEFAULT_STEP_SLIDER_VALUE = 1;
const DEFAULT_MIN_SLIDER_VALUE = 0;
const DEFAULT_MAX_SLIDER_VALUE = 100;

const EFFECTS_LIST = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    nameStyleFilter: 'grayscale',
    operation: '',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    nameStyleFilter: 'sepia',
    operation: '',
  },
  marvin: {
    min: 1,
    max: 100,
    step: 1,
    nameStyleFilter: 'invert',
    operation: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    nameStyleFilter: 'blur',
    operation: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    nameStyleFilter: 'brightness',
    operation: '',
  },
};

const imagenPreviewElement = document.querySelector('.img-upload__preview img');
const uploadScaleElement = document.querySelector('.img-upload__scale');
const sliderElement = document.querySelector('.effect-level__slider');

const uploadScaleValueElement = uploadScaleElement.querySelector('.scale__control--value');
const uploadEffectLevelValueElement = document.querySelector('.effect-level__value');
const fieldSliderElement = document.querySelector('.effect-level');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_MIN_SLIDER_VALUE,
      max: DEFAULT_MAX_SLIDER_VALUE,
    },
    start: DEFAULT_START_SLIDER_VALUE,
    step: DEFAULT_STEP_SLIDER_VALUE,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const updateSliderEffect = (effectObj) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effectObj.min,
      max: effectObj.max,
    },
    start: effectObj.max,
    step: effectObj.step,
  });

  const sliderConfigUpdateHandler = (values, handle) => {
    imagenPreviewElement.style.filter = `${effectObj.nameStyleFilter}(${values[handle]}${effectObj.operation})`;
    uploadEffectLevelValueElement.value = values[handle];
  };

  sliderElement.noUiSlider.on('update', sliderConfigUpdateHandler);
};


const scaleOperationWithImagen = (operation) => {
  let currentValue = uploadScaleValueElement.value.replace(/%/g, '');

  if (operation === 'bigger') {
    currentValue = currentValue >= MAX_SCALE_VALUE ? currentValue : Number(currentValue) + STEP_SCALE_VALUE;
  } else if (operation === 'smaller') {
    currentValue = currentValue <= MIN_SCALE_VALUE ? currentValue : Number(currentValue) - STEP_SCALE_VALUE;
  } else {
    throw Error('Wrong arguments');
  }

  uploadScaleValueElement.value = `${currentValue}%`;
  imagenPreviewElement.style.transform = `scale(${currentValue/100})`;
};

const effectOperationWithImagen = (effect) => {
  imagenPreviewElement.className = '';
  imagenPreviewElement.classList.add(`effects__preview--${effect}`);

  if (effect !== 'none') {
    if (!sliderElement.noUiSlider) {
      createSlider();
    }

    fieldSliderElement.style.display = 'block';
    updateSliderEffect(EFFECTS_LIST[effect]);
  } else {
    imagenPreviewElement.style = '';
    fieldSliderElement.style.display = 'none';
    sliderElement.noUiSlider.destroy();
  }
};

export {
  scaleOperationWithImagen,
  effectOperationWithImagen
};
