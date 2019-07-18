'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilterContainer = map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card');
  // функция которая формирует по данным с сервера структуру объявления
  var addOfferData = function (pin) {
    // копирует всю начинку шаблона
    var element = cardTemplate.content.cloneNode(true);
    // в шаблоне находит структуру объявления
    var cardElement = element.querySelector('.map__card');
    // формирует название объявления
    cardElement.querySelector('.popup__title').textContent = pin.offer.title;
    // формирует адрес объявления
    cardElement.querySelector('.popup__text--address').textContent = pin.offer.address;
    // формирует цену объявления
    cardElement.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    // формирует тип жилья в объявлении:
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
    cardElement.querySelector('.popup__type').textContent = pinOfferType;
    // формирует количество комнат и гостей в объявлении
    cardElement.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты' + ' для ' + pin.offer.guests + ' гостей';
    // формирует время заезда и выезда в объявлении
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до  ' + pin.offer.checkout;
    // формирует удобства объявления
    // находит контейнер
    var featuresList = cardElement.querySelector('.popup__features');
    // очищает контейнер
    featuresList.innerHTML = '';
    // получает массив значений с сервера
    var pinOfferFeaturesArr = pin.offer.features;
    // перебирает массив с сервера в котором формирует название класса, создает тег и вставляет его в контейнер
    pinOfferFeaturesArr.forEach(function (it) {
      var feature = 'popup__feature--' + it;
      // создает tag <li>, применяет к нему сформированный класс и вставляет его в контейнер
      var tagLi = document.createElement('li');
      tagLi.className = 'popup__feature ' + feature;
      featuresList.appendChild(tagLi);
    });
    // формирует описание объявления
    cardElement.querySelector('.popup__description').textContent = pin.offer.description;
    // формирует список фотографий объявления
    // находит контейнер
    var photoList = cardElement.querySelector('.popup__photos');
    // очищает контейнер
    photoList.innerHTML = '';
    // получает массив значений с сервера
    var pinOfferPhotoArr = pin.offer.photos;
    // перебирает массив с сервера в котором создает тег даем название класса, прописывает атрибуты, и вставляет его в контейнер
    pinOfferPhotoArr.forEach(function (it) {
      // создает tag <img> и вставляет его в контейнер
      var tagImg = document.createElement('img');
      // прописывает атрибуты
      function setAttributes(el, options) {
        Object.keys(options).forEach(function (attr) {
          el.setAttribute(attr, options[attr]);
        });
      }
      setAttributes(tagImg, {'class': 'popup__photo', 'src': it, 'alt': 'фотография жилья', 'width': '45', 'height': '40'});
      // вставляет его в контейнер
      photoList.appendChild(tagImg);
    });
    // Заменяет фото аватарки пользователя
    cardElement.querySelector('.popup__avatar').setAttribute('src', pin.author.avatar);

    // ВРЕМЕННО! находим кнопку закрыть и вешаем событие,которое по клику удаляет карточку
    var closeBtn = cardElement.querySelector('.popup__close');
    closeBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      cardElement.style.display = 'none';
    });
    return element;
  };
  /*
    // функция - открываем окно и добавляем обработчик события, который закрывает окно по клавише ESC
  var openPopup = function () {
    window.util.setup.classList.remove('hidden');
    // добавляет обработчик события, который закрывает окно по клавише ESC
    document.addEventListener('keydown', onPopupEscPress);
    // возвращаем окно в первоначальное положжение
    window.util.setup.style.left = START_LEFT_POSITION + 'px';
    window.util.setup.style.top = START_TOP_POSITION + 'px';
  };
  // находим поле ввода имени мага
  var userNameInput = window.util.setup.querySelector('.setup-user-name');
  // функция - закрываем окно по клавише ESC
  var onPopupEscPress = function (evt) {
    if (userNameInput !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
    }
  };
  // открываем окно по клику на кнопку
  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  // открываем окно по клавише ENTER по иконке
  iconDialog.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });
  // закрываем окно по клику на кнопку
  setupClose.addEventListener('click', function () {
    closePopup();
  });
  // закрываем окно по клавише ENTER по кнопке закрытия
  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });
  // функция - закрываем окно и удаляет обработчик события, который закрывает окно по клавише ESC
  var closePopup = function () {
    window.util.setup.classList.add('hidden');
    // удаляет обработчик события, который закрывает окно по клавише ESC
    document.removeEventListener('keydown', onPopupEscPress);
  };
  */
  // саздаем функуцию, которая отрисовывает объявления в кол-ве 1 шт.
  var renderCard = function (data) {
    // var dataIndex = [];
    // data.forEach(function (it) {
    //   dataIndex.push(it);
    // });
    // console.log(dataIndex);
    var takeNumber = 1;
    // запускает проверку и если уже есть открытая карточка удаляет ее
    document.querySelectorAll('.popup').forEach(function (it) {
      it.style.display = 'none';
    });
    // вставляет карточку
    map.insertBefore(addOfferData(data[takeNumber]), mapFilterContainer);
  };
  window.card = {
    renderCard: renderCard
  };
})();
