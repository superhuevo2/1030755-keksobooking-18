'use strict';
// константы
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CORRECT_PIN_X = 25;
var CORRECT_PIN_Y = 40;
var KEY_ENTER_CODE = 13;

// функции
/**
 * generate random integer.
 * @param {number} first the first number from a range; must be >=0.
 * @param {number} last the last number from a range; must be >=0.
 * @return {number} a random number within the range.
 */
function genRandom(first, last) {
  return first + Math.floor(Math.random() * (last - first + 1)); // прибавил единицу, чтоб last было включено в рендж, из которого берется случайное число
}

/**
 * select an element from an array
 * @param {array} arr an array from which an element will be selected.
 * @return {*} selected element
 */
function selectFrom(arr) {
  return arr[genRandom(0, arr.length - 1)];
}

/**
 * finds whether there is a feature in a fearureList
 * @param {ArrayLike} featureList
 * @param {String} feature
 * @return {Boolean} true or false
 */
function isFeatureInList(featureList, feature) {
  var counter = 0;
  var arr = Array.prototype.slice.call(featureList);

  while (feature.className.indexOf(arr[counter]) < 0) {
    counter += 1;
    if (counter === arr.length) {
      return false;
    }
  }
  return true;
}


/**
 * generate a list of links to images.
 * @return {array} a list of links to images.
 */
function genAvatar() {
  var avatar = [];

  while (avatar.length < 8) {
    var element = 'img/avatars/user0' + genRandom(1, 8) + '.png';
    if (avatar.indexOf(element) === -1) {
      avatar.push(element);
    }
  }
  return avatar;
}

/**
 *generate a list of links
 * @return {array} a list of photos' links
 */
function genPhotoLink() {
  var arr = [];
  var arrLength = genRandom(1, 6);

  for (var i = 0; i < arrLength; i++) {
    var element = 'http://o0.github.io/assets/images/tokyo/hotel' + genRandom(1, 3) + '.jpg';
    arr.push(element);
  }
  return arr;
}

/**
 * generate random string
 * @param {number} quantity quantity of words which function returned
 * @return {string} generated string
 */
function genString(quantity) {
  var alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  var letter = '';

  for (var i = 0; i < quantity; i++) {
    var word = '';
    var wordLength = genRandom(4, 10);
    for (var l = 0; l < wordLength; l++) {
      word += alphabet[genRandom(0, alphabet.length - 1)];
    }
    if (l !== quantity - 1) {
      word += ' ';
    }
    letter += word;
  }
  return letter;
}

/**
 * generate a fragment of DOM's elements from an element
 * @param {Object} element
 * @param {Array} linksList
 * @return {Object} fragment of elements
 */
function genPhotoEl(element, linksList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < linksList.length; i++) {
    var newElement = element.cloneNode(true);
    newElement.setAttribute('src', linksList[i]);
    fragment.appendChild(newElement);
  }
  return fragment;
}


/**
 * to convert a type from a readable form
 * @param {string} type
 * @return {string}
 */
function defineTypeOfHouse(type) {
  var container = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };
  return container[type] || 'Неизвестный тип';
}


/**
 * remove elements from objFrom if those elements dont exist in objectList
 * @param {Object} objFrom
 * @param {ArrayLike} objectList a list of appropriate elements
 * @param {Function} determinant define is an element appropriate or not
 */
function removeRedundantObjects(objFrom, objectList, determinant) {

  for (var i = objFrom.children.length - 1; i >= 0; i--) {
    if (!determinant(objectList, objFrom.children[i])) {
      objFrom.removeChild(objFrom.children[i]);
    }
  }
}


/**
 * generate a list of 8 advertisements.
 * @return {array} a list of generated advertisements.
 */
