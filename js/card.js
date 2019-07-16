'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilterContainer = map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card');
  // функция которая формирует по данным с сервера структура объявления
  var addOfferData = function (pin) {
    // копирует всю начинку шаблона
    var card = cardTemplate.content.cloneNode(true);
    // в шаблоне находит структуру объявления
    var cardElement = card.querySelector('.map__card');
    // формирует название объявления
    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    // формирует адрес объявления
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    // формирует цену объявления
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    // создаем массив типов объявлений
    var typeOfferArray = ['flat', 'bungalo', 'house', 'palace'];
    // создаем массив-транслит типов объявлений
    var typeTranslitOfferArray = ['Квартира', 'Бунгало', 'Дом', 'Дворец'];
    // создаем массив из индексов
    var typeIndex = [];
    typeOfferArray.forEach(function (it) {
      typeIndex.push(it);
    });
    var pinOfferType = typeTranslitOfferArray[typeOfferArray.indexOf(pin.offer.type)];
    // формирует тип объявления
    cardElement.querySelector('.popup__type').textContent = pinOfferType;

    // Выведите количество гостей и комнат offer.rooms и offer.guests в блок.popup__text--capacity строкой вида { { offer.rooms } } комнаты для { { offer.guests } } гостей.Например, 2 комнаты для 3 гостей.

    // Время заезда и выезда offer.checkin и offer.checkout в блок.popup__text--time строкой вида Заезд после { { offer.checkin } }, выезд до { { offer.checkout } }.Например, заезд после 14: 00, выезд до 12: 00.


    // формирует удобства объявления
    // находим контейнер - список "фишек"
    var featuresList = cardElement.querySelector('.popup__features');
    // очищаем контейнер
    featuresList.innerHTML = '';
    // получаем массив значений фишек с сервера
    var pinOfferFeaturesArr = pin.offer.features;
    // запускаем цикл в котором формируем название класса используя значение из массива с сервера, создает тег <li> и вставляет его в контейнер
    for (var i = 0; i < pinOfferFeaturesArr.length; i++) {
      var feature = 'popup__feature--' + pinOfferFeaturesArr[i];
      // создаем tag <li>, применяем к нему сформированный класс и вставляем его в контейнер
      var tagLi = document.createElement('li');
      tagLi.className = 'popup__feature ' + feature;
      featuresList.appendChild(tagLi);
    }

    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    // В блок.popup__photos выведите все фотографии из списка offer.photos.Каждая из строк массива photos должна записываться как src соответствующего изображения.
    // cardElement.querySelector('.popup__photos').textContent = pin.offer.description;
    return cardElement;
  };
  // саздаем функуцию, которая отрисовывает объявления
  var renderCard = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      if (i === 0) {
        fragment.appendChild(addOfferData(data[i]));
      }
    }
    map.insertBefore(fragment, mapFilterContainer);
  };
  window.card = {
    renderCard: renderCard
  };
})();
