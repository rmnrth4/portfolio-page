// Geo Location
document
  .querySelector(".get-location")
  .addEventListener("click", geoLookUp, false);

function geoLookUp() {
  const status = document.querySelector(".location-error");

  function ShowPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // alert(`lat: ${latitude}, lon: ${longitude}`);
    setWeather(latitude, longitude);
  }

  function showError(error) {
    status.textContent = "unable to retrive your location";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("You denied the request for Geolocation.");
        break;

      case error.POSITON_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;

      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occured.");
        break;
      default:
        alert("An unknown error occured.");
    }
  }

  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by this browser.";
  } else {
    navigator.geolocation.getCurrentPosition(ShowPosition, showError);
  }
}

// weather
import { OWapiKey } from "./API_keys.js";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-city");
const weatherIcon = document.querySelector(".weather-icon");

function updateWeatherUI(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + " °C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML =
    Math.round(data.wind.speed) + "km/h";

  const weatherType = data.weather[0].main.toLowerCase();
  const imageSrc = `images/weather/${weatherType}.png`;
  weatherIcon.src = imageSrc;

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".location-error").style.display = "none";
}

async function fetchWeather(url) {
  const response = await fetch(url);

  if (response.status == 404) {
    document.querySelector(".location-error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    updateWeatherUI(data);
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  const searchUrl = `${apiUrl}q=${city}&appid=${OWapiKey}`;
  fetchWeather(searchUrl);
});

async function setWeather(latitude, longitude) {
  const locationUrl = `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${OWapiKey}`;
  fetchWeather(locationUrl);
}
