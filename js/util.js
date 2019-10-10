'use strict';
(function () {
  var KEYCODE_ESC = 27;
  var KEYCODE_ENTER = 13;

  function isEsc(evt) {
    return evt.keyCode === KEYCODE_ESC;
  }

  function isEnter(evt) {
    return evt.keyCode === KEYCODE_ENTER;
  }

  window.util = {
    isEnter: isEnter,
    isEsc: isEsc
  };
})();
