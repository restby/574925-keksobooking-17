//1) открываем блок карты ".map"
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

// находим блок куда будут вставляться данные
var mapPins = document.querySelector('.map__pins');

// находим шаблон
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// функция которая вставляет значения из массива мок в шаблон
var addData = function (_arr) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').setAttribute('src', _arr[i].author.avatar);
  mapPinElement.querySelector('img').setAttribute('alt', _arr[i].offer.type);
  mapPinElement.style.left = _arr[i].location.x + 'px';
  mapPinElement.style.top = _arr[i].location.y + 'px';
  return mapPinElement;
}

// создаем контейнер
var fragment = document.createDocumentFragment();

// цикл запускающий функцию(которая вставляет значения) зависящий от длинны массива мок
for (var i = 0; i < mock.length; i++) {
  fragment.appendChild(addData(mock));
}

// вставляем данные в блок из контейнера
mapPins.appendChild(fragment);









/**!!!!!!!!!!!!!!!___________________!!!!!!!!!!!!!!!!!!!!!!!! */
var exampleMock = [];
// функция конструктор для генерации объекта - метки
function GenerationMapPin(author, offer, locationX, locationY) {
  this.author = author;
  this.offer = offer;
  this.location = locationX;
}

for (var i = 0; i < mock.length; i++) {
  var mapPinObj = new GenerationMapPin(mock[0].author.avatar, mock[0].offer.type, mock[0].location.x, mock[0].location.y);
  exampleMock.push(mapPinObj);
  console.log(exampleMock[i]);
}
// создать объект объектов У МЕНЯ СЕЙЧАС НЕ ПРАВИЛЬНО!!





//2) author.avatar - цикл, который выводит строку для адреса изображения с подставленным номером от 1 до 8
for (var i = 1; i < 9; i++) {
  var imgSrc = 'img/avatars/user' + '0' + i + '.png';
  // console.log(imgSrc);
}
//3) offer -
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
//4) location - функция генерации случайного числа для координаты
function randomInterger(min, max) {
  var rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return rand;
}
//4-1) location X) - генерация случайной координаты Х в пределах блока карты ".map"
var mapWidth = randomInterger(0, map.offsetWidth);
// console.log(mapWidth);
//4-2) location Y) - генерация случайной координаты У в промежутке от 130 до 630
var mapHeight = randomInterger(130, 630);
// console.log(mapHeight);






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
