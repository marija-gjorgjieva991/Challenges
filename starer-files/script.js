const images = [
  "img/image1.jpg",
  "img/image2.jpg",
  "img/image3.jpg",
  "img/image4.jpg",
];

const imageElement = document.querySelector("#imageDisplay");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

let idx = 0;

function showImage() {
  imageElement.src = images[idx];
  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === images.length - 1;
}

function showPreviousImage() {
  if (idx > 0) {
    idx--;
    showImage();
  }
}

function showNextImage() {
  if (idx < images.length - 1) {
    idx++;
    showImage();
  }
}

prevBtn.addEventListener("click", showPreviousImage);
nextBtn.addEventListener("click", showNextImage);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    showPreviousImage();
  } else if (event.key === "ArrowRight") {
    showNextImage();
  }
});

showImage();
