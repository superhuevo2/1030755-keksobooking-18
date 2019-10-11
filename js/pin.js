'use strict';

(function () {
  var CORRECT_PIN_X = 25;
  var CORRECT_PIN_Y = 40;

  /**
   * create a pin
   * @param {object} template
   * @param {object} data contains location, title and link to an image
   * @return {object} DOM element pin
   */
  function createPinElement(template, data) {
    var element = template.cloneNode(true);
    var image = element.querySelector('img');

    element.style.top = (data.location.y - CORRECT_PIN_Y) + 'px';
    element.style.left = (data.location.x - CORRECT_PIN_X) + 'px';
    image.setAttribute('src', data.author.avatar);
    image.setAttribute('alt', data.offer.title);

    return element;
  }


  function createPinList(dataList) {
    var pins = [];
    for (var i = 0; i < dataList.length; i++) {
      var pin = createPinElement(pinTemplate, dataList[i]);
      pins.push(pin);
    }
    return pins;
  }

  /**
   * create a fragment of DOM contains the pins
   * @param {array} pinList list of information about pins
   * @return {object} DOM fragment
   */
  function createPins(pinList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinList.length; i++) {
      fragment.appendChild(pinList[i]);
    }
    return fragment;
  }

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    CORRECT_PIN_X: CORRECT_PIN_X,
    CORRECT_PIN_Y: CORRECT_PIN_Y,
    createPinList: createPinList,
    createPins: createPins
  };
})();
