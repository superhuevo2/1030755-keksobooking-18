'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';

  var SUCCESS_STATUS = 200;


  function makeRequest(type, xhr, data, onLoad, onError) {
    xhr.addEventListener('load', function () {
      switch (type) {
        case 'load':
          try {
            onLoad(xhr.response);
          } catch (err) {
            onError();
          }
          break;
        case 'send':
          if (xhr.status === SUCCESS_STATUS) {
            onLoad();
          } else {
            onError();
          }
          break;
        default:
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    switch (type) {
      case 'load':
        xhr.open('GET', URL_LOAD);
        xhr.send();
        break;
      case 'send':
        xhr.open('POST', URL_SEND);
        xhr.send(data);
        break;
      default:
        break;
    }
  }

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    makeRequest('load', xhr, null, onLoad, onError);
  }

  function send(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    makeRequest('send', xhr, data, onLoad, onError);
  }

  window.backend = {
    load: load,
    send: send
  };
})();
