//GLOBAL VARIABLES//
var theData = JSON.parse(data); //parses JSON string data to javascript objects.
var cart = []; //creates the cart[] array and assigns a reference to it.
var order = {};
var orders = []; //creates the object that will store the order summary detatils for use upon checkout.

//FUNCTIONS//
//product(item) takes an argument 'item', which is object from theData, and builds a DOM object which displays content about that item, and returns a reference to that newly built DOM element.
function product(item) {
  //creates a parent <div> to be a container for the item:
  var productElement = document.createElement('div');
  productElement.classList.add('data-element');
  //sets up sub-container <div>s to organize the display content of the item:
  var elementImageDiv = document.createElement('div');
  elementImageDiv.classList.add('product-images');
  productElement.appendChild(elementImageDiv);
  var elementDetailsDiv = document.createElement('div');
  elementDetailsDiv.classList.add('product-details');
  productElement.appendChild(elementDetailsDiv);
  //creates the add-to-cart button:
  var cartButton = document.createElement('button');
  cartButton.className = 'fa fa-cart-plus fa-2x added add-to-cart item-identifier-' + (item.id-1); //stores item identifier as a class in the element, to be referenced for the addToCart feature.
  cartButton.id = 'add-to-cart-button';
  productElement.appendChild(cartButton);
  //creates elements that display the item content:
  var productImage = document.createElement('img');
  productImage.src = item.image;
  elementImageDiv.appendChild(productImage);
  var productName = document.createElement('span');
  productName.classList.add('product-name');
  productName.textContent = item.name;
  elementDetailsDiv.appendChild(productName);
  var productDescription = document.createElement('p');
  productDescription.classList.add('product-description');
  productDescription.textContent = item.description;
  elementDetailsDiv.appendChild(productDescription);
  var productDetails = document.createElement('ul');
  elementDetailsDiv.appendChild(productDetails);
  var productSeller = document.createElement('li');
  productSeller.textContent = 'Seller: ' + item.seller;
  productDetails.appendChild(productSeller);
  var productCost = document.createElement('li');
  productCost.textContent = 'Price: ' + item.price;
  productDetails.appendChild(productCost);
  //returns the reference to the assembled DOM object that represents an item:
  return productElement;
}

//search() takes 'update' (type:boolean) as an argument, uses the user search string value, and runs a simple string match operation. Returns searchMatches array:
function search(update) {
  //toggles visibilities:
  var activeViews = document.getElementsByClassName('active');
  for (var i=0; i<activeViews.length; i++) {
    if (activeViews[i].id !== 'product-list') {
      toggleVisibility(activeViews[i].id);
    }
  }
  if (document.getElementById('product-list').classList.contains('hidden')) {
    toggleVisibility('product-list');
  }

  //first clears the current products from the DOM
  if (update === true) {
    clearResults();
  }
  var searchString = document.getElementById('search-string').value; //get user search string
  var searchString = searchString.toLowerCase();//makes string lowerecase
  var searchMatches = []; // creates an array that contains 'theData' object indicies of matches identified by search().
  for (var i=0; i<theData.length; i++) { //indexes through objects in theData array.
    for (var property in theData[i]) { //indexes through each property of each data array object.
      if (property !== 'image') {
        var propertyString = theData[i][property].toString();
        var propertyString = propertyString.toLowerCase(); //makes string lowercase.
        if (searchString.indexOf(propertyString) !== -1) {
          searchMatches = match(i, searchMatches); //store index of the object that matches.
        }
        if (propertyString.indexOf(searchString) !== -1){
          searchMatches = match(i, searchMatches); //store index of the object that matches.
        }
      }
    }
  }
  if(update === true) {
    updateResults(searchMatches); //calls updateResults() to update the DOM with the search results.
  }
  return searchMatches;
}

//takes index[a number] and searchMatches[an array], and builds/adds-to searchMatches[] array, then returns the updated searchMatches[] array:
function match(index, searchMatches) {
  //first checks if match is already stored in the array:
  for (var i=0; i<searchMatches.length; i++) {
    if(searchMatches[i] === index) {
      return searchMatches; //checks for matches, and if a match is found, breaks out of the match function without doing anything to searchMatches.
    }
  }
  searchMatches.push(index); //otherwise, appends index to the end of searchMatches[].
  return searchMatches;
}

//updateResults(searchMatches) takes searchMatches[an array] as an argument and appends items that match search string to the DOM:
function updateResults(searchMatches) {
  for (var i=0; i<searchMatches.length; i++) {
    productList.appendChild(product(theData[searchMatches[i]]));
  }
}

//Clear elements from the DOM:
function clearResults() {
  var productList = document.getElementById('product-list');
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }
}

