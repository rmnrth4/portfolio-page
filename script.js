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
    .catch((error) => console.error("Error!", error.message));
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
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(ShowPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

const ShowPosition = (position) => {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  console.log(lat, lng);
};

const showError = (error) => {
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
};

// weather
const apiKey = "8d9e914e1b85d4b76d5dd5e3564409cd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-city");
const locationBtn = document.querySelector(".get-location");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city = null, lon = null, lat = null) {
  if (city !== null) {
    const response = await fetch(apiUrl + "q=" + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      var data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + " °C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML =
        Math.round(data.wind.speed) + "km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/weather/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/weather/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/weather/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/weather/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/weather/mist.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/weather/snow.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/weather/drizzle.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } else {
    // const response = await fetch(apiUrl + "lat=" + lat + "&lon=" + lon + `&appid=${apiKey}`);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
