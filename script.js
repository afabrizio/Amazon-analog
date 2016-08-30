var theSearchButton = document.getElementById('search');
var theData = JSON.parse(data); //parses JSON string data to javascript objects.
var searchMatches = []; // an array that contains 'theData' object indicies of matches identified by search().

//Adds all the theData objects on the DOM:
for (var i=0; i<theData.length; i++) {
  addDataElement(i);
}

//this function takes a number argument, uses the argument to locate an object in the theData array, and adds that object to the DOM.
function addDataElement(index) {
  var dataElement = document.createElement('div');// created a parent <div> for each data object;
  dataElement.id = 'data-element';

  //sets up columns of each searchResultElement.
  var elementImageDiv = document.createElement('div');
  elementImageDiv.id = 'object-images';
  dataElement.appendChild(elementImageDiv);
  var elementDetailsDiv = document.createElement('div');
  elementDetailsDiv.id = 'object-details';
  dataElement.appendChild(elementDetailsDiv);

  var objectImage = document.createElement('img');
  objectImage.src = theData[index].image;
  elementImageDiv.appendChild(objectImage);

  var objectName = document.createElement('span');
  objectName.id = 'object-name';
  objectName.textContent = theData[index].name;
  elementDetailsDiv.appendChild(objectName);

  var objectDescription = document.createElement('p');
  objectDescription.id = "object-description";
  objectDescription.textContent = theData[index].description;
  elementDetailsDiv.appendChild(objectDescription);

  var objectDetails = document.createElement('ul');
  elementDetailsDiv.appendChild(objectDetails);

  var objectSeller = document.createElement('li');
  objectSeller.textContent = 'Seller: ' + theData[index].seller;
  objectDetails.appendChild(objectSeller);

  var objectCost = document.createElement('li');
  objectCost.textContent = 'Price: ' + theData[index].price;
  objectDetails.appendChild(objectCost);

  var dataElements = document.getElementById('data-elements'); //created reference to where each dataElement will be appended to.
  dataElements.appendChild(dataElement);
}

//Search Engine
theSearchButton.addEventListener('click', search);
function search() {
  clearResults(); //first clears the current products from the DOM
  var searchString = document.getElementById('search-string').value; //get user search string
  var searchString = searchString.toLowerCase();//makes string lowerecase
  for (var i=0; i<theData.length; i++) { //indexes through objects in theData array.
    for (var property in theData[i]) { //indexes through each property of each data array object.
      var propertyString = theData[i][property].toString();
      var propertyString = propertyString.toLowerCase(); //makes string lowercase.
      if (searchString.indexOf(propertyString) !== -1) {
        match(i); //store index of the object that matches.
      }
      if (propertyString.indexOf(searchString) !== -1){
        match(i); //store index of the object that matches.
      }
    }
  }
  updateResults(); //calls updateResults() to update the DOM with the search results.
}

//builds/adds-to searchMatches[] array:
function match(index) {
  for (var i=0; i<searchMatches.length; i++) { //check for duplicates
    if(searchMatches[i] === index) {
      return; //checks for matches, and if a match is found, breaks out of the match function without doing anything.
    }
  }
  var currentLength = searchMatches.length;
  searchMatches[currentLength] = index;
}

function updateResults() {
  for (var i=0; i<searchMatches.length; i++) {
    addDataElement(searchMatches[i]);
  }
}

//Clear elements from the DOM:
function clearResults() {
  var dataElements = document.getElementById('data-elements');
  while (dataElements.firstChild) {
    dataElements.removeChild(dataElements.firstChild);
  }
  searchMatches.length = 0; //Clear the SearchMatches array
}
