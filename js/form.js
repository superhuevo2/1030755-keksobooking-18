'use strict';
(function () {
  var TYPE_TO_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  /**
   * make the form active
   */
  function activateForm() {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldset.forEach(function removeDisabledAttr(element) {
      element.removeAttribute('disabled');
    });
    // setPriceFromType('flat');
  }

  /**
   * get back the form in initial state
   */
  function deactivateForm() {
    adForm.classList.add('ad-form--disabled');
    resetForm();
    adFormFieldset.forEach(function addDisabled(element) {
      element.setAttribute('disabled', '');
    });
  }

  /**
   * reset all field in the form
   */
  function resetForm() {
    adForm.reset();
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
   * handle timeIn input, set timeOut value the same as timeIn
   * @param {object} evt
   */
  function timeInInputHandler(evt) {
    var sourceValue = evt.target.value;
    synchroniseValue(sourceValue, timeOut);
  }

  /**
   * handle timeOut input, set timeIn value the same as timeIn
   * @param {object} evt
   */
  function timeOutInputHandler(evt) {
    var sourceValue = evt.target.value;
    synchroniseValue(sourceValue, timeIn);
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
  function typeInputHandler(evt) {
    var val = evt.target.value;
    setPriceFromType(val);
  }

  /**
   * set attributes min and placeholder according to the type
   * @param {string} value
   */
  function setPriceFromType(value) {
    price.setAttribute('min', TYPE_TO_PRICE[value]);
    price.setAttribute('placeholder', TYPE_TO_PRICE[value]);
  }

  function validatePriceAndTypes() {
    if (price.value === '' || price.value <= TYPE_TO_PRICE[type.value]) {
      price.setCustomValidity('Цена не соответствует типу жилья');
    } else if (price.value > 1000000) {
      price.setCustomValidity('Максимальная цена 1 000 000');
    } else {
      price.setCustomValidity('');
    }
  }

  function setFormValidation() {
    validateRoomsAndGuests();
    validatePriceAndTypes();
  }

  function isValid() {
    function makeValidityList(el) {
      return el.checkValidity();
    }
    function reducer(el1, el2) {
      return el1 && (el1 === el2);
    }
    var adFormInputs = adForm.querySelectorAll('input, select, textarea');
    var arr = Array.prototype.slice.call(adFormInputs);
    var validityList = arr.map(makeValidityList);

    return validityList.reduce(reducer);
  }

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var rooms = document.querySelector('#room_number');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');


  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm,
    isValid: isValid,
    typeInputHandler: typeInputHandler,
    timeInInputHandler: timeInInputHandler,
    timeOutInputHandler: timeOutInputHandler,
    setFormValidation: setFormValidation
  };
})();
