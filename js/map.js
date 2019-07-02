'use strict';
(function () {
  // 3 ГЕНЕРАЦИЕЯ DOM ЭЛЕМЕНТОВ И ПРИСВОЕНИЕМ ИМ ДАННЫХ ИЗ МАССИВА И ВНЕДРЕНИЕ ИХ В ВЕРСТКУ
  // 3-1 находим блок куда будут вставляться данные
  var mapPins = document.querySelector('.map__pins');
  // 3-2 находим шаблон
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // 3-3 функция которая вставляет значения из массива мок в шаблон
  var addData = function (_arr) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.querySelector('img').setAttribute('src', _arr.author.avatar);
    mapPinElement.querySelector('img').setAttribute('alt', _arr.offer.type);
    mapPinElement.style.left = _arr.location.x + 'px';
    mapPinElement.style.top = _arr.location.y + 'px';
    return mapPinElement;
  };
  // 3-4 создаем контейнер
  var fragment = document.createDocumentFragment();
  // 3-5 цикл запускающий функцию(которая вставляет значения) зависящий от длинны массива мок
  for (var j = 0; j < window.data.mock.length; j++) {
    fragment.appendChild(addData(window.data.mock[j]));
  }
  // устанавливаем у '#address' значение value  с новыми координатами от mapPinMain(острого конца маркера)
  var addNewPosition = function (left, top, width, height) {
    var mapPinLeft = left + Math.round(width / 2);
    var mapPinTop = top + height;
    var newPosition = mapPinLeft + ', ' + mapPinTop;
    inputAddress.setAttribute('value', newPosition);
  };
})();