//updates the qty in the cart icon on the navbar;
function updateCartIcon(qty) {
  cartQty = document.getElementById('cart-qty');
  cartQty.textContent = qty;
}

//addCartElement() takes item[an object] and qty[a number] assembles a DOM object for each product and returns a referemce to that object:
function addCartElement(item, qty) {
  var product = document.createElement('div');// created a parent <div> for each data object;
  product.classList.add('data-element');

  //sets up columns of each searchResultElement.
  var productImageDiv = document.createElement('div');
  productImageDiv.classList.add('product-images');
  product.appendChild(productImageDiv);

  var productDetailsDiv = document.createElement('div');
  productDetailsDiv.classList.add('product-details');
  product.appendChild(productDetailsDiv);

  var cartButton = document.createElement('button');
  cartButton.className = 'fa fa-remove added ' + 'item-identifier-' + (item.id-1); //stores item identifier as a class in the product, to be referenced for the addToCart feature.
  cartButton.classList.add('remove-from-cart');
  cartButton.id = 'remove-from-cart-button';
  cartButton.textContent = ' remove';
  product.appendChild(cartButton);

  var cartQty = document.createElement('span');
  cartQty.classList.add('item-qty');
  cartQty.textContent = 'QTY: ' + qty;
  product.appendChild(cartQty);

  var productImage = document.createElement('img');
  productImage.src = item.image;
  productImageDiv.appendChild(productImage);

  var productName = document.createElement('span');
  productName.classList.add('product-name');
  productName.textContent = item.name;
  productDetailsDiv.appendChild(productName);

  var productDescription = document.createElement('p');
  productDescription.classList.add('product-description');
  productDescription.textContent = item.description;
  productDetailsDiv.appendChild(productDescription);

  var productDetails = document.createElement('ul');
  productDetailsDiv.appendChild(productDetails);

  var productSeller = document.createElement('li');
  productSeller.textContent = 'Seller: ' + item.seller;
  productDetails.appendChild(productSeller);

  var productCost = document.createElement('li');
  productCost.textContent = 'Price: ' + item.price;
  productDetails.appendChild(productCost);

  return product;
}

function goToCart() { //this function deletes the obsolete content of the cart, then takes the user to the current cart.
  //step 1: toggles visibility.
  var active = document.getElementsByClassName('active');
  var activeElementIds = [];
  for (var i=0; i<active.length; i++) {
    activeElementIds[i] = active[i].id;
  }
  for (var i=0; i<activeElementIds.length; i++) {
    toggleVisibility(activeElementIds[i]);
  }
  if (document.getElementById('my-cart').classList.contains('hidden')) {
    toggleVisibility('my-cart');
  }

  //step-2: removes all obsolete cart items.
  while(document.getElementById('cart-items').firstChild) {
    document.getElementById('cart-items').removeChild(document.getElementById('cart-items').firstChild);
  }

  //step 3: populates the cart in the DOM with updated items.
  var cartItems = document.getElementById('cart-items');
  for(var i=0; i<cart.length; i++) {
    var cartItem = addCartElement(theData[parseInt(cart[i].itemId)], cart[i].qty);
    cartItems.appendChild(cartItem);
  }

  //step-4: removes all obsolete cart summary details.
  while(document.getElementById('cart-summary').children[1]) {
    var redundant = document.getElementById('cart-summary').children[1];
    redundant.parentNode.removeChild(redundant);
  }

  updateOrderSummary(); //step 5: updates the order summary in the cart view.

  //Runs if user clicks Checkout button:
  document.getElementById('checkout-button').addEventListener('click', toCheckout);

  //Listens for clicks to remove items from cart:
  var itemsInCart = document.querySelectorAll('button.remove-from-cart');
  for (var i=0; i<itemsInCart.length; i++) {
    itemsInCart[i].addEventListener('click', removeItem);
  }
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
  //Toggles Visibility to show only the main content:
  var active = document.getElementsByClassName('active');
  var activeElementIds = [];
  for (var i=0; i<active.length; i++) {
    activeElementIds[i] = active[i].id;
  }
  for (var i=0; i<activeElementIds.length; i++) {
    toggleVisibility(activeElementIds[i]);
  }
  if (document.getElementById('product-list').classList.contains('hidden')) {
    toggleVisibility('product-list');
  }

  clearResults();

  for (var i=0; i<theData.length; i++) {
    productList.appendChild(product(theData[i]));
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

  //Updates statement after an item is removed from the cart:
  for (var i=0; i < cart.length; i++) {
    if (cart[i].itemId === dataObjectIndex) {
      var qtyItemInCart = cart[cartIndex].qty;
      statement.textContent = 'Qty ' + qtyItemInCart + ' of item added to cart.';
      qtyAdded.appendChild(statement);
      event.target.parentNode.appendChild(qtyAdded);
    }
  }
}

function itemToCart(event) {
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
        lightCartButton(dataObjectIndex); //changes color of addToCart button to green.
        updateCartIcon(getQty()); //updates the cart icon with the number of items in currently in the cart.

        addStatement(dataObjectIndex); //displays to user qty of a particular item that is currently in their cart.

        return; //exit the function.
      }
    }

    var newCartItem = {}; //otherwise makes a new cart object for the item...
    newCartItem.itemId = dataObjectIndex; //...gives it new properties...
    newCartItem.qty = 1;
    cart.push(newCartItem); //...and appends the object to the end of the cart array.
    lightCartButton(dataObjectIndex); //changes color of addToCart button to green.
    updateCartIcon(getQty()); //updates the cart icon with the number of items in currently in the cart.
  }

  addStatement(dataObjectIndex); //displays to user qty of a particular item that is currently in their cart.
}

