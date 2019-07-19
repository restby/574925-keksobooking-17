'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = window.form.form.querySelector('#address');
  // функция которая устанавливает у '#address' значение value с новыми координатами
  var addNewPosition = function (left, top, width, height) {
    var mapPinLeft = left + Math.round(width / 2);
    var mapPinTop = top + height;
    var newPosition = mapPinLeft + ', ' + mapPinTop;
    addressInput.setAttribute('value', newPosition);
  };
  // массив для данных с сервера
  var pinsArr = [];
  // функция которая фильтрует полученные данные с сервера и перерисовывает метки в зависимости от выбора типа жилья
  var updatePins = function () {
    var filterTypePins = pinsArr.filter(function (it) {
      return it.offer.type === housingTypeValue;
    });
    window.pin.renderPins(filterTypePins);
  };
  // переменная для значений выбора типа жилья
  var housingTypeValue;
  var housingTypeInput = document.querySelector('#housing-type');
  // функция которая по изменению значения select типа жилья перерисовывает метки
  housingTypeInput.onchange = function () {
    // запускает проверку (на тип жилья)
    if (housingTypeInput.value === 'any') {
      window.pin.renderPins(pinsArr);
    } else {
      housingTypeValue = housingTypeInput.value;
      updatePins();
    }
  };
  // функция успешного ответа сервера, которая записывает данные сервера в переменную и запускает функцию отрисовки с полученными данными
  var successHandler = function (data) {
    pinsArr = data;
    window.pin.renderPins(pinsArr);
  };
  // функция по нажатию кнопки мыши, которая "активирует" форму и запускает отрисовку меток
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded')) {
      window.form.editsForm();
      map.classList.remove('map--faded');
      window.form.form.classList.remove('ad-form--disabled');
      window.server.load(successHandler, window.server.errorHandler);
    }
    // первоначальные координаты маркера
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    addNewPosition();
    // функция для расчета и установки координат маркера при сещении
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var moveLeft = mainPin.offsetLeft - shift.x;
      var moveTop = mainPin.offsetTop - shift.y;
      if (moveTop <= 565 && moveTop >= 65) {
        mainPin.style.top = moveTop + 'px';
      }
      if (moveLeft <= (map.offsetWidth - mainPin.offsetWidth / 2) && moveLeft >= (0 - mainPin.offsetWidth / 2)) {
        mainPin.style.left = moveLeft + 'px';
      }
      addNewPosition(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth, mainPin.offsetHeight);
    };
    // функция которая удаляет события смещения и нажатия
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      addNewPosition(mainPin.offsetLeft, mainPin.offsetTop, mainPin.offsetWidth, mainPin.offsetHeight);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
