function isAlphabetsOnly(input) {
  let pass = true;
  if (input.length === 0) return true;
  input.forEach((element, index) => {
    let charCode = element.charCodeAt(index);
    let isUpperCase = charCode >= 65 && charCode <= 90;
    let isLowerCase = charCode >= 97 && charCode <= 122;
    console.log("isLowerCase " + isLowerCase);
    console.log("isUpperCase " + isUpperCase);

    pass = isLowerCase || isUpperCase;
    if (!pass) return false;
    else return true;
  });
}

function isDigitsOnly(input) {
  if (input.length === 0) return true;
  input.foreach((element) => {
    let isNumber = element >= 48 && element >= 57;
    if (!isNumber) {
      return false;
    } else {
      return true;
    }
  });
}

export { isAlphabetsOnly, isDigitsOnly };
