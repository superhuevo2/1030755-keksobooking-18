'use strict';

(function () {
  var createPins = window.pin.createPins;
  var createCard = window.card.createCard;
  var setAddressByPin = window.pointer.setAddressByPin;
  var resetPinPosition = window.pointer.resetPinPosition;
  var isEscEvent = window.util.isEscEvent;

  /**
   * make the map active
   * @param {json} data list of ads
   */
  function activateMap(data) {
    mapField.classList.remove('map--faded');
    renderPins(data);
    setAddressByPin();
  }

  /**
   * make the page deactive
   */
  function deactivateMap() {
    mapField.classList.add('map--faded');
    removePins();
    removeCard();
    resetPinPosition();
    setAddressByPin();
  }

  /**
 * remove popup card element
 */
  function removeCard() {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      document.removeEventListener('keydown', closeKeydownHandler);
      card.remove();
    }
  }

  /**
 * close popup by press esc
 * @param {*} evt
 */
  function closeKeydownHandler(evt) {
    isEscEvent(evt, removeCard);
  }

  /**
 * add listeners to close popup card
 * @param {object} card
 */
  function addCardListeners(card) {
    var cardCloseBtn = card.querySelector('.popup__close');

    cardCloseBtn.addEventListener('click', removeCard);
    document.addEventListener('keydown', closeKeydownHandler);
  }


  /**
   * add listener to a pin to create card
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

  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    for (var i = pins.length - 1; i >= 0; i--) {
      pins[i].remove();
    }
  }


  var mapField = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');
  var pinsField = document.querySelector('.map__pins');

  window.map = {
    activateMap: activateMap,
    deactivateMap: deactivateMap,
    renderPins: renderPins,
    removePins: removePins,
    removeCard: removeCard
  };
})();

