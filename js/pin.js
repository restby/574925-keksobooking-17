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
  var renderPins = function (data) {
    // создаем контейнер
    var fragment = document.createDocumentFragment();
    // цикл запускающий функцию(которая вставляет значения)
    for (var i = 0; i < 5; i++) {
      fragment.appendChild(addData(data[i]));
    }
    mapPins.appendChild(fragment);
  };
  window.pin = {
    renderPins: renderPins,
    mapPins: mapPins
  };
})();
