function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentFullYear = now.getFullYear();
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let partDay = "am";
  if (currentHour >= 12) {
    partDay = "pm";
  }

  let todayDay = document.querySelector("#todayDay");
  todayDay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} ${currentFullYear}, ${currentHour}:${currentMinute} ${partDay}`;
}

let date = new Date();
formatDate(date);

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);

  tempElement = document.querySelector("#real");
  tempElement.innerHTML = Math.round(fahrenheitTemp);

  let forecastTemp = document.querySelectorAll("#MinMax");
  forecastTemp.forEach(function (item) {
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Celsius
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });
}
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);

  tempElement = document.querySelector("#real");
  tempElement.innerHTML = Math.round(celsiusTemperature);

  let forecastTemp = document.querySelectorAll("#MinMax");
  forecastTemp.forEach(function (item) {
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;
    // convert to Celsius
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function searchLocation(position) {
  let apiKey = "f6b05703004145fac5fd3f7a96bd1a10";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#real").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#icon").setAttribute(
    "src",
    //`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    `Icon/${response.data.weather[0].icon}.png`
  );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentHour}:${currentMinute}`;
}

function forecastDay(timestamp) {
  let dayForecast = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayForecast.getDay()];

  return `${day}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;
  console.log(response.data.list);

  for (let index = 4; index < 40; index += 8) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
            <div class="col">
            <div class= "forHour">${forecastDay(forecast.dt * 1000)}</div>
            <img src=${`Icon/${forecast.weather[0].icon}.png`} class="Sunn" />
             <div class="MinMax"><span id="MinMax">${Math.round(
               forecast.main.temp
             )}</span>º</div>
             </div>
             `;
  }
}
function searchCity(city) {
  let apiKey = "f6b05703004145fac5fd3f7a96bd1a10";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

https: function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let formHeader = document.querySelector("#formHeader");
formHeader.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btnCurrentlocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;
let fahrenheitTemperature = null;

searchCity("Lisbon");
