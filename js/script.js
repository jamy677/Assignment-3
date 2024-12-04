const weatherApiKey = '8e20a393d1eabed85a9a85cf2722ea59';
const unsplashApiKey = 'K1VC-ki0TULrqLYzj9f_hIeIfo120MBk6YJN5ibAufU'; 

// Elements
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const cityImage = document.getElementById('cityImage');
const cityForm = document.getElementById('cityForm');

// Fetch Weather Data
async function getWeather(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        
        // Check if the city exists
        if (data.cod === "404") {
            weatherInfo.innerHTML = "City not found, please try again!";
            cityImage.innerHTML = "";
            return;
        }

         // Display Weather Info
         const temperature = data.main.temp;
         const description = data.weather[0].description;
         const icon = data.weather[0].icon;
         const weatherHtml = `
             <h3>Weather in ${city}</h3>
             <p><strong>Temperature:</strong> ${temperature}°C</p>
             <p><strong>Description:</strong> ${description}</p>
             <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
         `;
         weatherInfo.innerHTML = weatherHtml;
 
         // Fetch City Image
         getCityImage(city);
     } catch (error) {
         console.error(error);
         weatherInfo.innerHTML = "Error fetching weather data.";
     }
 }
// Fetch City Image from Unsplash
async function getCityImage(city) {
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(unsplashUrl);
        const data = await response.json();
        
        if (data.results.length > 0) {
            const imageUrl = data.results[0].urls.regular;
            cityImage.innerHTML = `<img src="${imageUrl}" alt="Image of ${city}">`;
        } else {
            cityImage.innerHTML = "Image not found.";
        }
    } catch (error) {
        console.error(error);
        cityImage.innerHTML = "Error fetching city image.";
    }
}

// Event Listener for form submission
cityForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        weatherInfo.innerHTML = "Please enter a city.";
        cityImage.innerHTML = "";
    }
});