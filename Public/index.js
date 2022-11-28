var toggle = document.querySelector(".toggle");
var menu = document.querySelector(".menu");

function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-bars'></i>";
  } else {
    menu.classList.add("active");
    toggle.querySelector("a").innerHTML = "<i class='fas fa-times'></i>";
  }
}

toggle.addEventListener("click", toggleMenu, false);

/* ---------- add button */

function showAddSomethingModal() {

  var showSomethingModal = document.getElementById('add-something-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');
}

window.addEventListener('DOMContentLoaded', function () {
  var addSomethingButton = document.getElementById('add-plant-button');

  if (addSomethingButton) {
    addSomethingButton.addEventListener('click', showAddSomethingModal);
  }
});

function hideAddSomethingModal() {

  var showSomethingModal = document.getElementById('add-something-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  showSomethingModal.classList.add('hidden');
  modalBackdrop.classList.add('hidden');
}

var modalHideButtons = document.getElementsByClassName('modal-hide-button');
for (var i = 0; i < modalHideButtons.length; i++) {
  modalHideButtons[i].addEventListener('click', hideAddSomethingModal);
}
