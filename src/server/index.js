const app = require("./app");

// designates what port the app will listen to for incoming requests
// app.listen(8081, function() {
//   console.log('Example app listening on port 8081!');
// });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
