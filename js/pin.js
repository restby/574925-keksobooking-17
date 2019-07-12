'use strict';
(function () {
  /*
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
    window.server.mapPins.appendChild(fragment);
  };
  window.pin = {
    renderPins: renderPins
  };
  */

  // находим шаблон
  var mapPinTemplate = document.querySelector('#pin');
  // функция которая копирует начинку шаблона, добавляет разлиные свойства/стили/значения атрибутов к элементам внутри шаблона, создает и возвращает элемент
  var addData = function (pin) {
    // копирует всю начинку шаблона
    var element = mapPinTemplate.content.cloneNode(true);
    // в шаблоне находит структуру метки
    var mapPinElement = element.querySelector('.map__pin');
    // в этой структуре метки вставляет из данных полученных с сервера, адресс аватарки в img метки
    mapPinElement.querySelector('img').setAttribute('src', pin.author.avatar);
    // в этой структуре метки вставляет из данных полученных с сервера, alt у img = тип объявления метки
    mapPinElement.querySelector('img').setAttribute('alt', pin.offer.type);
    // в этой структуре метки вставляет координату Х метки из данных полученных с сервера
    mapPinElement.style.left = pin.location.x + 'px';
    // в этой структуре метки вставляет координату У метки из данных полученных с сервера
    mapPinElement.style.top = pin.location.y + 'px';
    return element;
  };
  // создаем функцию-рендер, которая получает в параметр данные с сервера и выполняет следующие действия:
  var renderPins = function (data) {
    // устанавливает количество отображаемых меток
    var takeNumber = data.length > 5 ? 5 : data.length;
    window.server.mapPins.innerHTML = '';
    // запускает цикл от 0 до количества отображаемых меток установленных ранее
    for (var i = 0; i < takeNumber; i++) {
      // на каждом шаге цикла вставляет в контейнер(где размещаются маги) измененный функцией-рендер(с использованием данных из ответа сервера) шаблон
      window.server.mapPins.appendChild(addData(data[i]));
    }
  };
  // отдаем наружу функцию - рендер
  window.pin = {
    renderPins: renderPins
  };
})();
