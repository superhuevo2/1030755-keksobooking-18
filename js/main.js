'use strict';
(function () {
  var KEYCODE_ENTER = window.util.KEYCODE_ENTER;
  var activateMap = window.map.activateMap;
  var deactivateMap = window.map.deactivateMap;
  var activateForm = window.form.activateForm;
  var validateForm = window.form.validateForm;
  var movePinHandler = window.pointer.movePinHandler;
  var load = window.backend.load;

  var mainPin = document.querySelector('.map__pin--main');

  function createErrorMessage() {
    var element = errorTemplate.cloneNode(true);
    var button = element.querySelector('.error__button');
    blockMain.appendChild(element);
    button.addEventListener('click', function buttonClickHandler(evt) {
      evt.preventDefault();
      load(activatePage, createErrorMessage);
      element.remove();
    });
  }

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
    load(activatePage, createErrorMessage);
    mainPin.removeEventListener('click', mainPinMousdownHandler);
  }

  /**
   * activate page by press Enter
   * @param {object} evt
   */
  function mainPinEnterHandler(evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      load(activatePage, createErrorMessage);
      mainPin.removeEventListener('keydown', mainPinEnterHandler);
    }
  }

  var errorTemplate = document.querySelector('#error')
      .content.querySelector('.error');
  var blockMain = document.querySelector('main');

  deactivateMap();

  mainPin.addEventListener('mousedown', mainPinMousdownHandler);
  mainPin.addEventListener('keydown', mainPinEnterHandler);
  mainPin.addEventListener('mousedown', movePinHandler);

})();