//gets the quantity of items in the cart.
function getQty() {
  var cartQty = 0;
  for (i=0; i<cart.length; i++) {
    cartQty = cartQty += parseInt(cart[i].qty);
  }
  return cartQty;
}

//changes addToCart button to green when user adds something to his/her cart by giving it a new class:
function lightCartButton(itemId) {
  target = event.target;
  if ((target.classList.contains('item-identifier-' + itemId)) && (!target.classList.contains('item-added')) ) {
    target.className += ' item-added';
  }
}

function removeItem(event) {
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
    //removes the class 'item-added'now that item is no longer in the cart:
    var productCartButton = document.getElementsByClassName('item-identifier-' + itemId);
    productCartButton[0].classList.remove('item-added');
    addStatement(parseInt(itemId)); //updates the statement of particular item qty in cart.
  }

  //updates the cart icon in the navbar to reflect the remeoved item.
  updateCartIcon(getQty());
  //deletes the statement for that product, since it is now obsolete:
  var dataElement = document.getElementsByClassName('item-identifier-' + itemId)[0].parentNode;
  if (dataElement.lastChild.id === 'item-qty-added-to-cart') {
    dataElement.removeChild(dataElement.lastChild);
  }

  //re-loads the cart page.
  goToCart();
}

function toCheckout() {
  //displays order summary details:
  document.getElementById('items-of-order').textContent = order.numberItemsOrdered + ' items';
  document.getElementById('subtotal-of-order').textContent = '$' + order.subtotal;
  document.getElementById('tax-of-order').textContent = '$' + order.tax;
  document.getElementById('shipping-of-order').textContent = 'FREE';
  document.getElementById('total-of-order').textContent = '$' + order.total;
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
      opacity += .02;
      checkoutPage.style.backgroundColor = 'rgba(40,44,52,' + opacity + ')';
    }
  }

}

function showMenu() {
  //Toggles Visibility to display the menu below the navbar:
  toggleVisibility('menu-bar');
}

function lightPath(event) {
  event.target.classList.add('lit');
}

function unLightPath(event) {
  event.target.classList.remove('lit');
}

function followPath(event) {
  if(event.target.textContent === 'Main') {
    goToMain();
  }
  if(event.target.textContent === 'My Cart') {
    goToCart();
  }
  if(event.target.textContent === 'Order History') {
    displayOrderHistory();
  }
}

function placeOrder() {
  //gathers details about the order:
  var recentOrder = {
    orderNumber: orders.length + 1,
    numberItemsOrdered: document.getElementById('items-of-order').textContent,
    itemsOrdered: cart,
    subtotal: document.getElementById('subtotal-of-order').textContent,
    tax: document.getElementById('tax-of-order').textContent,
    shipping: document.getElementById('shipping-of-order').textContent,
    total: document.getElementById('total-of-order').textContent
  }
  //stores details about placed order in orders[]:
  orders.push(recentOrder);
  //initializes order{} object:
  order = {
    numberItemsOrdered: 0,
    subtotal: 0,
    tax: 0,
    total: 0
  }
  //clears cart:
  cart = [];
  //resets form fields
  document.getElementById('order-form').reset();
  //re-initializes cart icon:
  updateCartIcon(0);
  //unlights all the add-to-cart buttons:
  var clearCartAssociations = document.getElementsByClassName('item-added');
  var length = clearCartAssociations.length;
  for (i=0; i<length; i++) {
    clearCartAssociations[0].classList.remove('item-added');
  }
  //redirects
  goToMain();
}

