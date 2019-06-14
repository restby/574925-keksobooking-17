//1) открываем блок карты ".map"
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// 3 ГЕНЕРАЦИЕЯ DOM ЭЛЕМЕНТОВ И ПРИСВОЕНИЕМ ИМ ДАННЫХ ИЗ МАССИВА И ВНЕДРЕНИЕ ИХ В ВЕРСТКУ
var mock = [
  {
    "author": {
      "avatar": 'img/avatars/user01.png'
    },
    "offer": {
      "type": 'bungalo'
    },

    "location": {
      "x": 1100,
      "y": 300
    }
  },
  {
    "author": {
      "avatar": 'img/avatars/user02.png'
    },
    "offer": {
      "type": 'flat'
    },

    "location": {
      "x": 900,
      "y": 400
    }
  },
  {
    "author": {
      "avatar": 'img/avatars/user03.png'
    },
    "offer": {
      "type": 'house'
    },

    "location": {
      "x": 700,
      "y": 500
    }
  }
];

//3-1 находим блок куда будут вставляться данные
var mapPins = document.querySelector('.map__pins');

//3-2 находим шаблон
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

//3-3 функция которая вставляет значения из массива мок в шаблон
var addData = function (_arr) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').setAttribute('src', _arr[i].author.avatar);
  mapPinElement.querySelector('img').setAttribute('alt', _arr[i].offer.type);
  mapPinElement.style.left = _arr[i].location.x + 'px';
  mapPinElement.style.top = _arr[i].location.y + 'px';
  return mapPinElement;
}

//3-4 создаем контейнер
var fragment = document.createDocumentFragment();

//3-5 цикл запускающий функцию(которая вставляет значения) зависящий от длинны массива мок
for (var i = 0; i < mock.length; i++) {
  fragment.appendChild(addData(mock));
}

//3-6 вставляем данные в блок из контейнера
mapPins.appendChild(fragment);



/**!!!!!!!!!!!!!!!___________________!!!!!!!!!!!!!!!!!!!!!!!! */


// 1.1 ГЕНЕРАЦИЯ ДАННЫХ ДЛЯ МАССИВА "МОК"
//1-1) author.avatar - цикл, который выводит строку для адреса изображения с подставленным номером от 1 до 8
for (var i = 1; i < 9; i++) {
  var imgSrc = 'img/avatars/user' + '0' + i + '.png';
  // console.log(imgSrc);
}
//1-2) offer -
// массив для offer
var offerArray = ['palace', 'flat', 'house', 'bungalo'];
// функция вывода случайного элемента из массива
function arrayRandElement(arr) {
  var randElement = Math.floor(Math.random() * arr.length);
  return arr[randElement];
}
// цикл вывода элемента массива
for (var i = 0; i < offerArray.length; i++) {
  // console.log(arrayRandElement(offerArray));
}
//1-3) location - функция генерации случайного числа для координаты
function randomInterger(min, max) {
  var rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return rand;
}
// location X) - генерация случайной координаты Х в пределах блока карты ".map"
var mapWidth = randomInterger(0, map.offsetWidth);
// console.log(mapWidth);
// location Y) - генерация случайной координаты У в промежутке от 130 до 630
var mapHeight = randomInterger(130, 630);
// console.log(mapHeight);



// !!!!!!!!!!!!!!! НУЖНО ЗАПУШИТЬ ЭТИ ДАННЫЕ В МАССИВ "МОК"!!!!!!!



// 2 ГЕНЕРАЦИЯ ОБЪЕКТА МЕТКИ С ПРИМЕНЕНИМ ДАННЫХ ИЗ МАССИВА "МОК"
var exampleMock = [];
// функция конструктор для генерации объекта - метки (объект объектов)
function GenerationMapPin(avatar, type, locationX, locationY) {
  this.author = {
    avatar: avatar
  };
  this.offer = {
    type: type
  };
  this.location = {
    x: locationX,
    y: locationY
  };
}
// цикл запускающий генерацию объекта - метки, который берет данные из массива мок и зависит от длинны этого массива
for (var i = 0; i < mock.length; i++) {
  var mapPinObj = new GenerationMapPin(mock[0].author.avatar, mock[0].offer.type, mock[0].location.x, mock[0].location.y);
  exampleMock.push(mapPinObj);
  console.log(exampleMock[i]);
}





/*________________________________________________________*/
// var exampleArray = [];

// var generateArray = function() {
//   for (var i = 1; i < 2; i++) {
//     var imgSrc = 'img/avatars/user' + '0' + i + '.png';
//     console.log(imgSrc);
//   }

//   var offerArray = ['palace', 'flat'];
//   for (var i = 0; i < offerArray.length; i++) {
//     function arrayRandElement(arr) {
//       var randElement = Math.floor(Math.random() * arr.length);
//       return arr[randElement];
//     }
//     console.log(arrayRandElement(offerArray));
//   }

//   function randomInterger(min, max) {
//     var rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
//     return rand;
//   }
//   var mapWidth = randomInterger(0, map.offsetWidth);
//   console.log(mapWidth);
//   var mapHeight = randomInterger(130, 630);
//   console.log(mapHeight);
// }

// for (var i = 0; i < 2; i++) {
//   var elementObj = new generateArray();
//   exampleArray.push(elementObj);
// }
// console.dir(exampleArray);
/*________________________________________________________*/



// function GenerationMapObj(author, offer, location) {
//   this.author = author;
//   this.offer = offer;
//   this.location = location;
// }

// var authorObj = {"avatar": 'img/avatars/user01.png'};
// var offerObj = {"type": 'bungalo'};
// var locationObj = {"x": 1100,
//                 "y": 300};

// var mapPinObj = new GenerationMapObj(authorObj, offerObj, locationObj);
// console.log(mapPinObj);

/**!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
// Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку.Структура объектов должна быть следующей:

// {
//   "author": {
//     "avatar": строка, адрес изображения вида img / avatars / user{ { xx } }.png, где { { xx } } это число от 1 до 8 с ведущим нулём.Например, 01, 02 и т.д.Адреса изображений не повторяются
//   },
//   "offer": {
//     "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
//   },

//   "location": {
//     "x": случайное число, координата x метки на карте.Значение ограничено размерами блока, в котором перетаскивается метка.
//     "y": случайное число, координата y метки на карте от 130 до 630.
//   }
// }

// На основе данных, созданных в первом пункте, создайте DOM - элементы, соответствующие меткам на карте, и заполните их данными из массива.Итоговую разметку метки.map__pin можно взять из шаблона #pin.

// У метки должны быть следующие данные:
// Координаты: style = "left: {{location.x}}px; top: {{location.y}}px;"
// src = "{{author.avatar}}"
// alt = "{{заголовок объявления}}"

// Обратите внимание.Координаты X и Y, которые вы вставите в разметку, это не координаты левого верхнего угла блока метки, а координаты, на которые указывает метка своим острым концом.Чтобы найти эту координату нужно учесть размеры элемента с меткой.
