'use strict';
(function () {
// находим элемент '.map__pin--main'
var mapPinMain = document.querySelector('.map__pin--main');
  // вешаем обработчик для перемещения маркера
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded')) {
      removeAttribute();
    }
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
      if (moveTop <= 630 && moveTop >= 130) {
        mapPinMain.style.top = moveTop + 'px';
      }
      // устанавливаем новые координаты в рамках по оси X
      if (moveLeft <= (map.offsetWidth - mapPinMain.offsetWidth / 2) && moveLeft >= (0 - mapPinMain.offsetWidth / 2)) {
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
