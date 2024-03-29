'use strict';

(function () {
  var TYPE_TO_NAME = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };
  var SECOND_CLASS_INDEX = 1;
  var FEATURE_INDEX_START = 16;

  /**
   * generate a fragment of DOM's elements from an element
   * @param {Object} element
   * @param {Array} linksList
   * @return {Object} fragment of elements
   */
  function genPhotoEl(element, linksList) {
    var fragment = document.createDocumentFragment();

    linksList.forEach(function (el) {
      var newElement = element.cloneNode(true);
      newElement.setAttribute('src', el);
      fragment.appendChild(newElement);
    });


    return fragment;
  }

  /**
   * to convert a type from a readable form
   * @param {string} type
   * @return {string}
   */
  function defineTypeOfHouse(type) {

    return TYPE_TO_NAME[type] || 'Неизвестный тип';
  }

  /**
   *
   * @param {*} element DOM element,
   * @param {*} features
   */
  function selectFeatures(element, features) {
    for (var i = element.children.length - 1; i >= 0; i--) {
      if (features.indexOf(element.children[i].classList[SECOND_CLASS_INDEX].slice(FEATURE_INDEX_START)) === -1) {
        element.removeChild(element.children[i]);
      }
    }
  }

  /**
   * create card which contain information about an offer
   * @param {object} data
   * @return {Object} document.fragment obj of rent offer
   */
  function createCard(data) {
    var element = cardTemplate.cloneNode(true);

    var title = element.querySelector('.popup__title');
    var address = element.querySelector(' .popup__text--address');
    var price = element.querySelector('.popup__text--price');
    var type = element.querySelector('.popup__type');
    var capacity = element.querySelector('.popup__text--capacity');
    var time = element.querySelector('.popup__text--time');
    var featuresElement = element.querySelector('.popup__features');
    var description = element.querySelector('.popup__description');
    var photos = element.querySelector('.popup__photos');
    var avatar = element.querySelector('.popup__avatar');

    title.textContent = data.offer.title;
    address.textContent = data.offer.address;
    price.textContent = data.offer.price + '₽/ночь';

    type.textContent = defineTypeOfHouse(data.offer.type);

    capacity.textContent = data.offer.rooms + ' комнаты для '
        + data.offer.guests + ' гостей';

    time.textContent = 'Заезд после ' + data.offer.checkin
        + ', выезд до ' + data.offer.checkout;
    if (data.offer.features && data.offer.features.length > 0) {
      selectFeatures(featuresElement, data.offer.features);
    } else {
      featuresElement.remove();
    }

    if (data.offer.description) {
      description.remove();
    } else {
      description.textContent = data.offer.description;
    }

    if (data.offer.photos && data.offer.photos.length > 0) {
      photos.appendChild(genPhotoEl(photos.firstElementChild, data.offer.photos));
      photos.removeChild(photos.firstElementChild);
    } else {
      photos.remove();
    }

    avatar.setAttribute('src', data.author.avatar);

    return element;
  }

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  window.card = {
    createCard: createCard
  };
})();


