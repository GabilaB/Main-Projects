const slides = document.querySelectorAll(".slide");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const auto = false;
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
  //get current class

  const current = document.querySelector(".current");

  //remove the current class
  current.classList.remove("current");

  // check for next slide

  if (current.nextElementSibling) {
    //Add current to next sibling
    current.nextElementSibling.classList.add("current");
  } else {
    //add current to start
    slides[0].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

const prevSlide = () => {
  //get current class

  const current = document.querySelector(".current");

  //remove the current class
  current.classList.remove("current");

  // check for prev slide

  if (current.previousElementSibling) {
    //Add current to prev sibling
    current.previousElementSibling.classList.add("current");
  } else {
    //add current to last
    slides[slides.length - 1].classList.add("current");
  }
  setTimeout(() => current.classList.remove("current"));
};

//button event

next.addEventListener("click", e => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});
prev.addEventListener("click", e => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto slide
if (auto) {
  //Run next slide at interval
  slideInterval = setInterval(nextSlide, intervalTime);
}
