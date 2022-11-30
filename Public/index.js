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



/* ---------- add button ---------- */

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

  clearAddSomethingModalInputs();
}

var modalHideButtons = document.getElementsByClassName('modal-hide-button');
for (var i = 0; i < modalHideButtons.length; i++) {
  modalHideButtons[i].addEventListener('click', hideAddSomethingModal);
}

function clearAddSomethingModalInputs() {

  var postTextInputElements = [
    document.getElementById('marker-name-input'),
    document.getElementById('marker-photo-input'),
    document.getElementById('marker-desc-input')
  ];

  /*
   * Clear any text entered in the text inputs.
   */
  postTextInputElements.forEach(function (inputElem) {
    inputElem.value = "";
  });
}

function signupAccept() {
  
  var email = document.getElementById('email').value.trim();
  var pw = document.getElementById('pw').value.trim();
  var pwRepeat = document.getElementById('pwRepeat').value.trim();

  if (!email || !pw || !pwRepeat) {
    alert("You must fill in all of the fields!");
  }else{
    if (pw != pwRepeat){
      alert("Your passwords are not matching!");
    }

    /* ---- add new info to database ---- */
    console.log("== sign up accepted");
  }
}

var CreateAcctBtn = document.getElementById('create-acct');
if (CreateAcctBtn) {
  CreateAcctBtn.addEventListener('click', signupAccept);
}