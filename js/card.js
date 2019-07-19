'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilterContainer = map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card');
  // функция которая формирует по данным с сервера структуру объявления
  var buildCard = function (pin) {
    var element = cardTemplate.content.cloneNode(true);
    var cardElement = element.querySelector('.map__card');
    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    /** блок для формирования типа жилья */
    // создает массив типов объявлений
    var typeOfferArray = ['flat', 'bungalo', 'house', 'palace'];
    // создает массив-транслит типов объявлений
    var typeTranslitArray = ['Квартира', 'Бунгало', 'Дом', 'Дворец'];
    // создает массив из индексов
    var typeIndex = [];
    typeOfferArray.forEach(function (it) {
      typeIndex.push(it);
    });
    var pinOfferType = typeTranslitArray[typeOfferArray.indexOf(pin.offer.type)];
    /** */
    // формирует тип жилья в объявлении
    cardElement.querySelector('.popup__type').textContent = pinOfferType;
    cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты' + ' для ' + pin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до  ' + pin.offer.checkout;
    // формирует удобства объявления
    /** блок для формирования типа жилья */
    var featuresList = cardElement.querySelector('.popup__features');
    featuresList.innerHTML = '';
    var pinOfferFeaturesArr = pin.offer.features;
    // создает функцию, которая перебирает массив с сервера в котором формирует название класса, создает тег и вставляет его в контейнер
    pinOfferFeaturesArr.forEach(function (it) {
      var feature = 'popup__feature--' + it;
      var tagLi = document.createElement('li');
      tagLi.className = 'popup__feature ' + feature;
      featuresList.appendChild(tagLi);
    });
    /** */
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    // формирует список фотографий объявления
    /** блок для формирования фотографий */
    var photoList = cardElement.querySelector('.popup__photos');
    photoList.innerHTML = '';
    var pinOfferPhotoArr = pin.offer.photos;
    // функция, которая перебирает массив данных с сервера, создает тег, дает название класса, прописывает атрибуты, и вставляет его в контейнер
    pinOfferPhotoArr.forEach(function (it) {
      var tagImg = document.createElement('img');
      function setAttributes(el, options) {
        Object.keys(options).forEach(function (attr) {
          el.setAttribute(attr, options[attr]);
        });
      }
      setAttributes(tagImg, {'class': 'popup__photo', 'src': it, 'alt': 'фотография жилья', 'width': '45', 'height': '40'});
      photoList.appendChild(tagImg);
    });
    /** */
    cardElement.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);
    var closeBtn = cardElement.querySelector('.popup__close');
    // функция которая по клавише ESC запускает функцию, которая удаляет элемент
    var onPopupEscPress = function (evt) {
      window.util.isEscEvent(evt, closePopup);
    };
    // функция которая добавляет обработчик события по клавише ESC
    (function () {
      document.addEventListener('keydown', onPopupEscPress);
    })();
    // функция которая удаляет элемент и удаляет обработчик события по клавише ESC
    var closePopup = function () {
      map.removeChild(cardElement);
      document.removeEventListener('keydown', onPopupEscPress);
    };
    // закрывает карточку по клику на кнопке
    closeBtn.addEventListener('click', function () {
      closePopup();
    });
    // закрывает карточку по клавише ENTER на кнопке
    closeBtn.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });
    return element;
  };
  // функуция, которая отрисовывает карточку объявления и удаляет, если уже отрисована, предыдущую карточку.
  var renderCards = function (data) {
    document.querySelectorAll('.popup').forEach(function (it) {
      map.removeChild(it);
    });
    map.insertBefore(buildCard(data), mapFilterContainer);
  };
  window.card = {
    renderCards: renderCards
  };
})();
