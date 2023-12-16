// aboutme text
// const h2s = document.querySelectorAll(".aboutme h2");

// const beobachter = new IntersectionObserver(
//   (entries) => {
//     for (const entry of entries) {
//       if (entry.isIntersecting) {
//         entry.target.classList.add("visible");
//       } else {
//         entry.target.classList.remove("visible");
//       }
//     }
//   },
//   {
//     threshold: 1.0,
//     rootMargin: "20%",
//   }
// );

// h2s.forEach((h2) => beobachter.observe(h2));

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
  sidemenu.style.right = "-130px";
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

// about column timeline
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

// about column right
const observerhiddenright = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show-right-left");
    } else {
      entry.target.classList.remove("show-right-left");
    }
  });
});
const hiddenRightElements = document.querySelectorAll(".hidden-right");
hiddenRightElements.forEach((el) => observerhiddenright.observe(el));

// about column left
const observerhiddenleft = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show-right-left");
    } else {
      entry.target.classList.remove("show-right-left");
    }
  });
});
const hiddenLeftElements = document.querySelectorAll(".hidden-left");
hiddenLeftElements.forEach((el) => observerhiddenleft.observe(el));
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
