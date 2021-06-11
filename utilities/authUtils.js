const isValidPassword = (password) => {
  if (password.length >= 8) {
    return true;
  }
  return false;
};

const isValidEmail = (email) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(String(email).toLowerCase());
};

module.exports = {
  isValidEmail,
  isValidPassword,
};
