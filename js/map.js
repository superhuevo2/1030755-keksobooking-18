'use strict';

(function () {
  var createPins = window.pin.createPins;
  var createCard = window.card.createCard;
  var setAddressByPin = window.pointer.setAddressByPin;
  var isEscEvent = window.util.isEscEvent;

  function activateMap(adList) {
    mapField.classList.remove('map--faded');
    renderPins(adList);
    setAddressByPin();
  }

  function deactivateMap() {
    mapField.classList.add('map--faded');
  }


  function removeCard() {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      document.removeEventListener('keydown', closeKeydownHandler);
      card.remove();
    }
  }


  function closeKeydownHandler(evt) {
    isEscEvent(evt, removeCard);
  }


  function addCardListeners(card) {
    var cardCloseBtn = card.querySelector('.popup__close');

    cardCloseBtn.addEventListener('click', removeCard);
    document.addEventListener('keydown', closeKeydownHandler);
  }


  /**
   * add listener to a pin
   * @param {object} element pin for adding listener
   * @param {*} data info about pin
   */
  function addPinClickListener(element, data) {
    element.addEventListener('click', function () {
      removeCard();
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
    var pinElements = createPins(objList);
    for (var i = 0; i < pinElements.children.length; i++) {
      addPinClickListener(pinElements.children[i], objList[i]);
    }
    pinsField.appendChild(pinElements);
  }


  /* function addMainPinDragListener() {
    // будет перемещение метки
    var mainPin = document.querySelector('.map__pin--main');

  } */

  var mapField = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');
  var pinsField = document.querySelector('.map__pins');

  window.map = {
    mapField: mapField,
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };
})();

