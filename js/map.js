'use strict';

(function () {
  var createPins = window.pin.createPins;

  function activateMap(adList) {
    mapField.classList.remove('map--faded');
    renderPins(adList);
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
    var pinsElement = createPins(objList);
    pinsField.appendChild(pinsElement);
  }


  /* function addMainPinDragListener() {
    // будет перемещение метки
    var mainPin = document.querySelector('.map__pin--main');

  } */

  var mapField = document.querySelector('.map');
  var pinsField = document.querySelector('.map__pins');

  window.map = {
    mapField: mapField,
    activateMap: activateMap,
    deactivateMap: deactivateMap
  };
})();

