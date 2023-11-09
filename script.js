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

// popup
let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}
function closePopup() {
  popup.classList.remove("open-popup");
}
