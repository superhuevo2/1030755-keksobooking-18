'use strict';

(function () {
  var createPins = window.pin.createPins;
  var createPinList = window.pin.createPinList;
  var createCard = window.card.createCard;
  var isEsc = window.util.isEsc;

  function activateMap(adList) {
    mapField.classList.remove('map--faded');
    renderPins(adList);
    setAddressByPin();
  }

  function deactivateMap() {
    mapField.classList.add('map--faded');
  }

  /**
   * writes pin's coordinate in the address input
   */
  function setAddressByPin() {
    var location = {
      'x': null,
      'y': null
    };
    var topCoordinate = pin.style.top;
    var leftCoordinate = pin.style.left;
    location.x = Number(topCoordinate.slice(0, topCoordinate.length - 2)) + window.pin.CORRECT_PIN_X;
    location.y = Number(leftCoordinate.slice(0, topCoordinate.length - 2)) + window.pin.CORRECT_PIN_Y;
    addressInput.value = location.x + ' ' + location.y;
  }


  function removeCard() {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      document.removeEventListener('keydown', closeKeydownHandler);
      card.remove();
    }
  }

  function closeClickHandler() {
    removeCard();
  }


  function closeKeydownHandler(evt) {
    if (isEsc(evt)) {
      removeCard();
    }
  }


  function addCardListeners(card) {
    var cardCloseBtn = card.querySelector('.popup__close');

    cardCloseBtn.addEventListener('click', closeClickHandler);
    document.addEventListener('keydown', closeKeydownHandler);
  }


  /**
   * add listener to a pin
   * @param {object} element pin for adding listener
   * @param {*} data info about pin
   */
  function addPinClickListener(element, data) {
    element.addEventListener('click', function () {
      var currentCard = document.querySelector('.map__card');
      if (currentCard !== null) {
        currentCard.remove();
      }
      var card = createCard(data);
      mapField.insertBefore(card, filterContainer);
      addCardListeners(card);
    });
  }

  /**
   * render pins on the map
   * @param {Array} objList list of objects for making pins
   */
  function renderPins(objList) {
    var pins = createPinList(objList);
    for (var i = 0; i < pins.length; i++) {
      addPinClickListener(pins[i], objList[i]);
    }
    var pinElements = createPins(pins);
    pinsField.appendChild(pinElements);
  }


  /* function addMainPinDragListener() {
    // будет перемещение метки
    var mainPin = document.querySelector('.map__pin--main');

  } */

  var mapField = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');
  var pinsField = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  window.map = {
    mapField: mapField,
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };
})();

