'use strict';

(function () {
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
   *
   * @param {*} element DOM element,
   * @param {*} features
   */
  function selectFeatures(element, features) {
    for (var i = element.children.length - 1; i >= 0; i--) {
      if (features.indexOf(element.children[i]) === -1) {
        element.removeChild(element.children[i]);
      }
    }
  }

  /**
   * create card which contain information about an offer
   * @param {object} template
   * @param {object} data
   * @return {Object} document.fragment obj of rent offer
   */
  function createCardElement(template, data) {
    var element = template.cloneNode(true);

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
    selectFeatures(featuresElement, data.offer.features);
    description.textContent = data.offer.description;
    photos.appendChild(genPhotoEl(photos.firstElementChild, data.offer.photos));
    photos.removeChild(photos.firstElementChild);
    avatar.setAttribute('src', data.author.avatar);

    return element;
  }


  function createCard(data) {
    var card = createCardElement(cardTemplate, data);

    return card;
  }

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  window.card = {
    createCard: createCard
  };
})();


