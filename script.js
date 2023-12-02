import { OWapiKey } from "./API_keys.js";

// about-me tabs
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// side bar navigation
var sidemenu = document.getElementById("sidemenu");
function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}

// contact form
// https://www.youtube.com/watch?v=sGQSz22U8VM
// https://smtpjs.com/
// Email API: https://app.elasticemail.com/api/settings

const form = document.forms["submit-to-mail"];
const msg = document.getElementById("msg");

function sendEmail() {
  Email.send({
    SecureToken: "c774c0dc-7d20-41ab-bd7d-fad73add28ae",
    To: "romanroth44@gmail.com",
    From: "romanroth44@gmail.com",
    Subject: "New Contact Form Submit - portfolio-page",
    Body:
      "Name: " +
      document.getElementById("Name").value +
      "<br> Email: " +
      document.getElementById("Email").value +
      "<br> Message:<br>" +
      document.getElementById("Message").value,
  })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.location - error("Error!", error.message));
}

// scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// // popup
// let popup = document.getElementById("popup");

// function openPopup() {
//   popup.classList.add("open-popup");
// }
// function closePopup() {
//   popup.classList.remove("open-popup");
// }

function toggle() {
  var x = document.getElementById("non_visibile");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

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
const apiKey = "8d9e914e1b85d4b76d5dd5e3564409cd";
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
  const searchUrl = `${apiUrl}q=${city}&appid=${apiKey}`;
  fetchWeather(searchUrl);
});

async function setWeather(latitude, longitude) {
  const locationUrl = `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetchWeather(locationUrl);
}
