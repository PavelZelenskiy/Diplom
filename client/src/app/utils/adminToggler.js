export function adminToggler(currentUser, positive, negative) {
  if (currentUser.isAdmin === "true") {
    return positive;
  } else {
    return negative;
  }
}
