const message = {
  EMPTY_FEILD: 'This Feild is Requied.',
  INVALID_NAME: 'Please enter valid name.',
  INVALID_EMAIL: 'Please enter valid email.',
  INVALID_PASSWORD: 'Please enter valid password.',
};

const nameRegEx = /^[a-zA-Z\s]+$/;
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,6}$/;

const validateName = value => {
  if (!value) {
    return message.EMPTY_FEILD;
  } else if (!nameRegEx.test(value)) {
    return message.INVALID_NAME;
  }
  return null;
};

const validateEmail = value => {
  if (!value) {
    return message.EMPTY_FEILD;
  } else if (!emailRegEx.test(value)) {
    return message.INVALID_EMAIL;
  }
  return null;
};

const validatePassword = value => {
  if (!value) {
    return message.EMPTY_FEILD;
  } else if (!passwordRegEx.test(value)) {
    return message.INVALID_PASSWORD;
  }
  return null;
};

const validate = {
  validateName,
  validateEmail,
  validatePassword,
};

export default validate;
