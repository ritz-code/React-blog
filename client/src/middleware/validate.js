/* validation middleware for input at login/register pages */
const validateEmail = email => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email,
    )
  ) {
    return (null);
  }
  if (email.trim() === '') {
    return ('Email is required');
  }
  return ('Please enter a valid email');
}

const validatePassword = password => {
  if (password.trim() === '') {
    return ("Password is required");
  }
  if (/[^a-zA-Z 0-9]/.test(password)) {
    return ('Invalid characters');
  }
  if (password.trim().length < 3) {
    return ("Password needs to be at least three characters");
  }
  else return (null);
}

const validateUsername = username => {
  if (username.trim() === '') {
    return ("Name is required");
  }

}

function Validate(e) {
  if (e.target.name === "email") return validateEmail(e.target.value);

  else if (e.target.name === "password") return validatePassword(e.target.value);

  else if (e.target.name === "username") return validateUsername(e.target.value);
}


export default Validate;