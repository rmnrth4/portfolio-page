// contact form
// https://www.youtube.com/watch?v=sGQSz22U8VM
// https://smtpjs.com/
// Email API: https://app.elasticemail.com/api/settings

import config from "./API_keys.js";

const form = document.forms["submit-to-mail"];
const msg = document.getElementById("msg");

function sendEmail() {
  Email.send({
    SecureToken: config.SecureToken,
    To: config.email,
    From: config.email,
    Subject: "New Contact Form Submit - portfolio-page",
    Body:
      "Diese Nachricht kommt von deiner Github Portfolio Page <br><br> Name: " +
      document.getElementById("Name").value +
      "<br> Absender: " +
      document.getElementById("Email").value +
      "<br> Nachricht:<br>" +
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

form.addEventListener("submit", function (event) {
  event.preventDefault();
  sendEmail();
});

const email = config.email;
const emailLink = document.getElementById("emailLink");
emailLink.setAttribute("href", `mailto:${email}`);
