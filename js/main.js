'use strict';
(function () {
  var KEYCODE_ENTER = window.util.KEYCODE_ENTER;
  var activateMap = window.map.activateMap;
  var deactivateMap = window.map.deactivateMap;
  var activateForm = window.form.activateForm;
  var validateForm = window.form.validateForm;
  var generateAdList = window.data.generateAdList;
  var movePinHandler = window.pointer.movePinHandler;

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

  function mainPinEnterHandler(evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      activatePage(adList);
      mainPin.removeEventListener('keydown', mainPinEnterHandler);
    }
  }

  var adList = generateAdList();
  deactivateMap();

  mainPin.addEventListener('mousedown', mainPinMousdownHandler);
  mainPin.addEventListener('keydown', mainPinEnterHandler);
  mainPin.addEventListener('mousedown', movePinHandler);

})();
