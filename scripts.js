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

document.querySelector('#user-confirm').addEventListener('click', async()=>{
    const input = document.querySelector('#user-zip');
    const weather = await checkWeather(input.value);

    const weatherGui = document.querySelector('#weather-result');
    const bg = document.querySelector('#container');

    const kelvin = weather.main.temp;
    const celsius = kelvin - 273.15;
    const fahrenheit = celsius *9/5 + 32;
    const description = weather.weather[0].description;

    const img = await checkGiphy(description)
    bg.style.backgroundImage = `url('${img.data.images.original.url}')`;

    const button = document.createElement('button');
    button.textContent = `${kelvin.toFixed(0)} degrees Kelvin.`;
    button.addEventListener('click', ()=>{
        if (button.textContent.includes('Kelvin')){
            button.textContent = `${celsius.toFixed(2)} degrees Celcius.`;
        } else if (button.textContent.includes('Celcius')){
            button.textContent = `${fahrenheit.toFixed(0)} degrees Fahrenheit.`;
        } else {
            button.textContent = `${kelvin.toFixed(0)} degrees Kelvin.`;
        }
    }); 

    const weatherP = document.createElement('p');
    weatherP.textContent = `The temperature in ${weather.name} is:`;

    const descriptionP = document.createElement('p');
    descriptionP.textContent = description;

    weatherGui.innerHTML = ``;
    weatherGui.appendChild(weatherP);
    weatherGui.appendChild(button);
    weatherGui.appendChild(descriptionP);
});

async function checkWeather(zip="32641") {
    const key = `c937e56c43bbfbd7edd24a3aa2b5a7a0`;

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}`, {mode: 'cors'});
    const weather = await response.json();
    return weather;        
}

async function checkGiphy(input){
    const key = `2rv4NFa17C0ieCfA4dCO0Hx21P81jn6C`;

    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${input}`, {mode: 'cors'});
    const gifData = await response.json();
    return gifData;
}