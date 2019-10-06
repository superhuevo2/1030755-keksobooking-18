'use strict';


/**
 * activate page
 * @param {string} adList
 */
function activatePage(adList) {
  window.map.activateMap();
  window.form.activateForm();
  window.map.setAddressByPin();
  window.map.renderPins(adList);
  window.map.addPinClickListener();
  window.form.addValidateFormListeners();
}

/**
 * activate page by mousedown on mainPin
 */
function mainPinMousdownHandler() {
  activatePage(window.data.adList);
  mainPin.removeEventListener('click', mainPinMousdownHandler);
}

// делаю страницу неактивной

window.map.mapField.classList.add('map--faded');


// обработчики, которые активирует карту по нажатию на пин

var mainPin = document.querySelector('.map__pin--main');
// mainPin.addEventListener('click', function () {
//   if (notActivated) {
//     activatePage(adList);
//     notAtvivated = false;
//   }
// });

mainPin.addEventListener('click', mainPinMousdownHandler);
