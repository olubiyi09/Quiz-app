const startBtn = document.querySelector(".start-wrapper");
const popUp = document.querySelector(".pop-up");

startBtn.addEventListener("click", showPopup);

function showPopup() {
  startBtn.style.display = "none";
  popUp.style.display = "block";
}
