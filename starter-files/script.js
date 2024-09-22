const weatherData = [
  { city: "New York", temperature: 16, humidity: 70, windSpeed: 7 },
  { city: "London", temperature: 12, humidity: 80, windSpeed: 5 },
  { city: "Tokyo", temperature: 22, humidity: 60, windSpeed: 4 },
  { city: "Sydney", temperature: 25, humidity: 50, windSpeed: 6 },
  { city: "Paris", temperature: 15, humidity: 65, windSpeed: 5 },
  { city: "Berlin", temperature: 14, humidity: 60, windSpeed: 6 },
  { city: "Moscow", temperature: 5, humidity: 75, windSpeed: 10 },
  { city: "Toronto", temperature: 17, humidity: 55, windSpeed: 8 },
  { city: "Rio de Janeiro", temperature: 26, humidity: 85, windSpeed: 7 },
  { city: "Beijing", temperature: 20, humidity: 40, windSpeed: 3 },
  { city: "Mumbai", temperature: 30, humidity: 70, windSpeed: 5 },
  { city: "Los Angeles", temperature: 19, humidity: 65, windSpeed: 4 },
  { city: "Cape Town", temperature: 18, humidity: 60, windSpeed: 6 },
  { city: "Rome", temperature: 21, humidity: 55, windSpeed: 3 },
  { city: "Bangkok", temperature: 33, humidity: 75, windSpeed: 2 },
  { city: "Istanbul", temperature: 20, humidity: 60, windSpeed: 4 },
  { city: "Lagos", temperature: 29, humidity: 80, windSpeed: 3 },
  { city: "Buenos Aires", temperature: 23, humidity: 70, windSpeed: 5 },
  { city: "Chicago", temperature: 10, humidity: 65, windSpeed: 7 },
  { city: "Shanghai", temperature: 19, humidity: 80, windSpeed: 6 },
];

document.addEventListener("DOMContentLoaded", () => {
  const forecastDisplay = document.createElement("div");
  forecastDisplay.id = "forecastDisplay";
  document.body.appendChild(forecastDisplay);

  displayRecentSearches();
});

function fetchWeather(city) {
  return weatherData.find(
    (data) => data.city.toLowerCase() === city.toLowerCase()
  );
}

function displayCurrentWeather(data) {
  const weatherDisplay = document.getElementById("weatherDisplay");
  weatherDisplay.innerHTML = `
        <h4>${data.city}</h4>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} km/h</p>
    `;
}

function fetchForecast(city) {
  const currentWeather = fetchWeather(city);
  if (currentWeather) {
    const forecast = [];
    for (let i = 1; i <= 5; i++) {
      forecast.push({ day: i, temperature: currentWeather.temperature + i });
    }
    return forecast;
  }
  return [];
}

function displayForecast(forecast) {
  const forecastDisplay = document.getElementById("forecastDisplay");
  forecastDisplay.classList.add("container");
  if (!forecast || forecast.length === 0) {
    forecastDisplay.innerHTML = "<p>No forecast data available.</p>";
    return;
  }

  let forecastHtml = "<h4>5-Day Forecast</h4><ul>";
  forecast.forEach((day) => {
    forecastHtml += `<li>Day ${day.day}: Temperature: ${day.temperature}°C</li>`;
  });
  forecastHtml += "</ul>";

  forecastDisplay.innerHTML = forecastHtml;
}

function searchWeather() {
  const cityNameInput = document.getElementById("cityName").value;
  const weather = fetchWeather(cityNameInput);

  if (weather) {
    displayCurrentWeather(weather);
    const forecast = fetchForecast(cityNameInput);
    displayForecast(forecast);
    saveRecentSearch(cityNameInput);
    displayRecentSearches();
  } else {
    alert("City not found!");
  }
}

// Exercise 03: Save recent searches to local storage

function saveRecentSearch(city) {
  let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
  if (!searches.includes(city)) {
    searches.push(city);
    if (searches.length > 5) {
      searches.shift();
    }
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  }
}

function displayRecentSearches() {
  const recentSearches = document.getElementById("recentSearches");
  recentSearches.innerHTML = "";
  const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];

  searches.forEach((city) => {
    const searchItem = document.createElement("div");
    searchItem.textContent = city;
    searchItem.style.cursor = "pointer";
    searchItem.classList.add("border");
    searchItem.onclick = () => {
      document.getElementById("cityName").value = city;
      searchWeather();
    };
    recentSearches.appendChild(searchItem);
  });
}
