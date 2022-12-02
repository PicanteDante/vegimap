/* ---------- add button ---------- */

function showAddSomethingModal() {

	var showSomethingModal = document.getElementById('add-something-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');
	var inputBoxes = document.getElementsByClassName("marker-input-box");
	
	//	Reset the error boxes
	for (var i = 0; i < inputBoxes.length; i++)
	{
		inputBoxes[i].style.borderColor = "";
		inputBoxes[i].value = "";
		console.log("jeff");
	}
	
	//	Get GPS location if possible
	const successCallback = (position) => {
		console.log(position);
		var longBox = document.getElementById("marker-long-input");
		var latBox = document.getElementById("marker-lat-input");
		
		longBox.value = position.coords.longitude;
		latBox.value = position.coords.latitude;
	}
	const failureCallback = (error) => {
		console.log(error);
	}
	navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
  
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

/*
document.getElementById("fName").className = document.getElementById("fName").className + " error";  // this adds the error class

document.getElementById("fName").className = document.getElementById("fName").className.replace(" error", ""); // this removes the error class
 */

function checkInput()
{
	var inputBoxes = document.getElementsByClassName("marker-input-box");
	
	var nameBox = document.getElementById("marker-name-input");
	var imageBox = document.getElementById("marker-photo-input");
	var descBox = document.getElementById("marker-desc-input");
	var longBox = document.getElementById("marker-long-input");
	var latBox = document.getElementById("marker-lat-input");
	
	
	var validInput = true;
	for (var i = 0; i < inputBoxes.length; i++)
	{
		
		if (inputBoxes[i].value == "")
		{
			inputBoxes[i].style.borderColor = "red";
			validInput = false;
		}
		else
		{
			inputBoxes[i].style.borderColor = "";
		}
	}
	
	
	if (validInput)
	{
		//addMarker(
	}
}

var submitDataButton = document.getElementById("modal-accept");
submitDataButton.addEventListener('click', checkInput);
