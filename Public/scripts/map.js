/* ---------- the map ---------- */

var map = L.map('map').setView([44.563091, -123.283511], 15);

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);


var markerIdentifier = 0;
var markerArray = [];
/*
 *	THE THING
 */
function addMarker(marker_name, imageURL, desc, long, lat)
{
	/*
	 *	request new ID
	 */
	 fetch("/api/markers/get_id", {
		method: "GET"
	  }).then( response => {
		return response.json();
	  }).then( plant_marker => {
		fetch("/api/markers/add", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({
		  plant_marker_id: plant_marker.next_id,
		  name: marker_name,
		  description: desc,
		  latitude: lat,
		  longitude: long,
		  image: imageURL
		})
	  });
	  
	})
	var marker = L.marker([lat, long], {
		alt:	markerIdentifier
	}).addTo(map);
	markerIdentifier++;
	markerArray.push(marker);
	console.log(marker);
	console.log(marker.alt);
}

/* ---------- add button ---------- */

function showAddSomethingModal() {

	var showSomethingModal = document.getElementById('add-something-modal');
	var modalBackdrop = document.getElementById('modal-backdrop');
	var inputBoxes = document.getElementsByClassName("marker-input-box");
	
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


/*
 * Hide Da box functionality through clicking the cross/close button
 */
window.addEventListener('click', function(event) {
	if (event.target == document.getElementById('modal-close')) { 
	  document.getElementById('modal-close').style.display = "none";
	  var elems = document.getElementsByClassName('desc-container');
		for (var i = 0; i < elems.length; i++ ) {
    		elems[i].style.display = "none";
		}
	}
});


/*
* Button handler for suggest edits button
*/
window.addEventListener('click', function(event) {
if (event.target == document.getElementById('expert-button')) {
	document.getElementById('expert-button').style.display = "none";
	document.getElementById('plantDesc').style.border = "2px solid black";
	document.getElementById('plantDesc').style.borderRadius = "5px";
	document.getElementById('plantDesc').setAttribute("contenteditable", "true");
	document.getElementById('save-button').style.display = "block";
} 
});

window.addEventListener('click',function(event) {
if (event.target == document.getElementById('save-button')) {
	document.getElementById('save-button').style.display = "none";
	document.getElementById('expert-button').style.display = "block";
	document.getElementById('plantDesc').style.border = "none";
	document.getElementById('plantDesc').setAttribute("contenteditable", "false");
}
});


/*
 * Clear any text entered in the text inputs.
 */
function clearAddSomethingModalInputs() {

	var inputBoxes = document.getElementsByClassName("marker-input-box");

	//	Reset the error boxes
	for (var i = 0; i < inputBoxes.length; i++)
	{
		inputBoxes[i].style.borderColor = "";
		inputBoxes[i].value = "";
	}
}


//	Receive input and create marker
function checkURL(url)
{
	return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
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
	
	/*
	//	Make sure url is an image
	if (checkURL())
	{
		inputBoxes[i].style.borderColor = "red";
		validInput = false;
	}
	else
	{
		inputBoxes[i].style.borderColor = "";
	}
	*/
	
	if (validInput)
	{
		addMarker(nameBox.value, imageBox.value, descBox.value, parseFloat(longBox.value), parseFloat(latBox.value));
		
		hideAddSomethingModal();
	}
	
	
}


var submitDataButton = document.getElementById("modal-accept");
submitDataButton.addEventListener('click', checkInput);

console.log(parseFloat("balls"));

/* ------ plant desc ----- */
function openPlantMarker(){
	
	/*
	 *	API call for new ID
	 */
	
	/*
	 *	create marker on map with new ID and data, and post marker data to server
	 */
	
	//classList.remove('hidden');
	//var markerID =
}
