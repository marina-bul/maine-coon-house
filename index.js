const getData = async () => {
  const data = await fetch("./mainCoonDB.json");
  if (data.ok) {
    return data.json();
  } else {
    throw new Error(
      `Данные не были получены, ошибка ${data.status} ${data.statusText}`
    );
  }
};

// Раздел Питомцы

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
  getCatsData(e.target.dataset.category);
});

const mainSliderBox = document.querySelector(".section__cats-main-slider");
const sliderButtonBack = document.querySelector(".section__cats-controls-prev");
const sliderButtonNext = document.querySelector(".section__cats-controls-next");
const prevSlideBox = document.querySelector(".section__cats-slider-prev");
const currentSlideBox = document.querySelector(".section__cats-slider-main");
const nextSlideBox = document.querySelector(".section__cats-slider-next");

let currentSlideIndex = 1;
let prevSlideIndex = 0;
let nextSlideIndex = 2;

let slides;

getCatsData("male");

sliderButtonBack.addEventListener("click", () => changeSlides("prev"));
sliderButtonNext.addEventListener("click", () => changeSlides("next"));

function getCatsData(category) {
  getData().then((data) => {
    if (category) {
      const filteredData = data.cats.filter(
        (item) => item.category === category
      );
      slides = filteredData;
    } else {
      slides = data.cats;
    }

    sliderLoad();
  });
}

function sliderLoad() {
  prevSlideBox.innerHTML = `
    <img src="${slides[prevSlideIndex].img}" alt="карточка кота">
  `;

  currentSlideBox.innerHTML = `
    <img src="${slides[currentSlideIndex].img}" alt="карточка кота">
  `;

  nextSlideBox.innerHTML = `
    <img src="${slides[nextSlideIndex].img}" alt="карточка кота">
  `;
}

function changeSlides(direction) {
  const slidesCount = slides.length - 1;

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

// Расстановка слайдов на нужные места при экране 1366px

window.addEventListener(
  `resize`,
  (event) => {
    currentSlideIndex = 1;
    prevSlideIndex = 0;
    nextSlideIndex = 2;

    sliderLoad();
  },
  false
);

// Раздел Отзывы

const reviewsSlider = document.querySelector(".reviews__main-slider");
const reviewsSliderPrevButton = document.querySelector(
  ".reviews-controls-prev"
);
const reviewsSliderNextButton = document.querySelector(
  ".reviews-controls-next"
);

let reviews;
let reviewsSlidesCount;
let activeSlideIndex = 0;

getReviews();

reviewsSliderPrevButton.addEventListener("click", () =>
  changeReviewsSlides("prev")
);
reviewsSliderNextButton.addEventListener("click", () =>
  changeReviewsSlides("next")
);

function getReviews() {
  getData().then((data) => {
    reviews = data.reviews;
    renderReviews(reviews);
  });
}

function renderReviews(reviews) {
  reviewsSlider.textContent = "";
  reviews.forEach((item) => {
    const reviewHTML = `
      <li class="reviews__item">
        <img src=${
          item.photo ? item.photo : "./img/reviewer-unname-2.jpg"
        } alt="фото автора">
        <div class="review__content">
          <h3>${item.author}</h3>
          <p>${item.text}</p>
          <div class="review-footer">
            <time datetime="2018-05-24">${item.date}</time>
            <div class="review__social-links">
              <svg class="social__icon reviews__icon reviews__icon--tw" width="17" height="12">
                <use xlink:href="#icon-tw" x="0" y="0"></use>
              </svg>
              <svg class="social__icon reviews__icon reviews__icon--vk" width="13" height="8">
                <use xlink:href="#icon-vk" x="0" y="0"></use>
              </svg>
            </div>
          </div>
        </div>
      </li>
    `;

    reviewsSlider.insertAdjacentHTML("beforeend", reviewHTML);
  });

  reviewsSlidesCount = document.querySelectorAll(".reviews__item").length - 1;
}

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

const reviewModal = document.querySelector(".modal-wrapper");
const reviewForm = document.querySelector(".new-review");
const createNewReviewBtn = document.querySelector(".create-new-review");
const reviewModalCloseBtn = document.querySelector(".modal-close-btn");

const inputFirstName = document.querySelector(".first-name");
const inputLastName = document.querySelector(".last-name");
const inputReviewText = document.querySelector(".review-text");

createNewReviewBtn.addEventListener("click", () => {
  reviewModal.classList.remove("modal-hidden");
});

reviewModalCloseBtn.addEventListener("click", () => {
  reviewModal.classList.add("modal-hidden");
});

reviewForm.addEventListener("submit", sendReviewForm);

async function sendReviewForm(e) {
  e.preventDefault();
  reviewForm.classList.add("_sending");
  setInterval(() => {
    reviewForm.classList.remove("_sending");
    reviewForm.innerHTML = `<h2>Благодарим за отзыв!</h2>`;
  }, 4000);
  // let newReviewData = new FormData(reviewForm);
  // let response = await fetch("sendmail.php", {
  //   method: "POST",
  //   body: newReviewData,
  // });

  // if (response.ok) {
  //   let result = await response.json();
  //   alert(result.message);
  //   reviewForm.innerHTML = `<h2>Благодарим за отзыв!</h2>`;
  // } else {
  //   alert("Ошибка");
  // }
}