function generateAdList() {
  var avatar = [];
  avatar.push.apply(avatar, genAvatar());
  var maxWidth = document.querySelector('.map').offsetWidth;
  var adList = [];

  for (var i = 0; i < 8; i++) {
    var ad = {};

    ad['author'] = {
      'avatar': avatar.pop(),
    };

    ad['location'] = {
      'x': genRandom(0, maxWidth),
      'y': genRandom(130, 630)
    };

    ad['offer'] = {
      'title': genString(genRandom(1, 3)),
      'address': String(ad.location.x) + ', ' + String(ad.location.y),
      'price': genRandom(1000, 10000),
      'type': selectFrom(TYPES),
      'rooms': genRandom(1, 5),
      'guests': genRandom(1, 10),
      'checkin': selectFrom(TIMES),
      'checkout': selectFrom(TIMES),
      'features': [].concat(FEATURES.slice(0, genRandom(0, FEATURES.length))),
      'description': genString(genRandom(8, 15)),
      'photos': genPhotoLink()
    };
    adList.push(ad);
  }
  return adList;
}

/**
 * create card which contain information about an offer
 * @param {*} template
 * @param {*} adObj
 * @return {Object} document.fragment obj of rent offer
 */
function createCard(template, adObj) {
  var element = template.cloneNode(true);

  var title = element.querySelector('.popup__title');
  var address = element.querySelector(' .popup__text--address');
  var price = element.querySelector('.popup__text--price');
  var type = element.querySelector('.popup__type');
  var capacity = element.querySelector('.popup__text--capacity');
  var time = element.querySelector('.popup__text--time');
  var featuresList = element.querySelector('.popup__features');
  var description = element.querySelector('.popup__description');
  var photos = element.querySelector('.popup__photos');
  var avatar = element.querySelector('.popup__avatar');

  title.textContent = adObj.offer.title;
  address.textContent = adObj.offer.address;
  price.textContent = adObj.offer.price + '₽/ночь';
  type.textContent = defineTypeOfHouse(adObj.offer.type);
  capacity.textContent = adObj.offer.rooms + ' комнаты для '
      + adObj.offer.guests + ' гостей';
  time.textContent = 'Заезд после ' + adObj.offer.checkin
      + ', выезд до ' + adObj.offer.checkout;

  removeRedundantObjects(featuresList, adObj.offer.features, isFeatureInList);
  description.textContent = adObj.offer.description;
  photos.appendChild(genPhotoEl(photos.firstElementChild, adObj.offer.photos));
  photos.removeChild(photos.firstElementChild);
  avatar.setAttribute('src', adObj.author.avatar);

  return element;
}

/**
 * make element active
 * @param {*} element
 */
function removeDisabledAttr(element) {
  element.removeAttribute('disabled');
}

/**
 * create a document fragment from template and data.
 * @param {object} template a template for copying.
 * @param {array} objList a list from wich data is written.
 * @return {object} a fragment of DOM.
 */
function makePins(template, objList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objList.length; i++) {
    var element = template.cloneNode(true);
    var image = element.querySelector('img');
    element.style.top = (objList[i].location.y - CORRECT_PIN_Y) + 'px';
    element.style.left = (objList[i].location.x - CORRECT_PIN_X) + 'px';
    image.setAttribute('src', objList[i].author.avatar);
    image.setAttribute('alt', objList[i].offer.title);

    fragment.appendChild(element);
  }
  return fragment;
}


function pinClickHandler() {
  mapField.insertBefore(createCard(cardTemplate, adList[0]), filterContainer);
}

/**
 * synchronise value between objects
 * @param {String} value
 * @param {object} target
 */
function synchroniseValue(value, target) {
  for (var i = 0; i < target.options.length; i++) {
    if (target.options[i].value === value) {
      target.options[i].selected = true;
    }
  }
}

/**
 * synchronise timeIn and timeOut by click on timeIn
 * @param {*} evt
 */
function timeInClickHandler(evt) {
  var timeInValue = evt.target.value;
  var timeOut = document.querySelector('#timeout');
  synchroniseValue(timeInValue, timeOut);
}

/**
 * synchronise timeIn and timeOut by click on timeOut
 * @param {*} evt
 */
