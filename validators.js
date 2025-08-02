export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidShortcode(code) {
  return /^[a-zA-Z0-9]{3,15}$/.test(code);
}

export function isValidValidity(mins) {
  return /^\d+$/.test(mins) && Number(mins) > 0;
}
