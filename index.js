const apiKey = "bef28292a4925ba90f340ce8bb0eb499";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&=&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

async function checkWearher(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").textContent = "Invalid Name";
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else if (city == "") {
      document.querySelector(".error").textContent = "Enter City Name";
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
      var data = await response.json();
      console.log(data);

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.floor(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      }
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
}
searchBtn.addEventListener("click", () => {
  searchBox.value = searchBox.value.trim();
  checkWearher(searchBox.value);
});
