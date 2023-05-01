// Random Background Logic
let backgroundInterval;
let backgroundOption = true;
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Imgs
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];
if (localStorage.getItem("background_option")) {
  backgroundOption = JSON.parse(localStorage.getItem("background_option"));
  document.querySelectorAll(".background span").forEach((span) => {
    span.classList.remove("active");
  });
  if (JSON.parse(localStorage.getItem("background_option")) == true) {
    document.querySelector(".background span.yes").classList.add("active");
  } else {
    document.querySelector(".background span.no").classList.add("active");
  }
}
// Change Background Randomly Function
function randomizeImgs() {
  if (backgroundOption == true) {
    backgroundInterval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * imgsArray.length);
      localStorage.setItem("current_img", "url('imgs/" + imgsArray[randomIndex] + "')");
      landingPage.style.backgroundImage = "url('imgs/" + imgsArray[randomIndex] + "')";
    }, 10000);
  }
}
randomizeImgs();
// Create Bullets For Sections
let BulletsContainer = document.querySelector(".nav-bullets");
let allSections = document.querySelectorAll("body .page-sections > div");
allSections = Array.from(allSections).slice(0, -1);
allSections.forEach((section) => {
  let bullet = document.createElement("div");
  bullet.className = "bullet";
  let tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.appendChild(document.createTextNode(section.dataset.name));
  bullet.appendChild(tooltip);
  BulletsContainer.appendChild(bullet);
});
allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    handleActiveClass(e);
    allSections.forEach((section) => {
      if (section.dataset.name == bullet.firstChild.textContent) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
// Check Active Bullet By Active Section
function chkActiveBulletBySection() {
  allSections.forEach((section) => {
    let bounding = section.getBoundingClientRect();
    if (bounding.top >= 0 && bounding.bottom <= window.innerHeight) {
      allBullets.forEach((bullet) => {
        bullet.classList.remove("active");
        if (bullet.firstChild.textContent == section.dataset.name) {
          bullet.classList.add("active");
        }
      });
    }
  });
}
// Check Active Section
chkActiveBulletBySection();
// Bullet Option Local Storage
let bulletOptionSpans = document.querySelectorAll(".bullets-option span");
let bulletsLocalItem = window.localStorage.getItem("bullets_option");
if (bulletsLocalItem != null) {
  bulletOptionSpans.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalItem == "block") {
    document.querySelector(".bullets-option span.yes").classList.add("active");
    BulletsContainer.style.display = bulletsLocalItem;
  } else {
    document.querySelector(".bullets-option span.no").classList.add("active");
    BulletsContainer.style.display = bulletsLocalItem;
  }
}
bulletOptionSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActiveClass(e);
    span.classList.add("active");
    BulletsContainer.style.display = span.dataset.display;
    window.localStorage.setItem("bullets_option", span.dataset.display);
  });
});

// Check Previous Local Storage
// Check Colors Local Storage Function
function chkColorsLocalStorage() {
  if (window.localStorage.getItem("color_option")) {
    document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("color_option"));
    document.querySelectorAll(".settings-box .colors-list li").forEach((li) => {
      li.classList.remove("active");
      if (li.dataset.color == window.localStorage.getItem("color_option")) {
        li.classList.add("active");
      }
    });
  }
}
// Trigger Check Colors Local Storage Function
chkColorsLocalStorage();
//Check For Previous Background At Local Storage
if (localStorage.getItem("current_img")) {
  if (JSON.parse(localStorage.getItem("background_option")) == true) {
    document.querySelector(".landing-page").style.backgroundImage = localStorage.getItem("current_img");
  }
}

// Settigs Gear Click
let settingsBox = document.querySelector(".settings-box");
let settingsToggle = document.querySelector(".settings-box .settings-toggle");
settingsToggle.onclick = function () {
  this.firstElementChild.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
};

// Switch Colors
const colorsLis = document.querySelectorAll(".settings-box .colors-list li");
colorsLis.forEach((li) => {
  li.onclick = function (e) {
    colorsLis.forEach((li) => {
      li.classList.remove("active");
    });
    li.classList.add("active");
    // document.documentElement.style.setProperty("--main-color", getComputedStyle(e.target).backgroundColor);
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    localStorage.setItem("color_option", e.target.dataset.color);
  };
});

// Random Background Mangement
let chooseSpans = document.querySelectorAll(".background span");
chooseSpans.forEach((span) => {
  span.onclick = function (e) {
    handleActiveClass(e);
    if (span.dataset.status == "yes") {
      backgroundOption = true;
      localStorage.setItem("background_option", backgroundOption);
      randomizeImgs();
    } else {
      backgroundOption = false;
      localStorage.setItem("background_option", backgroundOption);
      clearInterval(backgroundInterval);
    }
  };
});

// Change skill width When Reach Section
window.addEventListener("scroll", function () {
  let skillsSection = document.querySelector(".skills");
  let skillSpans = document.querySelectorAll(".skill-box .skill-progress span");
  if (window.scrollY >= skillsSection.offsetTop + 400 - document.documentElement.clientHeight) {
    skillSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
});
// Galley On Click Preview
let GalleyImgs = document.querySelectorAll(".gallery img");
GalleyImgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let popupHeading = document.createElement("h3");
      popupHeading.appendChild(document.createTextNode(img.alt));
      popupBox.appendChild(popupHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.appendChild(document.createTextNode("X"));
    popupBox.appendChild(closeButton);
    document.body.appendChild(popupBox);
  });
});
// Close Popup Box Button
document.onclick = (e) => {
  if (e.target.className == "close-button") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
};
// Remove Pop Up Box On Click Out Of It
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("popup-overlay")) {
    document.querySelector(".popup-overlay").remove();
    document.querySelector(".popup-box").remove();
  }
});

window.addEventListener("scroll", chkActiveBulletBySection);
// Links Logic
allLinks = document.querySelectorAll(".landing-page .links a");
scrollToSection(allLinks);
function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.onclick = function (e) {
      handleActiveClass(e);
      e.preventDefault();
      document.querySelector(ele.dataset.section).scrollIntoView({ behavior: "smooth" });
    };
  });
}

function handleActiveClass(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((child) => {
    child.classList.remove("active");
  });
  e.target.classList.add("active");
}
document.querySelector(".reset-options").onclick = function () {
  window.localStorage.removeItem("color_option");
  window.localStorage.removeItem("bullets_option");
  window.localStorage.removeItem("background_option");
  window.localStorage.removeItem("current_img");
  window.location.reload();
};
// Toggle Menu Logic
let toggleMenuBtn = document.querySelector(".header-area .toggle-menu");
let linksUl = document.querySelector(".header-area .links");

toggleMenuBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  linksUl.classList.toggle("open");
  this.classList.toggle("menu-active");
});
linksUl.addEventListener("click", function (e) {
  e.stopPropagation();
});
document.addEventListener("click", (e) => {
  if (e.target != toggleMenuBtn && e.target != linksUl) {
    if (linksUl.classList.contains("open")) {
      linksUl.classList.toggle("open");
      toggleMenuBtn.classList.toggle("menu-active");
    }
  }
});
