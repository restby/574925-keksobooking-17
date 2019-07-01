'use strict';
(function () {
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
})();
