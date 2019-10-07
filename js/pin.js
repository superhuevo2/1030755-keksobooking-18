'use strict';

(function () {
  var CORRECT_PIN_X = 25;
  var CORRECT_PIN_Y = 40;

  /**
   * create a pin
   * @param {object} data contains location, title and link to an image
   * @return {object} DOM element pin
   */
  function createPin(data) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var element = pinTemplate.cloneNode(true);
    var image = element.querySelector('img');

    element.style.top = (data.location.y - CORRECT_PIN_Y) + 'px';
    element.style.left = (data.location.x - CORRECT_PIN_X) + 'px';
    image.setAttribute('src', data.author.avatar);
    image.setAttribute('alt', data.offer.title);

    return element;
  }

  function createPins(dataList) {
    var pinsList = [];
    for (var i = 0; i < dataList.length; i++) {
      pinsList.push(createPin(dataList[i]));
    }

    return pinsList;
  }

  /**
   * create a document fragment from template and data.
   * @param {array} pinList a list from which data is written.
   * @return {object} a fragment of DOM elements pins.
   */
  function createPinsElement(pinList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinList.length; i++) {
      fragment.appendChild(pinList[i]);
    }

    return fragment;
  }

  window.pin = {
    CORRECT_PIN_X: CORRECT_PIN_X,
    CORRECT_PIN_Y: CORRECT_PIN_Y,
    createPins: createPins,
    createPinsElement: createPinsElement
  };
})();
