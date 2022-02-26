import weather from './openWeather';
import createDom from './dom';

/*
    weather has the following features:
    * weather.data stores all of the weather and location data needed for the DOM
    * weather.getCoords will request the user's coordinates using Geolocation API
    * Once it has obtained the coordinance, it will generate a Promise
    * From the promise, it will store the data in weather.data
*/

// date info
const date = new Date();
const today = date.getDay();
const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

// dom container
const container = document.querySelector('#container');

// populate the dom with a default UI (for when no coords are provided)
createDom.default(container);
const coordsButton = document.querySelector('#geo-button');

// function to check if the coords have been provided/updated
function checkData() {
  let tempLetter = 'C';
  const timer = setTimeout(checkData, 3000);
  if (weather.data.lat !== '0') {
    // Once it has been updated, we can update the DOM
    clearTimeout(timer);
    createDom.clearNodesFrom(container);

    // create the temperature control button
    const controller = document.createElement('button');
    controller.setAttribute('id', 'controller');
    controller.innerHTML = `Toggle Temp °<span dataletter>${tempLetter}</span>`;
    container.appendChild(controller);

    // create a container for the weather cards
    const week = document.createElement('div');
    week.setAttribute('id', 'deck');
    container.appendChild(week);

    // create the daily weather
    let nextDay = today + 1;
    for (let i = 0; i <= days.length - 1; i += 1) {
      if (nextDay >= days.length) {
        nextDay = 0;
      }

      if (i === 0) {
        // use current for the first day
        createDom.createCard(week, `https://openweathermap.org/img/wn/${weather.data.current.weather[0].icon}.png`, weather.data.current.weather[0].description, `Today:<br><span dataTemp>${(weather.data.current.temp - 273.15).toFixed(0)}</span>°<span dataletter>${tempLetter}</span>`);
      } else {
        createDom.createCard(week, `https://openweathermap.org/img/wn/${weather.data.daily[i].weather[0].icon}.png`, weather.data.daily[i].weather[0].description, `${days[nextDay]}:<br><span datatemp>${(weather.data.daily[i].temp.min - 273.15).toFixed(0)}</span> to <span datatemp>${(weather.data.daily[i].temp.max - 273.15).toFixed(0)}</span>°<span dataletter>${tempLetter}</span>`);
        nextDay += 1;
      }
    }

    // button event listener
    controller.addEventListener('click', () => {
      // grab all the temperature letters (k/c/f) and temperatures
      const letters = document.querySelectorAll('[dataletter]');
      const temps = document.querySelectorAll('[datatemp]');

      // for each temperature, convert the temperature
      temps.forEach((temp) => {
        const tempNode = temp;
        const currentTemp = parseInt(tempNode.innerText, 10);
        if (tempLetter === 'C') {
          // convert C to F
          tempNode.innerText = (currentTemp * (9 / 5) + 32).toFixed(0);
        } else {
          // convert F to C
          tempNode.innerText = ((currentTemp - 32) * (5 / 9)).toFixed(0);
        }
      });

      // swap the temp letter
      if (tempLetter === 'C') {
        tempLetter = 'F';
      } else {
        tempLetter = 'C';
      }
      letters.forEach((letter) => {
        const letterNode = letter;
        letterNode.innerText = tempLetter;
      });
    });
  }
}

// event listener for the button to request coords & check when provided
coordsButton.addEventListener('click', () => {
  // asks for the user's location in order to get coordinance
  weather.getCoords();

  // checks if the data has loaded every 1 second
  checkData();
});
