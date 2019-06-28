'use strict';
// 1) открываем блок карты ".map"
var map = document.querySelector('.map');
// map.classList.remove('map--faded');

// 2) основной массив данных(объектов)
var mock = [];
// вспомогательный массив
var countOfObject = [1, 2, 3, 4, 5, 6, 7, 8];
// массив для offer
var offerArray = ['palace', 'flat', 'house', 'bungalo'];
// функция вывода случайного элемента из массива
function arrayRandElement(arr) {
  var randElement = Math.floor(Math.random() * arr.length);
  return arr[randElement];
}
// функция вывода случайного элемента в пределах min max
function randomCoordinate(min, max) {
  var rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return rand;
}
for (var i = 0; i < countOfObject.length; i++) {

  // создание объекта данных
  var obj = {
    author: {
      avatar: 'img/avatars/user0' + countOfObject[i] + '.png'
    },
    offer: {
      type: arrayRandElement(offerArray)
    },
    location: {
      x: randomCoordinate(0, map.offsetWidth),
      y: randomCoordinate(130, 630)
    }
  };
  // вставка объекта данных в массив
  mock.push(obj);
}

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
for (var j = 0; j < mock.length; j++) {
  fragment.appendChild(addData(mock[j]));
}

// находим форму '.ad-form'
var adForm = document.querySelector('.ad-form');
// находим все элементы 'fieldset'
var fieldsetArr = document.querySelectorAll('fieldset');
// находим все элементы 'select'
var selectArr = document.querySelectorAll('select');
// создаем функцию, которая будет перебирать массив / коллекцию и каждому элементу добавлять атрибут 'disabled'
var setAttributeDisabled = function (arr) {
  for (var k = 0; k < arr.length; k++) {
    arr[k].setAttribute('disabled', '');
  }
};
// создаем функцию, которая будет перебирать массив / коллекцию и у каждого элемента удалять атрибут 'disabled'
var removeAttributeDisabled = function (arr) {
  for (var k = 0; k < arr.length; k++) {
    arr[k].removeAttribute('disabled', '');
  }
};
// добавлят атрибут 'disabled' всем элементам 'fieldset'
setAttributeDisabled(fieldsetArr);
// добавлят атрибут 'disabled' всем элементам 'select'
setAttributeDisabled(selectArr);
// находим элемент '.map__pin--main'
var mapPinMain = document.querySelector('.map__pin--main');
// находим элемент '#address'
var inputAddress = adForm.querySelector('#address');
// // берем значения у '.map__pin--main' и формируем текст
// var mapPinMainPosition = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

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

// вешаем обработчик для перемещения маркера, а так же делает активной карту, форму и вызывает функции удаляющие атрибут 'disabled' у всех элементам 'fieldset' и 'select' и вставляем данные в блок из контейнера
mapPinMain.addEventListener('mousedown', function (evt) {


  /*
Не делай при каждом клике removeAttributeDisabled(fieldsetArr);
removeAttributeDisabled(selectArr);
map.classList.remove('map--faded');
adForm.classList.remove('ad-form--disabled');
mapPins.appendChild(fragment);
Добавь проверку, чтобы они отрабатывали только при первом клике(когда фома задизейблена)
И можешь вынести это все в отдельную функцию
*/


  evt.preventDefault();
  removeAttributeDisabled(fieldsetArr);
  removeAttributeDisabled(selectArr);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPins.appendChild(fragment);
  // первоначальные координаты маркера

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  // устанавливаем у '#address' значение value  с новыми координатами от mapPinMain(острого конца маркера)
  var addNewPosition = function (left, top, width) {
    var mapPinLeft = left + Math.round(width / 2);
    var mapPinTop = top;
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
    addNewPosition(mapPinMain.offsetLeft, mapPinMain.offsetTop, mapPinMain.offsetWidth);
  };
  // функция на "отжатие" кнопки мыши которая удаляет события смещения и нажатия
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    addNewPosition(mapPinMain.offsetLeft, mapPinMain.offsetTop, mapPinMain.offsetWidth);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
