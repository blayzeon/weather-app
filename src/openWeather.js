const weather = {};

function getCoords() {
  function pushPosition(position) {
    weather.lat = position.coords.latitude;
    weather.lon = position.coords.longitude;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pushPosition);
  } else {
    console.log('Geolocation is not supported by this browser');
  }
}

async function pushToWeather(lat = '33.44', lon = '-94.04') {
  // key and api url
  const key = 'c937e56c43bbfbd7edd24a3aa2b5a7a0';
  const oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${key}`;

  // function to push it to an array
  function createWeatherObj(promise) {
    weather.current = promise.current;
    weather.hourly = promise.hourly;
    weather.daily = promise.daily;
  }

  // call the api
  try {
    const response = await fetch(oneCallApi, {
      mode: 'cors',
    });

    const jsonResponse = await response.json();
    return createWeatherObj(jsonResponse);
  } catch (error) {
    return error;
  }
}

export { getCoords, pushToWeather, weather };
