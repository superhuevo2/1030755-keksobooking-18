'use strict';
//константы
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00','13:00','14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CORRECT_PIN_X = 25;
var CORRECT_PIN_Y = 70;

//функции
/**
 * generate random integer.
 * @param {number} first the first number from a range; must be >=0.
 * @param {number} last the last number from a range; must be >=0.
 * @return {number} a random number within the range.
 */
function genRandom(from, last) {
  return from + Math.floor(Math.random()* (last - from + 1)) //прибавил единицу, чтоб last было включено в рендж, из которого берется случайное число
}

/**
 * select an element from an array
 * @param {array} arr an array from which an element will be selected.
 * @return {*} selected element
 */
function selectFrom(arr) {
  return arr[genRandom(0, arr.length - 1)]
}

/**
 * generate a list of links to images.
 * @return {array} a list of links to images.
 */
function genAvatar() {
  var avatar = [];

  while (avatar.length <  8) {
    var element = "img/avatars/user0" + genRandom(1, 8) + '.png';
    if (avatar.indexOf(element) === -1) {
      avatar.push(element)
    }
  }
  return avatar
}
/**
 *generate a list of links
 * @return {array} a list of photos' links
 */
function genPhotoLink() {
  var arr = [];
  var arrLength = genRandom(1, 6);

  for (var i = 0; i < arrLength; i++) {
    var element = 'http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg';
    arr.push(element);
  }
  return arr
}

/**
 * generate random string
 * @param {number} quantity quantity of words which function returned
 * @return {string} generated string
 */
function genString(quantity) {
  var alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  var wordLength = genRandom(1, 10);
  var letter = '';

  for (var i = 0; i < quantity; i++) {
    var word = '';
    var wordLength = genRandom(1, 10);
    for (var l = 0; l < wordLength; l++) {
      word += alphabet[genRandom(0, alphabet.length-1)]
    }
    if (l != quantity - 1) {
      word += ' ';
    }
    letter += word;
  }
  return letter
}

/**
 * generate a list of 8 advertisements.
 * @return {array} a list of generated advertisements.
 */
function generateAdList() {
  var avatar = [];
  avatar.push.apply(avatar, genAvatar());
  var maxWidth = document.querySelector('.map').offsetWidth
  var adList = [];

  for (var i = 0; i < 8; i++) {
    var ad = {};

    ad['author'] = {
      'avatar': avatar.pop(),
    };

    ad['location'] = {
      'x': genRandom(0, maxWidth),
      'y': genRandom(130, 630)
    };

    ad['offer'] =  {
      'title': genString(genRandom(1, 3)),
      'address': String(ad.location.x) + ', ' + String(ad.location.y),
      'price': genRandom(1000, 10000),
      'type': selectFrom(TYPES),
      'rooms': genRandom(1, 5),
      'guests': genRandom(1, 10),
      'checkin': selectFrom(TIMES),
      'checkout': selectFrom(TIMES),
      'features': [].concat(FEATURES.slice(0, genRandom(0, FEATURES.length))),
      'description': genString(genRandom(8, 15)),
      'photos': genPhotoLink()
    }
    adList.push(ad);
  }
  return adList
}
/**
 * create a document fragment from template and data.
 * @param {object} template a template for copying.
 * @param {array} objList a list from wich data writes.
 * @return {object} a fragment of DOM.
 */
function makePins(template, objList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objList.length; i++) {
    var element = template.cloneNode(true);
    var image = element.querySelector('img');
    element.setAttribute('style', 'left: ' + (objList[i].location.x - CORRECT_PIN_X)
        + 'px; top: ' + (objList[i].location.y - CORRECT_PIN_Y) + 'px');
    image.setAttribute('src', objList[i].author.avatar);
    image.setAttribute('alt', objList[i].offer.title);

    fragment.appendChild(element);
  }
  return fragment
}

//работа с данными
var adList = generateAdList();

//работа с дом
var map = document.querySelector('.map');
map.classList.remove('map--fade');

var pinsField = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

pinsField.appendChild(makePins(template, adList));
