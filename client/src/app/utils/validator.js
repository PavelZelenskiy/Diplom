export function validator(data, config) {
  const errors = {};
  function validate(validateNethod, data, config) {
    switch (validateNethod) {
      case "isRequired":
        if (data.trim() === "") return config.message;
        break;

      default:
        break;
    }
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
