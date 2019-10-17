'use strict';
(function () {

  function load(onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      try {
        onLoad(xhr.response);
      } catch (err) {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('GET', URL);
    xhr.send();
  }

  window.backend = {
    load: load
  };
})();
