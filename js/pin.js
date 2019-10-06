'use strict';

(function () {
  var CORRECT_PIN_X = 25;
  var CORRECT_PIN_Y = 40;

  /**
   * create a document fragment from template and data.
   * @param {object} template a template for copying.
   * @param {array} objList a list from wich data is written.
   * @return {object} a fragment of DOM.
   */
  function makePins(template, objList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < objList.length; i++) {
      var element = template.cloneNode(true);
      var image = element.querySelector('img');
      element.style.top = (objList[i].location.y - CORRECT_PIN_Y) + 'px';
      element.style.left = (objList[i].location.x - CORRECT_PIN_X) + 'px';
      image.setAttribute('src', objList[i].author.avatar);
      image.setAttribute('alt', objList[i].offer.title);

      fragment.appendChild(element);
    }
    return fragment;
  }

  window.pin = {
    CORRECT_PIN_X: CORRECT_PIN_X,
    CORRECT_PIN_Y: CORRECT_PIN_Y,
    makePins: makePins
  };
})();
