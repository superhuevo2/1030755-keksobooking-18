'use strict';

(function () {
  var isEsc = window.util.isEsc;

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
    var featuresList = element.querySelector('.popup__features');
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

    removeRedundantObjects(featuresList, data.offer.features, isFeatureInList);
    description.textContent = data.offer.description;
    photos.appendChild(genPhotoEl(photos.firstElementChild, data.offer.photos));
    photos.removeChild(photos.firstElementChild);
    avatar.setAttribute('src', data.author.avatar);

    return element;
  }


  function removeCard() {
    var card = document.querySelector('.map__card');
    document.removeEventListener('keydown', closeKeydownHandler);
    card.remove();
  }

  function closeClickHandler() {
    removeCard();
  }


  function closeKeydownHandler(evt) {
    if (isEsc(evt)) {
      removeCard();
    }
  }


  function addCardListeners(card) {
    var cardCloseBtn = card.querySelector('.popup__close');

    cardCloseBtn.addEventListener('click', closeClickHandler);
    document.addEventListener('keydown', closeKeydownHandler);
  }


  function createCard(data) {
    var card = createCardElement(cardTemplate, data);
    addCardListeners(card);

    return card;
  }

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  window.card = {
    createCard: createCard,
    removeCard: removeCard
  };
})();


