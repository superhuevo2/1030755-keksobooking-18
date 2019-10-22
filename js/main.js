'use strict';
(function () {
  var KEYCODE_ENTER = window.util.KEYCODE_ENTER;
  var createErrorMessage = window.util.createErrorMessage;
  var createSuccessMessage = window.util.createSuccessMessage;
  var activateMap = window.map.activateMap;
  var deactivateMap = window.map.deactivateMap;
  var activateForm = window.form.activateForm;
  var deactivateForm = window.form.deactivateForm;
  var submitFormHandler = window.form.submitFormHandler;
  var resetForm = window.form.resetForm;
  var typeInputHandler = window.form.typeInputHandler;
  var timeInInputHandler = window.form.timeInInputHandler;
  var timeOutInputHandler = window.form.timeOutInputHandler;
  var isValid = window.form.isValid;
  var movePinHandler = window.pointer.movePinHandler;
  var load = window.backend.load;
  var send = window.backend.send;

  /**
   * handle error in xhr
   * @param {string} option load or send
   */
  function errorHandler(option) {
    createErrorMessage();
    var errorPopup = document.querySelector('.error');
    var button = errorPopup.querySelector('.error__button');
    button.addEventListener('click', function buttonClickHandler(evt) {
      evt.preventDefault();
      switch (option) {
        case 'load':
          deactivatePage();
          break;
        case 'send':
          break;
      }
      errorPopup.remove();
    });
  }


  function successSendHandler() {
    createSuccessMessage();
    deactivatePage();
    var successPopup = document.querySelector('.success');

    function keydownHandler() {
      successPopup.remove();
      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('click', clickHandler);
    }
    function clickHandler() {
      successPopup.remove();
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keydownHandler);
    }

    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('click', clickHandler);
  }


  function sendDataHandler(evt) {
    submitFormHandler();
    if (isValid()) {
      evt.preventDefault();
      var data = new FormData(adForm);
      send(data, successSendHandler, errorHandler.bind(null, 'send'));
    }
  }

  /**
   * activate page
   * @param {array} data
   */
  function activatePage(data) {
    activateMap(data);
    activateForm();
    typeOfHouse.addEventListener('input', typeInputHandler);
    timeIn.addEventListener('input', timeInInputHandler);
    timeOut.addEventListener('input', timeOutInputHandler);
    resetFormBtn.addEventListener('click', resetForm);
    submitFormBtn.addEventListener('click', sendDataHandler);
  }


  function deactivatePage() {
    deactivateMap();
    deactivateForm();
    typeOfHouse.removeEventListener('input', typeInputHandler);
    timeIn.removeEventListener('input', timeInInputHandler);
    timeOut.removeEventListener('input', timeOutInputHandler);
    resetFormBtn.addEventListener('click', resetForm);
    submitFormBtn.removeEventListener('click', sendDataHandler);

    mainPin.addEventListener('mousedown', mainPinMousdownHandler);
    mainPin.addEventListener('keydown', mainPinEnterHandler);
    mainPin.addEventListener('mousedown', movePinHandler);
  }

  /**
   * activate page by mousedown on mainPin
   */
  function mainPinMousdownHandler() {
    load(activatePage, errorHandler.bind(null, 'load'));
    mainPin.removeEventListener('mousedown', mainPinMousdownHandler);
    mainPin.removeEventListener('keydown', mainPinEnterHandler);
  }

  /**
   * activate page by press Enter
   * @param {object} evt
   */
  function mainPinEnterHandler(evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      load(activatePage, errorHandler.bind(null, 'load'));
      mainPin.removeEventListener('keydown', mainPinEnterHandler);
      mainPin.removeEventListener('mousedown', mainPinMousdownHandler);
    }
  }

  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var submitFormBtn = document.querySelector('.ad-form__submit');
  var resetFormBtn = document.querySelector('.ad-form__reset');
  var typeOfHouse = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  deactivatePage();
})();
