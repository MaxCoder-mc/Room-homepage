const slides = document.querySelectorAll(".slide");
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");
const menuImg = menuToggle.querySelector("img");
const overlay = document.querySelector(".overlay");

function openMenu() {
  nav.classList.add("active");
  overlay.classList.remove("hidden");
  menuImg.src = "./images/icon-close.svg";
  menuToggle.ariaLabel = "Close Menu";
}
function closeMenu() {
  nav.classList.remove("active");
  overlay.classList.add("hidden");
  menuImg.src = "./images/icon-hamburger.svg";
  menuToggle.ariaLabel = "Open Menu";
}
// Add event listeners for the menu toggle button
menuToggle.addEventListener("click", () => {
  if (nav.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Close the menu when clicking a link
const navLinks = document.querySelectorAll(".nav__list a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

//Close the menu when clicking elsewhere
overlay.addEventListener("click", () => {
  closeMenu();
});

// Remove the active class when resizing the window
window.addEventListener("resize", () => {
  if (window.innerWidth > 1200) {
    closeMenu();
  }
});

//Create nav-arrows to be attached to the active class
const navArrows = document.createElement("div");
navArrows.className = "nav-arrows";
navArrows.innerHTML = `
          <button type="button" id="prev" class="nav-arrows_btn" aria-label="Previous slide">
            <img src="./images/icon-angle-left.svg" alt="" />
          </button>
          <button type="button" id="next" class="nav-arrows_btn" aria-label="Next slide">
            <img src="./images/icon-angle-right.svg" alt="" />
          </button>
      `;

// Function to append arrows to current slide
function appendArrowsToSlide(index) {
  slides[index].querySelector(".slide-picture").appendChild(navArrows);
}
appendArrowsToSlide(0);

const next = document.getElementById("next");
const prev = document.getElementById("prev");
let index = 0;
// Function to show the current slide with animation
// and remove the previous animation class
function showSlide(i, animationClass) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("slide-in-left", "slide-in-right");
    slide.classList.toggle("active-slide", idx === i);
    appendArrowsToSlide(i);
    slide.classList.add(animationClass);
  });
}

next.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  showSlide(index, "slide-in-right");
});

prev.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index, "slide-in-left");
});
