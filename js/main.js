'use strict';
(function () {
  var activateMap = window.map.activateMap;
  var deactivateMap = window.map.deactivateMap;
  var activateForm = window.form.activateForm;
  var validateForm = window.form.validateForm;
  var generateAdList = window.data.generateAdList;

  var mainPin = document.querySelector('.map__pin--main');

  /**
   * activate page
   * @param {array} data
   */
  function activatePage(data) {
    activateMap(data);
    activateForm();
    validateForm();
  }

  /**
   * activate page by mousedown on mainPin
   */
  function mainPinMousdownHandler() {
    activatePage(adList);
    mainPin.removeEventListener('click', mainPinMousdownHandler);
  }

  var adList = generateAdList();
  deactivateMap();

  mainPin.addEventListener('click', mainPinMousdownHandler);

})();
