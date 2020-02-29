// Geonames API
let geonamesURL = 'http://api.geonames.org/searchJSON?q=';
let geonamesKey = '&maxRows=10&username=junsha';

// click event listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  // create a new date instance dynamically with JS
  // let d = new Date();
  // let currentDate = d.toDateString();
  // console.log(`currentDate: ${currentDate}`);

  // get city name
  const cityName = document.getElementById('city').value;
  // get my date
  const myDate = document.getElementById('myDate').value;

  let d = new Date(myDate);
  let t = Math.round(d.getTime() / 1000);
  console.log(`timestamp: ${t}`);

  // Get city data from Geonames API
  getCityData(geonamesURL, cityName, geonamesKey).then(function(apiData) {
    console.log('Received city data', apiData);

    const geonames = apiData.geonames;
    // Add data to endpoint
    postData('http://localhost:8081/addData', {
      lng: geonames[0]['lng'],
      lat: geonames[0]['lat'],
      cityName: cityName,
      countryName: geonames[0]['countryName'],
      myDate: myDate,
      timeTag: t
    }).then(function(projectData) {
      getWeatherData('http://localhost:8081/darksky').then(function(apiData) {
        console.log(apiData.daily.data);
        const daily = apiData.daily.data;
        console.log(daily[0].summary);
        postData('http://localhost:8081/addData/weather', {
          summary: daily[0].summary,
          temperatureHigh: daily[0].temperatureHigh,
          temperatureLow: daily[0].temperatureLow
        });
        getImgData('http://localhost:8081/pixabay').then(function(apiData) {
          console.log(apiData['hits'][0].webformatURL);
          const cityImg = apiData['hits'][0].webformatURL;
          postData('http://localhost:8081/addData/img', {
            cityImg: cityImg
          });
          // update UI
          updateUI();
        });
      });
    });
  });
}

// TODO-Async GET
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

// Update UI
const updateUI = async () => {
  const request = await fetch('http://localhost:8081/all');
  try {
    const allData = await request.json();
    console.log('allData for updata UI', allData);

    const view = document.querySelector('.view');
    view.innerHTML = "<img src='" + allData.cityImg + "' >";
    // const newImg = document.createElement('img');
    // newImg.setAttribute('src', allData.cityImg);
    // view.appendChild(newImg);
    
    document.getElementById('weather').innerHTML = allData.summary;
    document.getElementById('temperature').innerHTML =
      'High ' +
      allData.temperatureHigh +
      ', ' +
      'Low ' +
      allData.temperatureLow;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
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
