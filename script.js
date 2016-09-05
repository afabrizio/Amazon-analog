//GLOBAL VARIABLES
var theSearchButton = document.getElementById('search');
var theData = JSON.parse(data); //parses JSON string data to javascript objects.
var searchMatches = []; // an array that contains 'theData' object indicies of matches identified by search().
var cart = []; //creates the cart, which is an array of objects, each with two properties, item & item_qty.
var order = {}; //creates the object that will store the order summary detatils for use upon checkout.

//FUNCTIONS
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

//this function populates the cart one item at a time.
function addCartElement(index, cartIndex) {
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
  cartButton.className = 'fa fa-remove added ' + 'item-identifier-' + index.toString(); //stores item identifier as a class in the element, to be referenced for the addToCart feature.
  cartButton.id = 'remove-from-cart';
  cartButton.textContent = ' remove';
  dataElement.appendChild(cartButton);

  var cartQty = document.createElement('span');
  cartQty.id = 'item-qty';
  cartQty.textContent = 'QTY: ' + cart[cartIndex].qty;
  dataElement.appendChild(cartQty);

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

  var cartItems = document.getElementById('cart-items'); //created reference to where each dataElement will be appended to.
  cartItems.appendChild(dataElement);
}

function goToCart() { //this function deletes the obsolete content of the cart, then takes the user to the current cart.
   //step 1: toggles visibility.
   if (document.getElementById('my-cart').classList.contains('active')){ //if cart is already visible do nothing.
   }
   if (document.getElementById('my-cart').classList.contains('hidden')){ //if cart is hidden, make it visible.
     toggleVisibility('my-cart');
   }
   if (document.getElementById('checkout-container').classList.contains('active')) {
     toggleVisibility('checkout-container');
   }
   if (document.getElementById('data-elements').classList.contains('active')){ //hides the main page if it is visible.
     toggleVisibility('data-elements');
   }

  //step-2: removes all obsolete cart items.
  while(document.getElementById('cart-items').firstChild) {
    document.getElementById('cart-items').removeChild(document.getElementById('cart-items').firstChild);
  }

  //step 3: populates the cart in the DOM with updated items.
  for(var i=0; i<cart.length; i++) {
    addCartElement(parseInt(cart[i].itemId), i);
  }

  //step-4: removes all obsolete cart summary details.
  while(document.getElementById('cart-summary').children[1]) {
    var redundant = document.getElementById('cart-summary').children[1];
    redundant.parentNode.removeChild(redundant);
  }

  updateOrderSummary(); //step 5: updates the order summary in the cart view.

//document.getElementById('remove-from-cart').addEventListener('click', removeItem); //BUG: multiple elments with this id, only listens to the first one.

  //Runs if user clicks Checkout button:
  document.getElementById('checkout-button').addEventListener('click', toCheckout);
}

function swapVisibility(hide, activate) {//swapVisibility() takes two string arguments, which are the IDs of the elements in which visibility states will be toggled:
  var hideElement = document.getElementById(hide);
  toggleVisibility(hide);
  var activateElement = document.getElementById(activate);
  toggleVisibility(activate);
}

function toggleVisibility(toggleId) {
  var toggleElement = document.getElementById(toggleId);
  if (toggleElement.classList.contains('active')) {
    toggleElement.classList.remove('active');
    toggleElement.classList.add('hidden');
    return;
  }
  if (toggleElement.classList.contains('hidden')) {
    toggleElement.classList.remove('hidden');
    toggleElement.classList.add('active');
    return;
  }
}

function goToMain() {
  if (document.getElementById('my-cart').classList.contains('active')){ //hides the cart if it is showing.
    toggleVisibility('my-cart');
  }
  if (document.getElementById('checkout-container').classList.contains('active')) {
    toggleVisibility('checkout-container');
  }
  if (document.getElementById('data-elements').classList.contains('hidden')){ //shows the main page data if it is hidden.
    toggleVisibility('data-elements');
  }
  for (var i=0; i<theData.length; i++) {
    addDataElement(i);
  }
}

function getOrderSubtotal() {
  var sum = 0; //initializes the value of sum.
  for (var i=0; i<cart.length; i++) { //loops through the cart items.
    var id = parseInt(cart[i].itemId); //gets the item id of the cart-item as a number.
    var price = theData[id].price; //price is a string in the format $0.00
    price = price.replace('$',''); //gets rid of the $ character.
    price = Number(price);
    sum += price;
    if (cart[i].qty > 1) { //accounts for qty>1 of a particular item:
      var qty = cart[i].qty; //qty of item.
      sum = sum + (price*(qty-1));
    }
  }
  return sum;
}

