'use strict';
(function () {
  var MAP_ORIGIN_Y = 130;
  var MAP_ORIGIN_X = 0;
  var MAP_HEIGHT = 500;
  var CORRECT_PIN_X = window.pin.CORRECT_PIN_X;
  var CORRECT_PIN_Y = window.pin.CORRECT_PIN_Y;

  /**
   * writes pin's coordinate in the address input
   */
  function setAddressByPin() {
    var location = {
      'x': null,
      'y': null
    };
    var topCoordinate = parseInt(mainPin.style.top, 10);
    var leftCoordinate = parseInt(mainPin.style.left, 10);
    location.y = topCoordinate + CORRECT_PIN_Y;
    location.x = leftCoordinate + CORRECT_PIN_X;
    addressInput.value = location.x + ' ' + location.y;
  }

  /**
   * set how to move pointer
   * @param {object} evt
   */
  function movePinHandler(evt) {
    evt.preventDefault();
    var origin = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * handle mouse move
     * @param {object} moveEvt
     */
    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();
      var distance = {
        x: moveEvt.clientX - origin.x,
        y: moveEvt.clientY - origin.y
      };
      var mapWidth = mapField.offsetWidth;

      if (mainPin.offsetLeft + distance.x < MAP_ORIGIN_X - CORRECT_PIN_X) {
        mainPin.style.left = MAP_ORIGIN_X - CORRECT_PIN_X + 'px';
      } else if (mainPin.offsetLeft + distance.x > mapWidth - CORRECT_PIN_X) {
        mainPin.style.left = (mapWidth - CORRECT_PIN_X) + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft + distance.x) + 'px';
      }

      if (mainPin.offsetTop + distance.y < MAP_ORIGIN_Y - CORRECT_PIN_Y) {
        mainPin.style.top = MAP_ORIGIN_Y - CORRECT_PIN_Y + 'px';
      } else if (mainPin.offsetTop + distance.y > MAP_ORIGIN_Y + MAP_HEIGHT - CORRECT_PIN_Y) {
        mainPin.style.top = (MAP_ORIGIN_Y + MAP_HEIGHT - CORRECT_PIN_Y) + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop + distance.y) + 'px';
      }

      origin = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setAddressByPin();
    }

    /**
     * handle mouse up
     * @param {object} upEvt
     */
    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();
      setAddressByPin();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var mapField = document.querySelector('.map');

  window.pointer = {
    movePinHandler: movePinHandler,
    setAddressByPin: setAddressByPin
  };

})();
