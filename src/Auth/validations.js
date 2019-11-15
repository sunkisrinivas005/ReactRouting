export const Validation = async(regex, value) => {
  return regex.test(value);
}

export const PasswordCheck = async(pas, pass) => {
  return pas === pass ? true : false
}
