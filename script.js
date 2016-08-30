var theSearchButton = document.getElementById('search');
var theData = JSON.parse(data);

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
