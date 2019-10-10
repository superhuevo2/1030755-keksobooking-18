'use strict';

(function () {
  var CORRECT_PIN_X = 25;
  var CORRECT_PIN_Y = 40;

  var createCard = window.card.createCard;

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
   * add listener to a pin
   * @param {object} element pin for adding listener
   * @param {*} data info about pin
   */
  function addPinClickListener(element, data) {
    element.addEventListener('click', function () {
      var card = createCard(data);
      mapField.insertBefore(card, filterContainer);
    });
  }

  /**
   * create a fragment of DOM contains the pins
   * @param {array} dataList list of information about pins
   * @return {object} DOM fragment
   */
  function createPins(dataList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataList.length; i++) {
      var pin = createPinElement(pinTemplate, dataList[i]);
      addPinClickListener(pin, dataList[i]);
      fragment.appendChild(pin);
    }
    return fragment;
  }

  var mapField = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    CORRECT_PIN_X: CORRECT_PIN_X,
    CORRECT_PIN_Y: CORRECT_PIN_Y,
    createPins: createPins
  };
})();
