'use strict';

(function () {
  var mapField = document.querySelector('.map');
  var createPins = window.pin.createPins;
  var createPinsElement = window.pin.createPinsElement;
  var createCardElement = window.card.createCardElement;

  function activateMap(adList) {
    mapField.classList.remove('map--faded');
    renderPins(adList);
    addPinClickListener(adList);
  }

  function deactivateMap() {
    mapField.classList.add('map--faded');
  }

  /**
   * writes pin's coordinate in the address input
   */
  /* function setAddressByPin() {
    // функция отвечает за изменение инпута адрес при взаимодействии с пином
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
  } */

  /**
   * render pins on the map
   * @param {Array} objList list of objects for making pins
   */
  function renderPins(objList) {
    var pins = createPins(objList);
    var pinsElement = createPinsElement(pins);
    var pinsField = document.querySelector('.map__pins');

    pinsField.appendChild(pinsElement);
  }


  function addPinClickListener(adList) {
    var pinList = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    // объявлена внутри
    function pinClickHandler() {
      var filterContainer = document.querySelector('.map__filters-container');
      // mapField - глобальная переменная
      mapField.insertBefore(createCardElement(adList[0]), filterContainer);
    }

    for (var el = 0; el < pinList.length; el++) {
      pinList[el].addEventListener('click', pinClickHandler);
    }
  }


  /* function addMainPinDragListener() {
    // будет перемещение метки
    var mainPin = document.querySelector('.map__pin--main');

  } */

  window.map = {
    mapField: mapField,
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };
})();

