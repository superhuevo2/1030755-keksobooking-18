'use strict';

(function () {
  var CORRECT_PIN_X = 30;
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

  /**
   * create a fragment of DOM contains the pins
   * @param {array} dataList list of information about pins
   * @return {object} DOM fragment
   */
  function createPins(dataList) {
    var fragment = document.createDocumentFragment();

    dataList.forEach(function (el) {
      if (el.offer) {
        var pin = createPinElement(pinTemplate, el);
        fragment.appendChild(pin);
      }
    });

    return fragment;
  }

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    CORRECT_PIN_X: CORRECT_PIN_X,
    CORRECT_PIN_Y: CORRECT_PIN_Y,
    createPins: createPins
  };
})();
