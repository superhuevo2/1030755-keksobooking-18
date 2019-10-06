'use strict';

(function () {
  /**
   * finds whether there is a feature in a fearureList
   * @param {ArrayLike} featureList
   * @param {String} feature
   * @return {Boolean} true or false
   */
  function isFeatureInList(featureList, feature) {
    var counter = 0;
    var arr = Array.prototype.slice.call(featureList);

    while (feature.className.indexOf(arr[counter]) < 0) {
      counter += 1;
      if (counter === arr.length) {
        return false;
      }
    }
    return true;
  }

  /**
   * generate a fragment of DOM's elements from an element
   * @param {Object} element
   * @param {Array} linksList
   * @return {Object} fragment of elements
   */
  function genPhotoEl(element, linksList) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < linksList.length; i++) {
      var newElement = element.cloneNode(true);
      newElement.setAttribute('src', linksList[i]);
      fragment.appendChild(newElement);
    }
    return fragment;
  }

  /**
   * to convert a type from a readable form
   * @param {string} type
   * @return {string}
   */
  function defineTypeOfHouse(type) {
    var container = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец',
    };
    return container[type] || 'Неизвестный тип';
  }

  /**
   * remove elements from objFrom if those elements dont exist in objectList
   * @param {Object} objFrom
   * @param {ArrayLike} objectList a list of appropriate elements
   * @param {Function} determinant define is an element appropriate or not
   */
  function removeRedundantObjects(objFrom, objectList, determinant) {

    for (var i = objFrom.children.length - 1; i >= 0; i--) {
      if (!determinant(objectList, objFrom.children[i])) {
        objFrom.removeChild(objFrom.children[i]);
      }
    }
  }

  /**
   * create card which contain information about an offer
   * @param {*} template
   * @param {*} adObj
   * @return {Object} document.fragment obj of rent offer
   */
  function createCard(template, adObj) {
    var element = template.cloneNode(true);

    var title = element.querySelector('.popup__title');
    var address = element.querySelector(' .popup__text--address');
    var price = element.querySelector('.popup__text--price');
    var type = element.querySelector('.popup__type');
    var capacity = element.querySelector('.popup__text--capacity');
    var time = element.querySelector('.popup__text--time');
    var featuresList = element.querySelector('.popup__features');
    var description = element.querySelector('.popup__description');
    var photos = element.querySelector('.popup__photos');
    var avatar = element.querySelector('.popup__avatar');

    title.textContent = adObj.offer.title;
    address.textContent = adObj.offer.address;
    price.textContent = adObj.offer.price + '₽/ночь';
    type.textContent = defineTypeOfHouse(adObj.offer.type);
    capacity.textContent = adObj.offer.rooms + ' комнаты для '
        + adObj.offer.guests + ' гостей';
    time.textContent = 'Заезд после ' + adObj.offer.checkin
        + ', выезд до ' + adObj.offer.checkout;

    removeRedundantObjects(featuresList, adObj.offer.features, isFeatureInList);
    description.textContent = adObj.offer.description;
    photos.appendChild(genPhotoEl(photos.firstElementChild, adObj.offer.photos));
    photos.removeChild(photos.firstElementChild);
    avatar.setAttribute('src', adObj.author.avatar);

    return element;
  }

  window.card = {
    createCard: createCard
  };
})();


