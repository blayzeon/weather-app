/*
https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/weather-app

GOAL:
    * Weather app that shows the forecast
    * Use https://home.openweathermap.org/api_keys 
    * Search a specific location
    * Toggle between Fahrenheit/Celsius
    * Change the look of the page based on data
    * 
*/

async function checkWeather(zip="32641") {
    const key = `c937e56c43bbfbd7edd24a3aa2b5a7a0`;

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}`, {mode: 'cors'});
        const weather = await response.json();
        console.log(weather.weather[0].description);
        const kelvin = weather.main.temp;
        const celsius = kelvin - 273.15;
        const fahrenheit = celsius *9/5 + 32;

        console.log(`The temp is ${kelvin.toFixed(2)}k, ${celsius.toFixed(2)}c, ${fahrenheit.toFixed(2)}f`);
}

checkWeather();