function searchResultsPreview(searchMatches) {
  //Clears current search preview DOM object if one was created:
  if (document.getElementById('preview-container')) {
    var previewContainer = document.getElementById('preview-container');
    previewContainer.parentNode.removeChild(previewContainer);
  }
  //Creates DOM element and appends to the body:
  var previewContainer = document.createElement('div');
  previewContainer.classList.add('active');
  previewContainer.id = 'preview-container';
  var proTip = document.createElement('div');
  proTip.textContent = 'press <ESC> to close.';
  previewContainer.appendChild(proTip);
  proTip.style.fontSize = '1.2vmin';
  proTip.style.padding = '.5vmin';
  proTip.style.fontFamily = 'italic';
  proTip.style.textAlign = 'center';
  proTip.style.backgroundColor = 'gray';
  proTip.style.color = 'white';
  for (var i=0; i<searchMatches.length; i++) {
    var searchMatch = document.createElement('div');
    searchMatch.classList.add('search-match');
    searchMatch.textContent = theData[searchMatches[i]].name;
    searchMatch.id = 'preview-item-' + (theData[searchMatches[i]].id-1);
    previewContainer.appendChild(searchMatch);
  }
  document.body.insertBefore(previewContainer, document.body.children[document.body.children.length-2]);

  //deletes previewContainer after user's mouse leaves the container:
  mouseOverCount = 0;
  previewContainer.addEventListener('mouseover', function() {
    mouseOverCount++;
  });
  //allows user to escape out of search preview:
  if (event.keyCode === 27) {
      previewContainer.parentNode.removeChild(previewContainer);
  }
}

function displayOrderHistory() {
  var active = document.getElementsByClassName('active');
  var activeElementIds = [];
  for (var i=0; i<active.length; i++) {
    activeElementIds[i] = active[i].id;
  }
  for (var i=0; i<activeElementIds.length; i++) {
    toggleVisibility(activeElementIds[i]);
  }
  if (document.getElementById('order-history-container').classList.contains('hidden')) {
    toggleVisibility('order-history-container');
  }
}

function chooseSearchListOption (listClassName) {
  var list = document.getElementsByClassName(listClassName);
  //this for loop adds event listeners to the individual list options:
  for(var i=0; i<list.length; i++) {
    list[i].addEventListener('mouseover', function() {
      lightPath(event);
    });
    list[i].addEventListener('mouseout', function() {
      unLightPath(event);
    });
    list[i].addEventListener('click', function() {
      var previewItemIndex = event.target.id.split('-');
      var theDataIndex = previewItemIndex[2];
      var viewThisProduct = product(theData[theDataIndex]);
      clearResults();
      document.getElementById('product-list').appendChild(viewThisProduct);
      var previewContainer = document.getElementById('preview-container');
      previewContainer.parentNode.removeChild(previewContainer);
    });
  }
  if (document.getElementById('preview-container')) {
    document.getElementById('preview-container').addEventListener('mouseleave', function() {
      document.body.removeChild(document.getElementById('preview-container'));
    });
  }
}

//EVENT LISTENERS//
document.getElementById('search').addEventListener('click', function () {
  if (document.getElementById('preview-container')) {
    document.body.removeChild(document.getElementById('preview-container'));
  }
  search(true);
});
//This event listener initiates the search when the enter key is pressed during user input of the search bar:
document.getElementById('search-string').addEventListener('keyup', function (event) {
  var searchMatches = search(false);
  searchResultsPreview(searchMatches);
  chooseSearchListOption('search-match');
  event.preventDefault();
  if (event.keyCode === 13) {
    search(true);
    if (document.getElementById('preview-container')) {
      document.body.removeChild(document.getElementById('preview-container'));
    }
  }
});
document.getElementById('view-cart').addEventListener('click', goToCart);
document.getElementById('logo').addEventListener('click', goToMain);
document.getElementById('product-list').addEventListener('click', itemToCart);
document.getElementById('menu-icon').addEventListener('click', showMenu);
document.getElementById('place-order').addEventListener('click', placeOrder);
//this for loop adds event listeners to the menu paths:
for(var i=0; i<document.getElementsByClassName('menu-path').length; i++) {
  document.getElementsByClassName('menu-path')[i].addEventListener('mouseover', lightPath);
  document.getElementsByClassName('menu-path')[i].addEventListener('mouseout', unLightPath);
  document.getElementsByClassName('menu-path')[i].addEventListener('click', followPath);
}

//ON PAGE LOAD
//Initially, upon page load, adds all the theData objects on the DOM main page:
var productList = document.getElementById('product-list');
for (var i=0; i<theData.length; i++) {
  productList.appendChild(product(theData[i]));
}
