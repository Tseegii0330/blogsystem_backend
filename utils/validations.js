export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@!?%"^&*]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateString(value, maxLength = 0, minLength = 0) {
  if (typeof value !== "string" && !(value instanceof String)) {
    return false;
  }
  if (
    (maxLength && value.length > maxLength) ||
    (minLength && value.length < minLength)
  ) {
    return false;
  }
  return true;
}

export function isNil(value) {
  if (value === null || value === undefined) {
    return true;
  } else {
    return false;
  }
}
