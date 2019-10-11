'use strict';
(function () {
  var TYPE_TO_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  /**
   * make element active
   * @param {*} element
   */
  function removeDisabledAttr(element) {
    element.removeAttribute('disabled');
  }

  /**
   * make the form active
   */
  function activateForm() {
    adForm.classList.remove('ad-form--disabled');
    mapFiltersSelect.forEach(removeDisabledAttr);
    mapFiltersFieldset.forEach(removeDisabledAttr);
    adFormFieldset.forEach(removeDisabledAttr);
  }

  /**
   * synchronise value between objects
   * @param {String} value
   * @param {object} target
   */
  function synchroniseValue(value, target) {
    for (var i = 0; i < target.options.length; i++) {
      if (target.options[i].value === value) {
        target.options[i].selected = true;
      }
    }
  }

  /**
   * add listener wich synchronises inputs timeIn and timeOut
   * @param {object} sourceEl
   * @param {object} targetEl
   */
  function addTimeClickListener(sourceEl, targetEl) {
    function timeClickHandler(evt) {
      var sourceValue = evt.target.value;
      synchroniseValue(sourceValue, targetEl);
    }
    sourceEl.addEventListener('input', timeClickHandler);
  }

  /**
   * checks condition whether number of rooms suits number of guests
   * @return {boolean}
   */
  function isRoomsSuitableGuests() {
    var roomNumber = document.querySelector('#room_number')
        .querySelector('option:checked')
        .getAttribute('value');
    var guestNumber = document.querySelector('#capacity')
        .querySelector('option:checked')
        .getAttribute('value');

    if (Number(roomNumber) === 100) {
      return Number(guestNumber) === 0;
    }
    if (Number(guestNumber) === 0) {
      return Number(roomNumber) === 100;
    }
    return Number(roomNumber) >= Number(guestNumber);
  }

  /**
   * check whether rooms are suitable for guests
   */
  function validateRoomsAndGuests() {

    if (!isRoomsSuitableGuests()) {
      rooms.setCustomValidity('Количество комнат должно соответствовать количеству гостей');
    } else {
      rooms.setCustomValidity('');
    }
  }

  /**
   * set attributes min and placeholder according to the type
   * @param {event} evt
   */
  function setPriceFromType(evt) {
    price.setAttribute('min', TYPE_TO_PRICE[evt.target.value]);
    price.setAttribute('placeholder', TYPE_TO_PRICE[evt.target.value]);

  }

  /**
   * validate form before submit
   */
  function addValidateFormListeners() {
    formBtn.addEventListener('click', validateRoomsAndGuests);

    addTimeClickListener(timeIn, timeOut);
    addTimeClickListener(timeOut, timeIn);

    typeOfHouse.addEventListener('input', setPriceFromType);
  }

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var mapFiltersSelect = document.querySelector('.map__filters').querySelectorAll('select');
  var mapFiltersFieldset = document.querySelector('.map__filters').querySelectorAll('fieldset');

  var rooms = document.querySelector('#room_number');

  var typeOfHouse = document.querySelector('#type');
  var price = document.querySelector('#price');

  var formBtn = document.querySelector('.ad-form__submit');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  window.form = {
    activateForm: activateForm,
    validateForm: addValidateFormListeners
  };
})();
