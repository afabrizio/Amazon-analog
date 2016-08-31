var theSearchButton = document.getElementById('search');
var theData = JSON.parse(data); //parses JSON string data to javascript objects.
var searchMatches = []; // an array that contains 'theData' object indicies of matches identified by search().

//Initially, upon page load, adds all the theData objects on the DOM:
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
  var cartButton = document.createElement('button');
  cartButton.id = 'add-to-cart';
  cartButton.className = 'fa fa-cart-plus fa-2x added ' + 'item-identifier-' + index.toString(); //stores item identifier as a class in the element, to be referenced for the addToCart feature.
  dataElement.appendChild(cartButton);

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

/* ------Search feature: ------ */
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

/* ------Add to Cart feature: ------ */
var cart = [];//creates the cart, which is an array of objects, each with two properties, item & item_qty.

//Listens for an addToCart click, shows object that fired the event.
document.getElementById('data-elements').addEventListener('click', function() {
  if (event.target.type === 'submit') {//this conditional checks if the event.target is an addToCart button:
    var classNames = event.target.className;
    var classNames = classNames.split(' ');
    for (var i=0; i<classNames.length; i++) { //loops through all the classes...
      if (classNames[i].indexOf('item-identifier') !== -1) { //checks for an item-identifier class
        var itemIdentifier = classNames[i];
        var dataObjectIndex = itemIdentifier.split('-');
        var dataObjectIndex = dataObjectIndex[2]; //saves the object index of the item that was added to the cart.
      }
    }
    //This code creates/modifies the cart[] objects as appropriate:
    for (var i=0; i<cart.length; i++) { //loops through cart to check if item already exists in cart:
      if(cart[i].itemId === dataObjectIndex) { //if item already is in the cart...
        cart[i].qty += 1; //...increment the qty.
        CartButtonToGreen(dataObjectIndex); //changes color of addToCart button to green.
        updateCartIcon(getQty()); //updates the cart icon with the number of items in currently in the cart.
        return; //exit the function.
      }
    }
    var newCartItem = {}; //otherwise makes a new cart object for the item...
    newCartItem.itemId = dataObjectIndex; //...gives it new properties...
    newCartItem.qty = 1;
    cart.push(newCartItem); //...and appends the object to the end of the cart array.
    CartButtonToGreen(dataObjectIndex); //changes color of addToCart button to green.
    updateCartIcon(getQty()); //updates the cart icon with the number of items in currently in the cart.
  }
  //changes addToCart button to green when user adds something to his/her cart.
  function CartButtonToGreen(itemId) {
    target = event.target;
    if (target.classList.contains('item-identifier-' + itemId)){
      target.className += ' item-added';
    }
  }
});

//gets the quantity of items in the cart.
function getQty() {
  var cartQty = 0;
  for (i=0; i<cart.length; i++) {
    cartQty = cartQty += parseInt(cart[i].qty);
  }
  return cartQty;
}

//updates the qty in the cart icon on the navbar;
function updateCartIcon(qty) {
  cartQty = document.getElementById('view-cart');
  cartQty.textContent = ' ' + qty;
}
