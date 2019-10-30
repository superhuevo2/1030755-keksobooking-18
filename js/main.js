'use strict';
(function () {
  var KEYCODE_ENTER = window.util.KEYCODE_ENTER;
  var createErrorMessage = window.util.createErrorMessage;
  var activateMap = window.map.activateMap;
  var deactivateMap = window.map.deactivateMap;
  var filterQuantity = window.filter.filterQuantity;
  var activateForm = window.form.activateForm;
  var deactivateForm = window.form.deactivateForm;

  var movePinHandler = window.pointer.movePinHandler;
  var load = window.backend.load;

  /**
   * handle error in xhr
   */
  function errorLoadHandler() {
    createErrorMessage();
    var errorPopup = document.querySelector('.error');
    var button = errorPopup.querySelector('.error__button');
    button.addEventListener('click', function buttonClickHandler(evt) {
      evt.preventDefault();
      deactivatePage();
      errorPopup.remove();
    });
  }


  function successLoadHandler(data) {
    window.filter.filterObject.dataList = data;
    var adsForRender = filterQuantity(data);
    activatePage(adsForRender);
  }


  /**
   * activate page
   * @param {array} data
   */
  function activatePage(data) {
    activateMap(data);
    activateForm();
  }


  function deactivatePage() {
    deactivateMap();
    deactivateForm();

    mainPin.addEventListener('mousedown', mainPinMousdownHandler);
    mainPin.addEventListener('keydown', mainPinEnterHandler);
    mainPin.addEventListener('mousedown', movePinHandler);
  }

  /**
   * activate page by mousedown on mainPin
   */
  function mainPinMousdownHandler() {
    load(successLoadHandler, errorLoadHandler);
    mainPin.removeEventListener('mousedown', mainPinMousdownHandler);
    mainPin.removeEventListener('keydown', mainPinEnterHandler);
  }

  /**
   * activate page by press Enter
   * @param {object} evt
   */
  function mainPinEnterHandler(evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      mainPinMousdownHandler();
    }
  }

  var mainPin = document.querySelector('.map__pin--main');


  deactivatePage();
  window.form.adFormObj.onSubmit = deactivatePage;
})();
