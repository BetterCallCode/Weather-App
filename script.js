function getWeather() {
  const apiKey = `93f54bb96f59d0ce3c40cc0fb359f34b`;
  const city = document.querySelector(".city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((err) => {
      console.error("Error fetching current weather data", err);
      alert("Error fetching current weather data. Please try again");
    });

  
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((err) => {
      console.error("Error fetching forecast data", err);
      alert("Error fetching forecast data. Please try again");
    });
}

function displayWeather(data) {
  const tempDivInfo = document.querySelector(".temp-div");
  const weatherInfoDiv = document.querySelector(".weather-info");
  const weatherIcon = document.querySelector(".weather-icon");

  tempDivInfo.innerHTML = "";
  weatherInfoDiv.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.querySelector(".hourly-forecast");
  hourlyForecastDiv.innerHTML = "";

  const next24hours = hourlyData.slice(0, 8); 

  next24hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours().toString().padStart(2, '0');
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
      <div class="hourly-item">
        <span class="hour">${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Icon" />
        <span class="temp">${temperature}°C</span>
      </div>
    `;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}


function showImage() {
  const weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.style.display = "block";
}
