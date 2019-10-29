'use strict';
(function () {
  var NUMBER_OF_ELEMENTS = 5;
  var renderPins = window.map.renderPins;
  var removePins = window.map.removePins;

  var filterObject = {
    dataList: undefined
  };

  function filterQuantity(dataList) {
    return dataList.slice(0, NUMBER_OF_ELEMENTS);
  }

  function selectType(dataList, type) {
    var filteredPins;
    switch (type) {
      case 'any':
        filteredPins = dataList;
        break;
      default:
        filteredPins = dataList.filter(function (el) {
          return el.offer.type === type;
        });
    }
    removePins();
    renderPins(filterQuantity(filteredPins));
  }

  function filterTypeHandler(evt) {
    selectType(filterObject.dataList, evt.target.value);
  }


  var filterType = document.querySelector('.map__filter[id="housing-type"]');
  filterType.addEventListener('input', filterTypeHandler);


  window.filter = {
    filterObject: filterObject,
    filterQuantity: filterQuantity
  };

  return window.filter.filterObject;
})();
