const slider = document.querySelector(".swiper__wrapper");
const controls = document.querySelectorAll(".swiper__control");
let index = 1;

showSlide();
resetControls();

function resetControls() {
  controls.forEach((element) => {
    element.classList.remove("swiper__control_active");
    controls[index].classList.add("swiper__control_active");
  });
}

function showSlide() {
  const slideWidth = document.querySelector(".swiper__slide").offsetWidth + 30;
  slider.style.transform = `translateX(${(-index + 2) * slideWidth}px)`;
}

function nextSlide() {
  if (index >= 4) {
    index = 0;
  } else {
    index += 1;
  }
  showSlide();
  controls.forEach((element) => {
    element.classList.remove("swiper__control_active");
    controls[index].classList.add("swiper__control_active");
  });
}

function prevSlide() {
  if (index <= 0) {
    index = 4;
  } else {
    index -= 1;
  }
  showSlide();
  controls.forEach((element) => {
    element.classList.remove("swiper__control_active");
    controls[index].classList.add("swiper__control_active");
  });
}

let startX;
let currentX;
let moveX;
let isDragging;

function touchStart(event) {
  isDragging = true;
  startX = event.clientX || event.touches[0].clientX;
}

function touchMove(event) {
  if (!isDragging) return;
  event.preventDefault();
  currentX = event.clientX || event.touches[0].clientX;
  moveX = startX - currentX;
}

function touchEnd() {
  if (moveX > 50) {
    nextSlide();
    resetControls();
  } else if (moveX < -50) {
    prevSlide();
    resetControls();
  }
  controls[index].style.animationPlayState = "running";
  startX = 0;
  currentX = 0;
  moveX = 0;
  isDragging = false;
}

window.addEventListener("resize", showSlide);

slider.addEventListener("mousedown", touchStart);
slider.addEventListener("mousemove", touchMove);
slider.addEventListener("mouseup", touchEnd);

slider.addEventListener("touchstart", touchStart);
slider.addEventListener("touchmove", touchMove);
slider.addEventListener("touchend", touchEnd);
