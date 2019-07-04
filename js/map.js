'use strict';
(function () {
  // ГЕНЕРАЦИЕЯ DOM ЭЛЕМЕНТОВ, ПРИСВОЕНИЕМ ИМ ДАННЫХ И ВНЕДРЕНИЕ ИХ В ВЕРСТКУ
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
  // находим элемент '.map__pin--main'
  var mapPinMain = document.querySelector('.map__pin--main');
  // находим элемент '#address'
  var inputAddress = window.form.adForm.querySelector('#address');
  // запускаем функцию по нажатию кнопки мыши, которая "активирует" форму(удаляя классы)
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (window.data.map.classList.contains('map--faded')) {
      window.form.editsForm();
      window.data.map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
    }

    var successHandler = function (data) {
      // создаем контейнер
      var fragment = document.createDocumentFragment();
      // цикл запускающий функцию(которая вставляет значения)
      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(addData(data[i]));
      }
      mapPins.appendChild(fragment);
    };

    var errorHandler = function () {
      // находим шаблон
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      // var errorBtn = document.querySelector('.error__button');
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

    window.load(successHandler, errorHandler);
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
