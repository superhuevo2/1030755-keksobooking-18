'use strict';
(function () {
  var NUMBER_OF_ELEMENTS = 5;
  var renderPins = window.map.renderPins;
  var removePins = window.map.removePins;
  var removeCard = window.map.removeCard;
  var debounce = window.debounce;

  var filterObject = {
    dataList: undefined,
  };

  function filterQuantity(dataList) {
    return dataList.slice(0, NUMBER_OF_ELEMENTS);
  }


  function isType(el) {
    switch (filterType.value) {
      case 'any':
        return true;
      default:
        return el.offer.type === filterType.value;
    }
  }

  function isPrice(el) {
    switch (filterPrice.value) {
      case 'any':
        return true;
      case 'middle':
        return (el.offer.price >= 10000 && el.offer.price < 50000);
      case 'low':
        return el.offer.price < 10000;
      case 'high':
        return el.offer.price >= 50000;
      default:
        return undefined;
    }
  }

  function isRooms(el) {
    switch (filterRooms.value) {
      case 'any':
        return true;
      case '1':
        return el.offer.rooms === 1;
      case '2':
        return el.offer.rooms === 2;
      case '3':
        return el.offer.rooms === 3;
      default:
        return undefined;
    }
  }

  function isGuests(el) {
    switch (filterGuests.value) {
      case 'any':
        return true;
      case '1':
        return el.offer.guests >= 1;
      case '2':
        return el.offer.guests >= 2;
      case '0':
        return el.offer.guests === 0;
      default:
        return undefined;
    }
  }

  function isFeatures(el, filter, feature) {
    if (filter.checked) {
      return el.offer.features.indexOf(feature) !== -1;
    } else {
      return true;
    }
  }


  function getFiltered(dataList) {
    var filteredList = dataList.filter(function (el) {
      return isType(el) &&
          isPrice(el) &&
          isRooms(el) &&
          isGuests(el) &&
          isFeatures(el, filterWifi, 'wifi') &&
          isFeatures(el, filterDishwasher, 'dishwasher') &&
          isFeatures(el, filterParking, 'parking') &&
          isFeatures(el, filterWasher, 'washer') &&
          isFeatures(el, filterElevator, 'elevator') &&
          isFeatures(el, filterConditioner, 'conditioner');
    });
    removeCard();
    removePins();
    renderPins(filterQuantity(filteredList));
  }

  var filterChangeHandler = debounce(function filterChangeHandler() {
    getFiltered(filterObject.dataList);
  });


  var filterType = document.querySelector('.map__filter[id="housing-type"]');
  var filterPrice = document.querySelector('.map__filter[id="housing-price"]');
  var filterRooms = document.querySelector('.map__filter[id="housing-rooms"]');
  var filterGuests = document.querySelector('.map__filter[id="housing-guests"]');
  var filterWifi = document.querySelector('#filter-wifi');
  var filterDishwasher = document.querySelector('#filter-dishwasher');
  var filterParking = document.querySelector('#filter-parking');
  var filterWasher = document.querySelector('#filter-washer');
  var filterElevator = document.querySelector('#filter-elevator');
  var filterConditioner = document.querySelector('#filter-conditioner');

  filterType.addEventListener('change', filterChangeHandler);
  filterPrice.addEventListener('input', filterChangeHandler);
  filterRooms.addEventListener('input', filterChangeHandler);
  filterGuests.addEventListener('input', filterChangeHandler);
  filterWifi.addEventListener('input', filterChangeHandler);
  filterDishwasher.addEventListener('input', filterChangeHandler);
  filterParking.addEventListener('input', filterChangeHandler);
  filterWasher.addEventListener('input', filterChangeHandler);
  filterElevator.addEventListener('input', filterChangeHandler);
  filterConditioner.addEventListener('input', filterChangeHandler);


  window.filter = {
    filterObject: filterObject,
    filterQuantity: filterQuantity
  };
})();
