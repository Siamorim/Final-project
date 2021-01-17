let cities = [
  { name: "Paris", temp: 19.7, humidity: 80 },
  { name: "Tokyo", temp: 17.3, humidity: 50 },
  { name: "Lisbon", temp: 30.2, humidity: 20 },
  { name: "San francisco", temp: 20.9, humidity: 100 },
  { name: "Moscow", temp: -5, humidity: 20 },
];
let city = prompt("Enter a city?");
city = city.trim();
city = city.toLowerCase();

if (city.length === 0) {
  alert("Oh, please enter your city 😊");
} else {
  if (city === "paris") {
    alert(
      `It is currently ${cities[0].temp}ºC in ${cities[0].name}, with a humidity of ${cities[0].humidity}%.`
    );
  }
  if (city === "tokyo") {
    alert(
      `It is currently ${cities[1].temp}ºC in ${cities[1].name}, with a humidity of ${cities[1].humidity}%.`
    );
  }
  if (city === "lisbon") {
    alert(
      `It is currently ${cities[2].temp}ºC in ${cities[2].name}, with a humidity of ${cities[2].humidity}%.`
    );
  }
  if (city === "san francisco") {
    alert(
      `It is currently ${cities[3].temp}ºC in ${cities[3].name}, with a humidity of ${cities[3].humidity}%.`
    );
  }
  if (city === "moscow") {
    alert(
      `It is currently ${cities[4].temp}ºC in ${cities[4].name}, with a humidity of ${cities[4].humidity}%.`
    );
  }
  if (
    city !== "paris" &&
    city !== "tokyo" &&
    city !== "lisbon" &&
    city !== "san francisco" &&
    city !== "moscow"
  ) {
    alert(
      "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney"
    );
  }
}
