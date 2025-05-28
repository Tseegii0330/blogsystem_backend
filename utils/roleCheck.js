export function isCan(user) {
  if (user.role == "admin") {
    return true;
  } else if (user.role == "editor") {
    return true;
  }
  return false;
}
