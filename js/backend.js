'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  function load(onLoad, onError) {
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
