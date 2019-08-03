const validateFields = values => {
  const errors = {};

  if (values.username === "") {
    errors.username = "Not empty";
  }
  if (values.password === "") {
    errors.password = "Required";
  }
  if (values.repeatPassword !== values.password) {
    errors.repeatPassword = "Must be equal password";
  }
  return errors;
};

export default validateFields;
