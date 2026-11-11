//global variables
let temp = 0;
let current_city = "";
let units = 'fahrenheit'

// asyncronously fetch location latitude and longitude from the proxy server running on my machine
const fetchData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/location', {
      params: { q: current_city }
    });

    // Wrap the values inside an object to return
    return {
      lat: response.data[0].lat,
      lon: response.data[0].lon
    };
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
  }
};

// asyncronously fetch location latitude and longitude from the proxy server running on my machine
const fetchWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/weather', {
      params: { lat: lat, lon: lon}
    });

    // Wrap the values inside an object to return
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
  }
};



//input city form, processing and getting result city data from API requests
const form = document.getElementById('city-input-field');
const resetButton = document.getElementById('resetBtn');

resetButton.addEventListener('click', () => {
  form.reset();
  document.getElementById('city').textContent = 'City:';
});

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  console.log('formData')

  const city = formData.get('city')
  current_city = city
  document.getElementById('city').textContent = `City: ${city}`

  //fetch lat and lon from LocationIQ API
  const { lat, lon } = await fetchData();
  //fetch weather data from Open Weather API
  const weatherData = await fetchWeatherData(lat, lon)
  console.log("Coordinates:", lat, lon, weatherData);

  //set temp on page to location's current temperature
  document.getElementById('numeric-temp').textContent = `${Math.round((weatherData.main.temp - 273.15) * (9 / 5) + 32)}°F`;
  //set wind speed to location's wind speed
  document.getElementById('wind_speed_text').textContent = `Wind speed: ${Math.round(weatherData.wind.speed)}`;
  document.getElementById('wind_direction_text').textContent = `Wind direction: ${Math.round(weatherData.wind.deg)} degrees`;
  changeTextColor(Math.round(weatherData.main.temp - 273.15))
});


//increase and decrease temperature
const increaseTemp = document.getElementById("increase_temp");
const decreaseTemp = document.getElementById("decrease_temp");

document.getElementById("numeric-temp").textContent = `${temp}°F`;

increaseTemp.addEventListener("click", () => {
  temp += 1;
  document.getElementById("numeric-temp").textContent = `${temp}°F`;
  changeTextColor(temp);
});

decreaseTemp.addEventListener("click", () => {
  temp -= 1;
  document.getElementById("numeric-temp").textContent = `${temp}°F`;
  changeTextColor(temp);
});

//handle fahrenheit / celsius conversion
const fahrenheitButton = document.getElementById('fahrenheit')
const celsiusButton = document.getElementById('celsius')

fahrenheitButton.addEventListener("click", () => {
  temp = convertTemp(temp, 'celsius');
  document.getElementById('numeric-temp').textContent = `${Math.round(temp)}°F`;
});

celsiusButton.addEventListener("click", () => {
  temp = convertTemp(temp, 'fahrenheit');
  document.getElementById('numeric-temp').textContent = `${Math.round(temp)}°C`;
});

//change color for temperature text
function changeTextColor(temperature) {
  if (temperature >= 80) {
    //document.getElementById("numeric-temp").style.color = "red";
    document.getElementById('numeric-temp').style.backgroundColor = 'red';
    document.getElementById('landscape_text').textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
  } else if (temperature > 69) {
   // document.getElementById("numeric-temp").style.color = "orange";
    document.getElementById('numeric-temp').style.backgroundColor = 'orange';
    document.getElementById('landscape_text').textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
  } else if (temperature > 59) {
   // document.getElementById("numeric-temp").style.color = "yellow";
    document.getElementById('numeric-temp').style.backgroundColor = 'yellow';
    document.getElementById('landscape_text').textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'
  } else if (temperature > 49) {
   // document.getElementById("numeric-temp").style.color = "green";
    document.getElementById('numeric-temp').style.backgroundColor = 'green';
    document.getElementById('landscape_text').textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
  } else {
   // document.getElementById("numeric-temp").style.color = "teal";
    document.getElementById('numeric-temp').style.backgroundColor = 'teal';
    document.getElementById('landscape_text').textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
  } 
}

function convertTemp(currentTemp, units) {
  if (units === 'fahrenheit') {
    // Fahrenheit to Celsius
    return (currentTemp - 32) * 5 / 9;
  } else if (units === 'celsius') {
    // Celsius to Fahrenheit
    return (currentTemp * 9 / 5) + 32;
  }
}

