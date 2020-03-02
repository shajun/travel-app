function checkForDate(inputText) {
  // print inputText
  console.log('::: Running checkForDate :::', inputText);

  // define regular expressions
  let reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

  // match the correct date format with a regular expression
  if (!reg.test(inputText)) {
    alert(
      'Correct format: MM/DD/YYYY'
    );
    return false;
  } else {
    console.log('Correct date format');
    return true;
  }
}

export { checkForDate };
