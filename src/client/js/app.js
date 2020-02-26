function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  // let inputText = document.getElementById('inputText').value;

  // if (Client.checkForURL(inputText)) {
  //   postData('http://localhost:8081/addData', {
  //     formText: inputText
  //   }).then(function(data) {
  //     // update UI
  //     document.getElementById('polarity').innerHTML = data.polarity;
  //     document.getElementById('subjectivity').innerHTML = data.polarity;
  //     document.getElementById('text').innerHTML = Client.cutString(
  //       data.text,
  //       500
  //     );
  //     document.getElementById('polarity_confidence').innerHTML =
  //       data.polarity_confidence;
  //     document.getElementById('subjectivity_confidence').innerHTML =
  //       data.subjectivity_confidence;

  //     // empty error message
  //     document.getElementById('errorMessage').innerHTML = '';
  //   });
  // } else {
  //   // error message
  //   document.getElementById('errorMessage').innerHTML =
  //     'Please enter the correct URL link address';
  // }

  console.log('::: Form Submitted :::');
}

// // TODO-Async POST
// const postData = async (url = '', data = {}) => {
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, DELETE, etc.
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });

//   try {
//     const newData = await response.json();
//     console.log('postData', newData);
//     return newData;
//   } catch (error) {
//     console.log('error', error);
//     // appropriately handle the error
//   }
// };

export { handleSubmit };
