'use strict';

(function () {
  var mapField = document.querySelector('.map');


  function activateMap() {
    mapField.classList.remove('map--faded');
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
    location.x = Number(topCoordinate.slice(0, topCoordinate.length - 2)) + window.pin.CORRECT_PIN_X;
    location.y = Number(leftCoordinate.slice(0, topCoordinate.length - 2)) + window.pin.CORRECT_PIN_Y;
    addressInput.value = location.x + ' ' + location.y;
  }

  /**
   * render pins on the map
   * @param {Array} objList list of objects for making pins
   */
  function renderPins(objList) {
    var pinsField = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    pinsField.appendChild(window.pin.makePins(pinTemplate, objList));
  }


  function pinClickHandler() {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var filterContainer = document.querySelector('.map__filters-container');

    mapField.insertBefore(window.card.createCard(cardTemplate, window.data.adList[0]), filterContainer);
  }


  function addPinClickListener() {
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var el = 0; el < pinList.length; el++) {
      pinList[el].addEventListener('click', pinClickHandler);
    }
  }

  window.map = {
    mapField: mapField,
    activateMap: activateMap,
    setAddressByPin: setAddressByPin,
    renderPins: renderPins,
    addPinClickListener: addPinClickListener
  };
})();

