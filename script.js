var theSearchButton = document.getElementById('search');
var theData = JSON.parse(data); //parses JSON string data to javascript objects
loadData();

function loadData() {
  for (var i=0; i<theData.length; i++) {
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
    objectImage.src = theData[i].image;
    elementImageDiv.appendChild(objectImage);

    var objectName = document.createElement('span');
    objectName.id = 'object-name';
    objectName.textContent = theData[i].name;
    elementDetailsDiv.appendChild(objectName);

    var objectDetails = document.createElement('ul');
    elementDetailsDiv.appendChild(objectDetails);

    var objectSeller = document.createElement('li');
    objectSeller.textContent = 'Seller: ' + theData[i].seller;
    objectDetails.appendChild(objectSeller);

    var objectCost = document.createElement('li');
    objectCost.textContent = 'Price: ' + theData[i].price;
    objectDetails.appendChild(objectCost);

    var dataElements = document.getElementById('data-elements'); //created reference to where each dataElement will be appended to.
    dataElements.appendChild(dataElement);
  }
}

//Search Engine
theSearchButton.addEventListener('click', search);
function search() {
  var searchString = document.getElementById('search-string').value; //get user search string
  var searchString = searchString.toLowerCase();
  for (var i=0; i<theData.length; i++) { //indexes through objects in theData array. FIX!
    for (var property in theData[i]) { //indexes through each property of each data array object.
      var propertyString = theData[i][property].toString();
      var propertyString = propertyString.toLowerCase();
      if (searchString.indexOf(propertyString) !== -1) {
        console.log('found match in object # ' + i); break;
      }
      if (propertyString.indexOf(searchString) !== -1){
        console.log('found match in object # ' + i); break;
      }
    }
  }
}
