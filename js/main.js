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
var addData = function (arr) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').setAttribute('src', arr[j].author.avatar);
  mapPinElement.querySelector('img').setAttribute('alt', arr[j].offer.type);
  mapPinElement.style.left = arr[j].location.x + 'px';
  mapPinElement.style.top = arr[j].location.y + 'px';
  return mapPinElement;
};

// 3-4 создаем контейнер
var fragment = document.createDocumentFragment();

// 3-5 цикл запускающий функцию(которая вставляет значения) зависящий от длинны массива мок
for (var j = 0; j < mock.length; j++) {
  fragment.appendChild(addData(mock));
}

// 3-6 вставляем данные в блок из контейнера
// mapPins.appendChild(fragment);
/**/
/**/
/**/
// находим форму '.ad-form'
var AdForm = document.querySelector('.ad-form');

// находим форму '.map__filters'
var mapFiltersForm = document.querySelector('.map__filters');

// цепляем форме '.map__filters' атрибут disabled
mapFiltersForm.setAttribute('disabled', '');

// находим все теги fieldset в форме
var fieldsetArr = AdForm.querySelectorAll('fieldset');

// находим все теги select в форме
var selectArr = mapFiltersForm.querySelectorAll('select');

// цепляем всем тегам fieldset в форме атрибут disabled через уикл перебора коллекции
for (var a = 0; a < fieldsetArr.length; a++) {
  fieldsetArr[a].setAttribute('disabled', '');
}

// цепляем всем тегам select в форме атрибут disabled через уикл перебора коллекции
for (var b = 0; b < selectArr.length; b++) {
  selectArr[b].setAttribute('disabled', '');
}

// var setAttributeDisabled = function (arr) {
//   for (var k = 0; k < arr.length; k++) {
//     arr[k].removeAttribute('disabled', '');
//   }
// };

// находим элемент '.map__pin--main' и по клику отменяем действия по добавлению атрибута disabled к другим элементам
var mainMapPin = document.querySelector('.map__pin--main');
mainMapPin.addEventListener('click', function () {
  mapFiltersForm.removeAttribute('disabled');
});
