'use strict';
(function () {
  // ГЕНЕРАЦИЕЯ DOM ЭЛЕМЕНТОВ, ПРИСВОЕНИЕМ ИМ ДАННЫХ И ВНЕДРЕНИЕ ИХ В ВЕРСТКУ
  var map = document.querySelector('.map');
  // находим элемент '.map__pin--main'
  var mapPinMain = document.querySelector('.map__pin--main');
  // находим элемент '#address'
  var inputAddress = window.form.adForm.querySelector('#address');
  // создаем функцию которая устанавливает у '#address' значение value  с новыми координатами от mapPinMain(острого конца маркера)
  var addNewPosition = function (left, top, width, height) {
    var mapPinLeft = left + Math.round(width / 2);
    var mapPinTop = top + height;
    var newPosition = mapPinLeft + ', ' + mapPinTop;
    inputAddress.setAttribute('value', newPosition);
  };


/** */
  // создаем массив, куда сохраним позже полученные данные с сервера
  var pins = [];
  var housingTypeValue;
  var updatePins = function () {
    var sameTypePins = pins.filter(function (it) {
      return it.offer.type === housingTypeValue;
    });
    // вызывает внешнюю функцию-рендер
    window.pin.renderPins(sameTypePins);
  };
  // находим элемент фильтра '#housing-type'
  var housingType = document.querySelector('#housing-type');
  // создаем функцию которая будет по изменению значения select изменять минимальное значения цены и первоначальную цену
  housingType.onchange = function () {
    // запускаем проверку (на тип жилья)
    if (housingType.value === 'bungalo') {
      housingTypeValue = housingType.value;
      updatePins();
    } else if (housingType.value === 'flat') {
      housingTypeValue = housingType.value;
      updatePins();
    } else if (housingType.value === 'house') {
      housingTypeValue = housingType.value;
      updatePins();
    } else if (housingType.value === 'palace') {
      housingTypeValue = housingType.value;
      updatePins();
    }
    // console.log(housingTypeValue);
  };
  // функция успешного ответа сервера, которая выполняет следующие действия:
  var successHandler = function (data) {
    pins = data;
    updatePins();
    // console.log(data);
  };

/** */
  // запускаем функцию по нажатию кнопки мыши, которая "активирует" форму(удаляя классы)
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded')) {
      window.form.editsForm();
      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      window.server.load(successHandler, window.server.errorHandler);
    }


    // первоначальные координаты маркера
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // устанавливаем у '#address' значение value с новыми координатами от mapPinMain(острого конца маркера)
    addNewPosition();
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
