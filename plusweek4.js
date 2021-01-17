let now = new Date();

function formatDate() {
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
    hours = `0{currenthour}`;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    hours = `0{currentminute}`;
  }

  let todayDay = document.querySelector("#todayDay");
  todayDay.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} ${currentFullYear}, ${currentHour}:${currentMinute}`;
}

formatDate();

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#cityInput");
  cityElement.innerHTML = cityInput.value;
}

let formHeader = document.querySelector("#formHeader");
formHeader.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = 22;
}

let fahreneitlink = document.querySelector("#fahrenheit-link");
fahreneitlink.addEventListener("click", convertToFahrenheit);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", convertToCelsius);
