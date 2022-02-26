const weather = {
  // data object that we populate with the functions below.
  data: {
    lat: '0',
    lon: '0',
  },
  // weatherFromPromise is called by createWeatherPromise and should not be called on its own
  weatherFromPromise(promise) {
    weather.data.current = promise.current;
    weather.data.hourly = promise.hourly;
    weather.data.daily = promise.daily;
  },
  /*
    createWeatherPromise does the following:
    1. Grabs the coords from weather.data
    2. Gets data from OpenWeather API
    3. Runs weatherFromPromise to assign data to weather.data

    It should be ran after getCoords in order to provide local weather data
  */
  async createWeatherPromise() {
    const oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.data.lat}&lon=${weather.data.lon}&exclude=minutely,alerts&appid=c937e56c43bbfbd7edd24a3aa2b5a7a0`;

    try {
      const response = await fetch(oneCallApi, {
        mode: 'cors',
      });

      const jsonResponse = await response.json();
      return weather.weatherFromPromise(jsonResponse);
    } catch (error) {
      return error;
    }
  },
  // setCoords is called by getCoords and should not be called on its own
  setCoords(position) {
    weather.data.lat = position.coords.latitude;
    weather.data.lon = position.coords.longitude;

    // after the data has updated, it will grab the weather
    weather.createWeatherPromise();
  },
  // getCoords requests the location data from the user and then modifies data using setCoords
  getCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(weather.setCoords);
    }
  },
};

// exports the weather object for use in index.js
export default weather;
