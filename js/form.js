'use strict';
(function () {
  var TYPE_TO_PRICE = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var send = window.backend.send;
  var createSuccessMessage = window.util.createSuccessMessage;
  var createErrorMessage = window.util.createErrorMessage;
  var resetPhoto = window.photo.resetPhoto;

  var adFormObj = {
    submitHandler: function () {}
  };

  /**
   * make the form active
   */
  function activateForm() {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldset.forEach(function removeDisabledAttr(element) {
      element.removeAttribute('disabled');
    });

    typeOfHouse.addEventListener('input', typeInputHandler);
    timeIn.addEventListener('input', timeInInputHandler);
    timeOut.addEventListener('input', timeOutInputHandler);
    submitFormBtn.addEventListener('click', sendDataHandler);
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

    typeOfHouse.removeEventListener('input', typeInputHandler);
    timeIn.removeEventListener('input', timeInInputHandler);
    timeOut.removeEventListener('input', timeOutInputHandler);
    submitFormBtn.removeEventListener('click', sendDataHandler);
  }

  /**
   * reset all field in the form
   */
  function resetForm() {
    adForm.reset();
    resetPhoto();
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
    if (price.value === '' || price.value <= TYPE_TO_PRICE[typeOfHouse.value]) {
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


  function sendDataHandler(evt) {
    setFormValidation();
    if (isValid()) {
      evt.preventDefault();
      var data = new FormData(adForm);
      send(data, successSendHandler, errorSendHandler);
    }
  }


  function successSendHandler() {
    createSuccessMessage();
    adFormObj.submitHandler();
    var successPopup = document.querySelector('.success');

    function closePopupHandler() {
      successPopup.remove();
      document.removeEventListener('click', closePopupHandler);
      document.removeEventListener('keydown', closePopupHandler);
    }

    document.addEventListener('keydown', closePopupHandler);
    document.addEventListener('click', closePopupHandler);
  }

  function errorSendHandler() {
    createErrorMessage();
    var errorPopup = document.querySelector('.error');
    var button = errorPopup.querySelector('.error__button');
    button.addEventListener('click', function buttonClickHandler(evt) {
      evt.preventDefault();
      errorPopup.remove();
    });
  }


  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var rooms = document.querySelector('#room_number');
  var price = document.querySelector('#price');
  var typeOfHouse = document.querySelector('#type');
  var submitFormBtn = document.querySelector('.ad-form__submit');


  window.form = {
    activateForm: activateForm,
    deactivateForm: deactivateForm,
    adFormObj: adFormObj
  };
})();
