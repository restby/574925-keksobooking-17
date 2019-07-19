'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin');
  // функция которая копирует начинку шаблона, добавляет свойства/стили/значения атрибутов к элементам внутри шаблона и возвращает элемент
  var buildPin = function (pin) {
    var element = mapPinTemplate.content.cloneNode(true);
    var mapPinElement = element.querySelector('.map__pin');
    mapPinElement.querySelector('img').setAttribute('src', pin.author.avatar);
    mapPinElement.querySelector('img').setAttribute('alt', pin.offer.type);
    mapPinElement.style.left = pin.location.x + 'px';
    mapPinElement.style.top = pin.location.y + 'px';
    mapPinElement.addEventListener('click', function (e) {
      e.preventDefault();
      window.card.renderCards(pin);
    });
    return element;
  };
  // функция-рендер, которая получает в параметр данные с сервера, устанавливает количество отображаемых меток, удаляет старые метки и отрисовывает новые
  var renderPins = function (data) {
    var takeNumber = data.length > 5 ? 5 : data.length;
    /** блок очистки при смене типа жилья: */
    document.querySelectorAll('.map__pin').forEach(function (it) {
      if (!it.classList.contains('map__pin--main')) {
        document.querySelector('.map__pins').removeChild(it);
      }
    });
    /** */
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(buildPin(data[i]));
    }
  };
  window.pin = {
    renderPins: renderPins,
    mapPins: mapPins
  };
})();
