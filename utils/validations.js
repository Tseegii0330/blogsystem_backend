export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@!?%"^&*]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateObjectId(value) {
  const re = /^[0-9a-fA-F]{24}$/;
  return re.test(value);
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

export function validateNumber(value) {
  if (typeof value === "number" && isFinite(value)) {
    return true;
  } else {
    return false;
  }
}

export function isNil(value) {
  if (value === null || value === undefined) {
    return true;
  } else {
    return false;
  }
}

export function validateDate(value) {
  const date = new Date(value);
  return !isNaN(date.getTime());
}
