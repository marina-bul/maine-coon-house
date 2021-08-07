// const slideItems = document.querySelectorAll(".cat-slide");
// const hiddenSlide = document.querySelector(".hidden");

// function changeSlide() {
//   slideItems.forEach((slide) => {
//     if (slide.classList.contains("hidden")) {
//       slide.classList.remove("hidden");
//     } else {
//       slide.classList.add("hidden");
//     }
//   });
// }

// setInterval(changeSlide, 5000);

const catImages = [
  "./img/pets-list-1-desktop@1x.png",
  "./img/pets-list-2-desktop@1x.png",
  "./img/pets-list-3-desktop@1x.png",
];

const mainSliderBox = document.querySelector(".section__cats-main-slider");
const sliderButtonBack = document.querySelector(".section__cats-controls-prev");
const sliderButtonNext = document.querySelector(".section__cats-controls-next");
const prevSlideBox = document.querySelector(".section__cats-slider-prev");
const currentSlideBox = document.querySelector(".section__cats-slider-main");
const nextSlideBox = document.querySelector(".section__cats-slider-next");
const slidesCount = catImages.length - 1;

let currentSlideIndex = 1;
let prevSlideIndex = currentSlideIndex - 1;
let nextSlideIndex = currentSlideIndex + 1;

sliderLoad();

function sliderLoad() {
  prevSlideBox.innerHTML = `
    <img src="${catImages[prevSlideIndex]}" alt="карточка кота">
  `;

  currentSlideBox.innerHTML = `
    <img src="${catImages[currentSlideIndex]}" alt="карточка кота">
  `;

  nextSlideBox.innerHTML = `
    <img src="${catImages[nextSlideIndex]}" alt="карточка кота">
  `;
}

function changeSlides(direction) {
  switch (direction) {
    case "prev":
      prevSlideIndex--;
      currentSlideIndex--;
      nextSlideIndex--;

      if (prevSlideIndex < 0) {
        prevSlideIndex = slidesCount;
      }

      if (currentSlideIndex < 0) {
        currentSlideIndex = slidesCount;
      }

      if (nextSlideIndex < 0) {
        nextSlideIndex = slidesCount;
      }

      sliderLoad();

      break;

    case "next":
      prevSlideIndex++;
      currentSlideIndex++;
      nextSlideIndex++;

      if (nextSlideIndex > slidesCount) {
        nextSlideIndex = 0;
      }

      if (currentSlideIndex > slidesCount) {
        currentSlideIndex = 0;
      }

      if (prevSlideIndex > slidesCount) {
        prevSlideIndex = 0;
      }

      sliderLoad();

      break;
  }
}

// window.addEventListener(
//   `resize`,
//   (event) => {
//     width = slider.offsetWidth;
//     slider.style.transform = `translateX(-${width * activeSlideIndex}px)`;
//   },
//   false
// );

// slider.style.transform = `translateX(-${width * activeSlideIndex}px)`;

// const changeSlidesToPrev = () => {
//   slider.style.transition = "transform 1s ease-in-out";
//   activeSlideIndex--;
//   if (activeSlideIndex < 0) {
//     activeSlideIndex = slidesCount - 1;
//   }
//   slider.style.transform = `translateX(-${width * activeSlideIndex}px)`;
// };

// const changeSlidesToNext = () => {
//   slider.style.transition = "transform 1s ease-in-out";
//   activeSlideIndex++;
//   if (activeSlideIndex > slidesCount - 1) {
//     activeSlideIndex = 0;
//   }
//   slider.style.transform = `translateX(-${width * activeSlideIndex}px)`;
// };

// const jump = () => {
//   slider.addEventListener("transitionend", () => {
//     activeSlideIndex == 0
//       ? (activeSlideIndex = slidesCount - 1)
//       : activeSlideIndex;
//     activeSlideIndex == slidesCount - 1
//       ? (activeSlideIndex = 0)
//       : activeSlideIndex;
//     slider.style.transition = "none";
//     slider.style.transform = `translateX(-${width * activeSlideIndex}px)`;
//   });
// };

sliderButtonBack.addEventListener("click", () => changeSlides("prev"));
sliderButtonNext.addEventListener("click", () => changeSlides("next"));
