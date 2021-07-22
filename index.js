const slideItems = document.querySelectorAll(".cat-slide");
const hiddenSlide = document.querySelector(".hidden");

function changeSlide() {
  slideItems.forEach((slide) => {
    if (slide.classList.contains("hidden")) {
      slide.classList.remove("hidden");
    } else {
      slide.classList.add("hidden");
    }
  });
}

setInterval(changeSlide, 5000);

const sliderButtonBack = document.querySelector(".controls-back");
const sliderButtonNext = document.querySelector(".controls-next");
const slider = document.querySelector(".cats-slider");
const slidesCount = document.querySelectorAll(".cats-slider-item").length;

let activeSlideIndex = 0;

const changeCats = (direction) => {
  switch (direction) {
    case "back":
      activeSlideIndex--;
      if (activeSlideIndex < 0) {
        activeSlideIndex = slidesCount - 1;
      }
      break;
    case "next":
      activeSlideIndex++;
      if (activeSlideIndex > slidesCount - 1) {
        activeSlideIndex = 0;
      }
      break;
  }
  const width = slider.offsetWidth;
  slider.style.transform = `translateX(-${width * activeSlideIndex}px)`;
};

sliderButtonBack.addEventListener("click", () => changeCats("back"));
sliderButtonNext.addEventListener("click", () => changeCats("next"));
