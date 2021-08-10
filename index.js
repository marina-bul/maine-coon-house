const catsNavigationList = document.querySelector(
  ".section__cats-category-list"
);
const catsNavigationItems = document.querySelectorAll(
  ".section__cats-category-item"
);

catsNavigationList.addEventListener("click", (e) => {
  catsNavigationItems.forEach((item) => {
    item.classList.remove("category-active");
  });
  e.target.classList.add("category-active");
});

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
let prevSlideIndex = 0;
let nextSlideIndex = 2;

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
      currentSlideIndex = prevSlideIndex;
      nextSlideIndex = currentSlideIndex;

      if (prevSlideIndex === 0) {
        prevSlideIndex = slidesCount;
      } else {
        prevSlideIndex--;
      }

      sliderLoad();

      break;

    case "next":
      prevSlideIndex = currentSlideIndex;
      currentSlideIndex = nextSlideIndex;

      if (nextSlideIndex >= slidesCount) {
        nextSlideIndex = 0;
      } else {
        nextSlideIndex++;
      }

      sliderLoad();

      break;
  }
}

sliderButtonBack.addEventListener("click", () => changeSlides("prev"));
sliderButtonNext.addEventListener("click", () => changeSlides("next"));

const reviewsSlider = document.querySelector(".reviews__main-slider");
const reviewsSliderPrevButton = document.querySelector(
  ".reviews-controls-prev"
);
const reviewsSliderNextButton = document.querySelector(
  ".reviews-controls-next"
);

const reviewsSlidesCount =
  document.querySelectorAll(".reviews__item").length - 1;

let activeSlideIndex = 0;

function changeReviewsSlides(direction) {
  switch (direction) {
    case "prev":
      activeSlideIndex--;
      if (activeSlideIndex < 0) {
        activeSlideIndex = reviewsSlidesCount;
      }
      break;
    case "next":
      activeSlideIndex++;
      if (activeSlideIndex > reviewsSlidesCount) {
        activeSlideIndex = 0;
      }
      break;
  }

  const width = reviewsSlider.offsetWidth;
  reviewsSlider.style.transform = `translateX(-${width * activeSlideIndex}px)`;
}

reviewsSliderPrevButton.addEventListener("click", () =>
  changeReviewsSlides("prev")
);
reviewsSliderNextButton.addEventListener("click", () =>
  changeReviewsSlides("next")
);

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
