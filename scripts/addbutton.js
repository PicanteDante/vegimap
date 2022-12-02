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