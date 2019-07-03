'use strict';
(function () {
  // 1) открываем блок карты ".map"
  var MAP = document.querySelector('.map');
  // 2) основной массив данных(объектов)
  var MOCK = [];
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
        x: randomCoordinate(0, MAP.offsetWidth),
        y: randomCoordinate(130, 630)
      }
    };
    // вставка объекта данных в массив
    MOCK.push(obj);
  }
  window.data = {
    mock: MOCK,
    map: MAP
  };
})();
