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