function timeOutClickHandler(evt) {
  var timeOutValue = evt.target.value;
  var timeIn = document.querySelector('#timein');
  synchroniseValue(timeOutValue, timeIn);
}

/**
 * checks whether number of rooms suit number of guests
 * @return {boolean}
 */
function isRoomsSuitableGuests() {
  var roomNumber = document.querySelector('#room_number')
      .querySelector('option:checked')
      .getAttribute('value');
  var guestNumber = document.querySelector('#capacity')
    .querySelector('option:checked')
    .getAttribute('value');

  if (Number(roomNumber) === 100) {
    return Number(guestNumber) === 0;
  }
  if (Number(guestNumber) === 0) {
    return Number(roomNumber) === 100;
  }
  return Number(roomNumber) >= Number(guestNumber);
}

/**
 * check whether rooms are suitable for guests
 */
function validateRoomsAndGuests() {
  var rooms = document.querySelector('#room_number');

  if (!isRoomsSuitableGuests()) {
    rooms.setCustomValidity('Количество комнат должно соответствовать количеству гостей');
  } else {
    rooms.setCustomValidity('');
  }
}


function activateMapAndForm() {
  mapField.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFiltersSelect.forEach(removeDisabledAttr);
  mapFiltersFieldset.forEach(removeDisabledAttr);
  adFormFieldset.forEach(removeDisabledAttr);
}

/**
 * writes pin's coordinate in the address input
 */
function setAddressByPin() {
  var pin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var location = {
    'x': null,
    'y': null
  };
  var topCoordinate = pin.style.top;
  var leftCoordinate = pin.style.left;
  location.x = Number(topCoordinate.slice(0, topCoordinate.length - 2)) + CORRECT_PIN_X;
  location.y = Number(leftCoordinate.slice(0, topCoordinate.length - 2)) + CORRECT_PIN_Y;
  addressInput.value = location.x + ' ' + location.y;
}

/**
 * render pins on the map
 * @param {Array} objList list of objects for making pins
 */
function renderPins(objList) {
  var pinsField = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  pinsField.appendChild(makePins(pinTemplate, objList));
}


function addPinClickListener() {
  var pinList = document.querySelectorAll('.map__pin[type="button"]');

  for (var el = 0; el < pinList.length; el++) {
    pinList[el].addEventListener('click', pinClickHandler);
  }
}

/**
 * validate form before submit
 */
function addValidateFormListeners() {
  var formBtn = document.querySelector('.ad-form__submit');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  formBtn.addEventListener('click', validateRoomsAndGuests);

  timeIn.addEventListener('input', timeInClickHandler);
  timeOut.addEventListener('input', timeOutClickHandler);

}


/**
 * activate page
 * @param {string} adList
 */
function activatePage(adList) {

  activateMapAndForm();
  setAddressByPin();
  renderPins(adList);
  addPinClickListener();
  addValidateFormListeners();
}

/**
 * activate page by mousedown on mainPin
 */
function mainPinMousdownHandler() {
  activatePage(adList);

}

/**
 * activate page by press enter
 * @param {*} evt
 */
function mainPinKeydownHandler(evt) {
  if (evt.keyCode === KEY_ENTER_CODE) {
    activatePage(adList);
  }
}

// работа с данными
var adList = generateAdList();

// работа с дом
var mapField = document.querySelector('.map');
var mapFiltersSelect = document.querySelector('.map__filters').querySelectorAll('select');
var mapFiltersFieldset = document.querySelector('.map__filters').querySelectorAll('fieldset');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filterContainer = document.querySelector('.map__filters-container');


// делаю страницу неактивной

mapField.classList.add('map--faded');


// обработчики, которые активирует карту по нажатию на пин

var mainPin = document.querySelector('.map__pin--main');
mainPin.addEventListener('keydown', mainPinKeydownHandler);
mainPin.addEventListener('click', mainPinMousdownHandler);
