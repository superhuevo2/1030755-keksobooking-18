'use strict';
(function () {
  var KEYCODE_ESC = 27;
  var KEYCODE_ENTER = 13;

  /**
   * check if esc has been pressed
   * @param {object} evt
   * @param {function} action
   */
  function isEscEvent(evt, action) {
    if (evt.keyCode === KEYCODE_ESC) {
      action();
    }
  }

  /**
   * check if enter has been pressed
   * @param {object} evt
   * @param {function} action
   */
  function isEnterEvent(evt, action) {
    if (evt.keyCode === KEYCODE_ENTER) {
      action();
    }
  }


  function createErrorMessage() {
    var errorTemplate = document.querySelector('#error')
      .content.querySelector('.error');
    var element = errorTemplate.cloneNode(true);
    blockMain.appendChild(element);

  }


  function createSuccessMessage() {
    var successTemplate = document.querySelector('#success')
        .content.querySelector('.success');
    var element = successTemplate.cloneNode(true);
    blockMain.appendChild(element);

  }

  var blockMain = document.querySelector('main');

  window.util = {
    KEYCODE_ESC: KEYCODE_ESC,
    KEYCODE_ENTER: KEYCODE_ENTER,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    createSuccessMessage: createSuccessMessage,
    createErrorMessage: createErrorMessage
  };
})();
