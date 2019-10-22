'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';

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

    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  function send(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL_SEND);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    send: send
  };
})();
