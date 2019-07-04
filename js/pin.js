'use strict';
(function () {
  // находим блок куда будут вставляться данные
  var mapPins = document.querySelector('.map__pins');
  // находим шаблон
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // функция которая копирует начинку шаблона, добавляет разлиные свойства/стили/значения атрибутов к элементам внутри шаблона и создает элемент
  var addData = function (_arr) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.querySelector('img').setAttribute('src', _arr.author.avatar);
    mapPinElement.querySelector('img').setAttribute('alt', _arr.offer.type);
    mapPinElement.style.left = _arr.location.x + 'px';
    mapPinElement.style.top = _arr.location.y + 'px';
    return mapPinElement;
  };
  // функция успешного ответа от сервера
  var successHandler = function (data) {
    // создаем контейнер
    var fragment = document.createDocumentFragment();
    // цикл запускающий функцию(которая вставляет значения)
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(addData(data[i]));
    }
    mapPins.appendChild(fragment);
  };
  // функция ошибки - ответа сервера
  var errorHandler = function () {
    // находим шаблон
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    // var errorBtn = document.querySelector('.error__button');
    // функция перезагрузки страницы
    var refreshPage = function () {
      window.location.reload();
    };
    // функция которая копирует начинку шаблона
    var addErrorMessage = function (_arr) {
      var errorElement = errorTemplate.cloneNode(true);
      return errorElement;
    };
    // создаем контейнер
    var fragment = document.createDocumentFragment();
    fragment.appendChild(addErrorMessage());
    mapPins.appendChild(fragment);
    document.querySelector('.error__button').addEventListener('click', refreshPage);
  };
  window.pin = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
  // window.load(successHandler, errorHandler);
})();
