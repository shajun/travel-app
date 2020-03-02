// Geonames API
let geonamesURL = 'http://api.geonames.org/searchJSON?q=';
let geonamesKey = '&maxRows=10&username=junsha';

// click event listener
document.getElementById('generate').addEventListener('click', performAction);

document.getElementById('remove').addEventListener('click', removeAction);

function removeAction(e) {
  removeUI();
  postData('http://localhost:8081/removeData', {}).then(function(projectData) {
    console.log('Now, projectData is empty!');
  });
}

// the main function
function performAction(e) {
  // get city name
  const cityName = document.getElementById('city').value;
  // get my date
  const myDate = document.getElementById('myDate').value;

  if (Client.checkForDate(myDate)) {
    // convert to timestemp
    let d = new Date(myDate);
    let t = Math.round(d.getTime() / 1000);
    console.log(`timestamp: ${t}`);

    // get location data from Geonames API
    getCityData(geonamesURL, cityName, geonamesKey).then((apiData) => {
      console.log('Received location data', apiData);
      const geonames = apiData.geonames;

      // add data to endpoint
      // location data
      postData('http://localhost:8081/addData/location', {
        lng: geonames[0]['lng'],
        lat: geonames[0]['lat'],
        cityName: cityName,
        countryName: geonames[0]['countryName'],
        myDate: myDate,
        timeTag: t
      }).then(function(projectData) {
        // weather data summary, high,low
        getWeatherData('http://localhost:8081/darksky').then((apiData) => {
          console.log(apiData.daily.data);
          const daily = apiData.daily.data;
          console.log(daily[0].summary);
          postData('http://localhost:8081/addData/weather', {
            summary: daily[0].summary,
            temperatureHigh: daily[0].temperatureHigh,
            temperatureLow: daily[0].temperatureLow
          });
          // image data
          getImgData('http://localhost:8081/pixabay').then((apiData) => {
            console.log(apiData['hits'][0].webformatURL);
            const cityImg = apiData['hits'][0].webformatURL;
            postData('http://localhost:8081/addData/img', {
              cityImg: cityImg
            }).then(function(projectData) {
              // update UI
              updateUI();
            });
          });
        });
      });
    });
  } else {
    removeUI();
    // error message
    document.getElementById('error-message').innerHTML =
      'Please enter the correct date format: MM/DD/YYYY';
  }
}

// TODO-Async GET
// from http://www.geonames.org/export/web-services.html
const getCityData = async (baseURL, cityName, apiKey) => {
  const request = await fetch(baseURL + cityName + apiKey);
  try {
    // transform into JSON
    const apiData = await request.json();
    console.log('getCityData', apiData);
    return apiData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

// frome https://darksky.net/dev
const getWeatherData = async url => {
  const request = await fetch(url);
  try {
    // transform into JSON
    const apiData = await request.json();
    console.log('getWeatherData', apiData);
    return apiData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

// from https://pixabay.com/api/docs/
const getImgData = async url => {
  const request = await fetch(url);
  try {
    // transform into JSON
    const apiData = await request.json();
    console.log('getImgData', apiData);
    return apiData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

// update UI
const updateUI = async () => {
  // empty error message
  document.getElementById('error-message').innerHTML = '';

  const request = await fetch('http://localhost:8081/all');
  try {
    const allData = await request.json();
    console.log('allData for updata UI', allData);
    // city image
    const view = document.querySelector('.view');
    view.innerHTML = "<img src='" + allData.cityImg + "' >";
    // time day
    let timeday = Client.countdown(allData.myDate);
    // location
    document.getElementById('location').innerHTML =
      'My trip to: ' + allData.cityName + ', ' + allData.countryName;
    // departing
    document.getElementById('departing').innerHTML =
      'Departing: ' + allData.myDate;
    // days away
    document.getElementById('countdown').innerHTML =
      allData.cityName +
      ', ' +
      allData.countryName +
      ' is ' +
      timeday +
      ' days away';
    // hints
    document.getElementById('show').innerHTML = 'Typical weather for then is:';
    // temperature
    document.getElementById('temperature').innerHTML =
      'High ' +
      allData.temperatureHigh +
      ', ' +
      'Low ' +
      allData.temperatureLow;
    // weather
    document.getElementById('weather').innerHTML = allData.summary;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

// remove UI
const removeUI = async () => {
  const view = document.querySelector('.view');
  view.innerHTML = '';
  document.getElementById('location').innerHTML = '';
  document.getElementById('departing').innerHTML = '';
  document.getElementById('countdown').innerHTML = '';
  document.getElementById('show').innerHTML = '';
  document.getElementById('temperature').innerHTML = '';
  document.getElementById('weather').innerHTML = '';
};

// TODO-Async POST
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    console.log('postData', newData);
    return newData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

export { performAction };
