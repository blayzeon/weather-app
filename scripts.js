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

(function(){
    const key = `c937e56c43bbfbd7edd24a3aa2b5a7a0`;

    // converts coords into weather
    const weather = async function openWeather7Day(coords){
        const result = await fetch(`https://api.openweathermap.org/data/2.5/onecall?${coords}&exclude=minutely,hourly,alerts&appid=${key}`, {
            mode: 'cors'
        });
        const resultData = await result.json();

        return resultData;
    }

    // converts a city, state or a zip code into coordinates
    const coords = async function openWeatherGeocoding(zip, location){
        let fetchMe = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${1}&appid=${key}`;
        if (location === 'none'){
            fetchMe = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${key}`;
        }

        const newCoords = await fetch(fetchMe, {
            mode: 'cors'
        });

        // grab the coords
        const coordsData = await newCoords.json();
        const convertedCoords = `lat=${coordsData.lat}&lon=${coordsData.lon}`;

        // get the weather
        const result = await weather(convertedCoords);
        console.log(result);
        console.log(result.current.weather[0])
    }

    document.querySelector('#user-confirm').addEventListener('click', ()=>{
        // grab's what the user put in the search field
        const userInput = document.querySelector('#user-input').value;
    
        // try to convert it into coords depending on the type of input
        let result = '';
        if (userInput.match(/\d+/g)){
            // provide what we think is a zipcode
            console.log('zip '+userInput);
            result = coords(userInput, 'none');
        } else {
            // provide what we think is a city
            console.log('city '+userInput);
            result = coords('none', userInput);
        }
    
    });
})();