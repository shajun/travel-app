// set dotenv for API
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your API key is ${process.env.pixabay_KEY}`);

// dark sky API
const darkSkyURL = 'https://api.darksky.net/forecast/';
const darkSkyKey = 'f06bcfc7a1f70b77c8b9d47323dcef73/';

// pixabay API
const pixabayURL = 'https://pixabay.com/api/';
const pixabayKey = '?key=15288983-2cac2e8ac88dca3deb5bbe65d&q=';
const pixabayType = '&image_type=photo';

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// referencing packages required by the project
const request = require('request');
var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// set express
const app = express();
app.use(cors());
// solving Cross-Domain problems
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// set up static resources
app.use(express.static('dist'));

// GET route
app.get('/', function(req, res) {
  res.sendFile('dist/index.html');
});

app.get('/all', getData);

function getData(req, res) {
  res.send(projectData);
}

app.get('/darksky', (req, res) => {
  request(
    {
      url:
        darkSkyURL +
        darkSkyKey +
        projectData.lat +
        ',' +
        projectData.lng +
        ',' +
        projectData.timeTag
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

app.get('/pixabay', (req, res) => {
  request(
    {
      url: pixabayURL + pixabayKey + projectData.cityName + pixabayType
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

// POST route
app.post('/addData/location', addLocationData);

function addLocationData(req, res) {
  // console.log(request.body)
  let data = req.body;

  // Create new entry for JS Object Endpoint
  projectData.lng = data.lng;
  projectData.lat = data.lat;
  projectData.cityName = data.cityName;
  projectData.countryName = data.countryName;
  projectData.myDate = data.myDate;
  projectData.timeTag = data.timeTag;

  // Send response to Endpoint
  console.log(projectData);
  res.send(projectData);
}

app.post('/addData/weather', addWeatherData);

function addWeatherData(req, res) {
  // console.log(request.body)
  let data = req.body;

  // Create new entry for JS Object Endpoint
  projectData.summary = data.summary;
  projectData.temperatureHigh = data.temperatureHigh;
  projectData.temperatureLow = data.temperatureLow;

  // Send response to Endpoint
  console.log(projectData);
  res.send(projectData);
}

app.post('/addData/img', addImg);

function addImg(req, res) {
  // console.log(request.body)
  let data = req.body;

  // Create new entry for JS Object Endpoint
  projectData.cityImg = data.cityImg;

  // Send response to Endpoint
  console.log(projectData);
  res.send(projectData);
}

app.post('/removeData', removeData);

function removeData(req, res) {
  // console.log(request.body)
  let data = req.body;

  // Create new entry for JS Object Endpoint
  projectData = data;

  // Send response to Endpoint
  console.log(projectData);
  res.send(projectData);
}

// designates what port the app will listen to for incoming requests
// app.listen(8081, function() {
//   console.log('Example app listening on port 8081!');
// });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
