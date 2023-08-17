var modal = document.getElementById("myModal");
var modalVideo = document.getElementById("modal-video");

function openModal() {
  modal.style.display = "block";
  modalVideo.src = "C:/Users/dhifa/Videos/Captures/test.mp4"; 
}

function closeModal() {
  modal.style.display = "none";
  modalVideo.src = ""; 
}

document.onkeydown = function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
};
