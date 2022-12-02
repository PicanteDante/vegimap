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


//	Receive input and create marker
function checkURL(url)
{
	return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function addMarker(name, imageURL, desc, long, lat)
{
	
}

function checkInput()
{
	var inputBoxes = document.getElementsByClassName("marker-input-box");
	
	var nameBox = document.getElementById("marker-name-input");
	var imageBox = document.getElementById("marker-photo-input");
	var descBox = document.getElementById("marker-desc-input");
	var longBox = document.getElementById("marker-long-input");
	var longBox = document.getElementById("marker-lat-input");
	
	
	var validInput = true;
	for (var i = 0; i < inputBoxes.length; i++)
	{
		
		if (inputBoxes[i].value == "")
		{
			inputBoxes[i].style.backgroundColor = "red";
			validInput = false;
		}
		else
		{
			inputBoxes[i].style.backgroundColor = "";
		}
		console.log(inputBoxes[i].style.backgroundColor);
	}
	
	
	if (validInput)
	{
		//addMarker(
	}
}

var submitDataButton = document.getElementById("modal-accept");
submitDataButton.addEventListener('click', checkInput);