function updateOrderSummary() {
  //updates the Order Summary:
  var orderDetails = document.createElement('div');
  orderDetails.id = 'order-details';
  var numberOrderItems = document.createElement('span');
  numberOrderItems.textContent = 'Items Ordered: ' + getQty();
  orderDetails.appendChild(numberOrderItems);
  var orderSubtotal = document.createElement('span');
  orderSubtotal.textContent = 'Subtotal: $' + getOrderSubtotal().toFixed(2); //toFixed(2) truncates excess decimals.
  orderDetails.appendChild(orderSubtotal);
  var tax = document.createElement('span');
  tax.textContent = 'Tax: $' + (.075*getOrderSubtotal()).toFixed(2);
  orderDetails.appendChild(tax);
  var orderTotal = document.createElement('span');
  orderTotal.textContent = 'Order Total: $' + (1.075*getOrderSubtotal()).toFixed(2);
  orderDetails.appendChild(orderTotal);

  //Creates the Order Summary Checkout button:
  var checkout = document.createElement('button');
  checkout.id = 'checkout-button';
  checkout.textContent = 'checkout';
  orderDetails.appendChild(checkout);

  var orderSummary = document.getElementById('cart-summary');
  orderSummary.appendChild(orderDetails); //appends the order details to the Order Summary <div>.

  //updates the orderSummary{} object:
  order.numberItemsOrdered = getQty();
  order.subtotal = getOrderSubtotal().toFixed(2);
  order.tax = (.075*getOrderSubtotal()).toFixed(2);
  order.total = (1.075*getOrderSubtotal()).toFixed(2);
}

function garbage(elementId) { //expects a string as the parameter.
  var deleteMe = document.getElementById(elementId);
  var parent = deleteMe.parentNode;
  parent.removeChild(deleteMe);
}

function addStatement(dataObjectIndex) { //adds statement with qty of specific item added that is in the cart:
  if (event.target.parentNode.lastChild.id === 'item-qty-added-to-cart') { //delete obsolete version of this statement.
    event.target.parentNode.removeChild(event.target.parentNode.lastChild);
  }
  var qtyAdded = document.createElement('div');
  qtyAdded.id = 'item-qty-added-to-cart';
  var statement = document.createElement('span');

  //loops through the cart to identify the cart[] index that correlates to the theData[] index for the item of interest:
  for (var a=0; a<cart.length; a++) {
    if (cart[a].itemId === dataObjectIndex){
      var cartIndex = a; //cartIndex is the index of the item in the cart[] that needs the statement modified.
      break;
    }
  }
  var qtyItemInCart = cart[cartIndex].qty;
  statement.textContent = 'Qty ' + qtyItemInCart + ' of item added to cart.';
  qtyAdded.appendChild(statement);
  event.target.parentNode.appendChild(qtyAdded);
}

function itemToCart() {
  if (event.target.type === 'submit') { //this conditional checks if the event.target is an addToCart button:

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

        addStatement(dataObjectIndex); //displays to user qty of a particular item that is currently in their cart.

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

  //changes addToCart button to green when user adds something to his/her cart by giving it a new class:
  function CartButtonToGreen(itemId) {
    target = event.target;
    if ((target.classList.contains('item-identifier-' + itemId)) && (!target.classList.contains('item-added')) ) {
      target.className += ' item-added';
    }
  }

  addStatement(dataObjectIndex); //displays to user qty of a particular item that is currently in their cart.
}

function removeItem() {
  console.log('removing item...');
  //gets the theData[] index of the product to be subtracted from the cart:
  for(var i=0; i<event.target.classList.length; i++) {
    if (event.target.classList[i].indexOf('item-identifier') !== -1) {
      var itemId = event.target.classList[i].split('-');
      var itemId = itemId[2];
      break;
    }
  }
  //loops through the cart to identify the cart[] index that correlates to the theData[] itemId for the item to be removed:
  for (var a=0; a<cart.length; a++) {
    if (cart[a].itemId === itemId){
      var cartIndex = a; //cartIndex is the index of the item in the cart[] that needs the statement modified.
      break;
    }
  }
  cart[a].qty = cart[a].qty - 1; //subtract qty from the cart[].qty value.
  if (cart[a].qty === 0) { //if item qty becomes 0:
    cart.splice(a,1); //removes the item from the cart[] array.
    //addStatement(parseInt(itemId)); //updates the statement of particular item qty in cart.
    //reverses color of addToCart button.
  }
  updateCartIcon(getQty()); //updates the cart icon in the navbar to reflect the remeoved item.
  goToCart();  //re-load the cart page.
  //reverses color of addToCart button.
}

function toCheckout() {
  //modifies visibile content:
  swapVisibility('my-cart', 'checkout-container');

  var checkoutPage = document.getElementById('checkout-page');
  var opacity = 0;
  var id = setInterval(frame, 5);

  function frame() {
    if (opacity >= 1) {
      clearInterval(id);
      return;
    }
    else{
      opacity += .01;
      checkoutPage.style.backgroundColor = 'rgba(40,44,52,' + opacity + ')';
    }
  }
}


//EVENT LISTENERS
/* ------Search feature: ------ */
theSearchButton.addEventListener('click', search);
/* ------View Cart Feature------ */
document.getElementById('view-cart').addEventListener('click', goToCart);
document.getElementById('logo').addEventListener('click', goToMain);
//Listens for an addToCart click:
document.getElementById('data-elements').addEventListener('click', itemToCart);

//ON PAGE LOAD
//Initially, upon page load, adds all the theData objects on the DOM:
for (var i=0; i<theData.length; i++) {
  addDataElement(i);
}
