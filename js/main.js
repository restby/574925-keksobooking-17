//1) открываем блок карты ".map"
var map = document.querySelector('.map');
map.classList.remove('map--faded');

//2) author.avatar - цикл, который выводит строку для адреса изображения с подставленным номером от 1 до 8
for (var i = 1; i < 9; i++) {
  var imgSrc = 'img/avatars/user' + '0' + i + '.png';
  console.log(imgSrc);
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
  console.log(arrayRandElement(offerArray));
}

//4) location - функция генерации случайного числа для координаты
function randomInterger(min, max) {
  var rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return rand;
}

//4-1) location X) - генерация случайной координаты Х в пределах блока карты ".map"
var mapWidth = randomInterger(0, map.offsetWidth);
console.log(mapWidth);

//4-2) location Y) - генерация случайной координаты У в промежутке от 130 до 630
var mapHeight = randomInterger(130, 630);
console.log(mapHeight);

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
// console.log(mock[0].location.x);
// console.log(mock[0].location.y);
// for (var i = 0; i < mock.length; i++) {
//   console.log(mock[i]);
// }
// var mapPinImg = document.querySelector('#pin').content.querySelector('.map__pin').querySelector('img');
// mapPinImg.setAttribute('src', mock[0].author.avatar);
// console.log(mapPinImg);
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
      "x": 1200,
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
      "x": 1300,
      "y": 500
    }
  }
];
var exampleMock = [];
// 
// находим блок куда будут вставляться данные
var mapPinWrapper = document.querySelector('.map__pins');

// находим шаблон
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');

// создаем контейнер
var fragment = document.createDocumentFragment();



// функция конструктор для генерации объекта
function GenerationMapObj(location, author, offer) {
  this.location = location;
  this.author = author;
  this.offer = offer;
}

// создаем функцию, которая в содержимое шаблона добавляет данные из массива
var renderPin = function (_arr) {
  var mapPinElement = mapPin.cloneNode(true);
  mapPinElement.style.left = mock[0].location.x + px; top = mock[0].location.y + px;
  mapPinElement.querySelector('img').setAttribute('src', mock[0].author.avatar);
  mapPinElement.querySelector('img').setAttribute('alt', mock[0].offer.type);
  return mapPinElement;
};

for (var i = 0; i < mock.length; i++) {
  var mapPinObj = new GenerationMapObj();
  exampleMock.push(mapPinObj);
}


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