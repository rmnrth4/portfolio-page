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

function toggle() {
  var x = document.getElementById("non_visibile");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
