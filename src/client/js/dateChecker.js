function checkForDate(inputText) {
  // print inputText
  console.log('::: Running checkForDate :::', inputText);

  // define regular expressions
  let reg = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

  // match the correct date format with a regular expression
  if (!reg.test(inputText)) {
    alert('Correct format: MM/DD/YYYY');
    return false;
  } else {
    console.log('Correct date format');
    return true;
  }
}

export { checkForDate };
