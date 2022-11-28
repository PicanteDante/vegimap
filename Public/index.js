var toggle = document.querySelector(".toggle");
var menu = document.querySelector(".menu");
var items = document.querySelectorAll(".item"); 

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
for (let item of items) {
  if (item.querySelector(".submenu")) {
    item.addEventListener("click", toggleItem, false);
  }
  item.addEventListener("keypress", toggleItem, false);
}
document.addEventListener("click", closeSubmenu, false);

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
