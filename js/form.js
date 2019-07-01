'use strict';
(function () {
  // находим форму '.ad-form'
  var adForm = document.querySelector('.ad-form');
  // находим все элементы 'fieldset'
  var fieldsetArr = document.querySelectorAll('fieldset');
  // находим все элементы 'select'
  var selectArr = document.querySelectorAll('select');
  // создаем функцию, которая будет перебирать массив / коллекцию и каждому элементу добавлять атрибут 'disabled'
  var setAttributeDisabled = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', '');
    }
  };
  // добавлят атрибут 'disabled' всем элементам 'fieldset'
  setAttributeDisabled(fieldsetArr);
  // добавлят атрибут 'disabled' всем элементам 'select'
  setAttributeDisabled(selectArr);
  // находим элемент формы '#title'
  var titleInput = adForm.querySelector('#title');
  // запускаем код валидации на кол-во символов с  выдачей сообщений
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });
  // находим элемент формы '#type'
  var optionTypeSelected = adForm.querySelector('#type');
  // создаем функцию которая будет по изменению значения select изменять минимальное значения цены и первоначальную цену
  optionTypeSelected.onchange = function () {
    // находим элемент формы '#price'
    var minCountPrice = adForm.querySelector('#price');
    // запускаем проверку (на тип жилья) которая изменяет минимальное значения цены и первоначальную цену
    if (optionTypeSelected.value === 'bungalo') {
      minCountPrice.setAttribute('min', 'минимальная цена за ночь 0');
      minCountPrice.setAttribute('placeholder', '0');
    } else if (optionTypeSelected.value === 'flat') {
      minCountPrice.setAttribute('min', 'минимальная цена за ночь 1000');
      minCountPrice.setAttribute('placeholder', '1000');
    } else if (optionTypeSelected.value === 'house') {
      minCountPrice.setAttribute('min', 'минимальная цена за ночь 5000');
      minCountPrice.setAttribute('placeholder', '5000');
    } else if (optionTypeSelected.value === 'palace') {
      minCountPrice.setAttribute('min', 'минимальная цена за ночь 10000');
      minCountPrice.setAttribute('placeholder', '10000');
    }
  };
  // находим элемент формы '#timein'
  var timeIn = document.querySelector('#timein');
  // находим элемент формы '#timeout'
  var timeOut = document.querySelector('#timeout');
  // вешаем функцию на изменение select и меняем в противоположном значение
  timeIn.onchange = function () {
    timeOut.selectedIndex = this.selectedIndex;
  };
  // вешаем функцию на изменение select и меняем в противоположном значение
  timeOut.onchange = function () {
    timeIn.selectedIndex = this.selectedIndex;
  };
})();
/*
// создаем функцию, которая будет перебирать массив / коллекцию и у каждого элемента удалять атрибут 'disabled'
var removeAttributeDisabled = function (arr) {
  for (var k = 0; k < arr.length; k++) {
    arr[k].removeAttribute('disabled', '');
  }
};
// находим элемент '#address'
var inputAddress = adForm.querySelector('#address');
// создаем функцию которая делает активной карту, форму и вызывает функции удаляющие атрибут 'disabled' у всех элементам 'fieldset' и 'select'
var removeAttribute = function () {
  removeAttributeDisabled(fieldsetArr);
  removeAttributeDisabled(selectArr);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
};
// вешаем обработчик для перемещения маркера
mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (map.classList.contains('map--faded')) {
    removeAttribute();
  }
  вставляем данные в блок из контейнера
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
*/