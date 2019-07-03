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
  // находим элемент '.map__pin--main'
  var mapPinMain = document.querySelector('.map__pin--main');
  // находим элемент '#address'
  var inputAddress = window.form.adForm.querySelector('#address');
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (window.data.map.classList.contains('map--faded')) {
      window.form.editsForm();
      window.data.map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
    }
    mapPins.appendChild(fragment);
    // первоначальные координаты маркера
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // устанавливаем у '#address' значение value  с новыми координатами от mapPinMain(острого конца маркера)
    var addNewPosition = function (left, top, width, height) {
      var mapPinLeft = left + Math.round(width / 2);
      var mapPinTop = top + height;
      var newPosition = mapPinLeft + ', ' + mapPinTop;
      inputAddress.setAttribute('value', newPosition);
    };
    // функция для расчета и установки координат маркера при сещении
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // считаем смещение мыши
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      // новые координаты
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // устанавливаем новые координаты в рамках по оси Y
      var moveLeft = mapPinMain.offsetLeft - shift.x;
      var moveTop = mapPinMain.offsetTop - shift.y;
      if (moveTop <= 565 && moveTop >= 65) {
        mapPinMain.style.top = moveTop + 'px';
      }
      // устанавливаем новые координаты в рамках по оси X
      if (moveLeft <= (window.data.map.offsetWidth - mapPinMain.offsetWidth / 2) && moveLeft >= (0 - mapPinMain.offsetWidth / 2)) {
        mapPinMain.style.left = moveLeft + 'px';
      }
      addNewPosition(mapPinMain.offsetLeft, mapPinMain.offsetTop, mapPinMain.offsetWidth, mapPinMain.offsetHeight);
    };
    // функция на "отжатие" кнопки мыши которая удаляет события смещения и нажатия
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      addNewPosition(mapPinMain.offsetLeft, mapPinMain.offsetTop, mapPinMain.offsetWidth, mapPinMain.offsetHeight);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
