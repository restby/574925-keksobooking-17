/*
Задача

В файле main.js:

    Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку. Структура объектов должна быть следующей:

    {
      "author": {
        "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      },
      "offer": {
        "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      },

      "location": {
        "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        "y": случайное число, координата y метки на карте от 130 до 630.
      }
    }

    У блока .map уберите класс .map--faded.

    Это временное решение, этот класс переключает карту из неактивного состояния в активное. В последующих заданиях, в соответствии с ТЗ вы будете переключать режимы страницы: неактивный, в котором карта и форма заблокированы и активный режим, в котором производится ввод данных и просмотр похожих объявлений. Сейчас для тестирования функции генерации похожих объявлений мы временно сымитируем активный режим, а в последующих разделах запрограммируем его полностью.

    На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.
        У метки должны быть следующие данные:
        Координаты: style="left: {{location.x}}px; top: {{location.y}}px;"
        src="{{author.avatar}}"
        alt="{{заголовок объявления}}"

        Обратите внимание. Координаты X и Y, которые вы вставите в разметку, это не координаты левого верхнего угла блока метки, а координаты, на которые указывает метка своим острым концом. Чтобы найти эту координату нужно учесть размеры элемента с меткой.

    Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.
    */

// var mock = [
//   {
//     "author": {
//       "avatar": 'строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются'
//   },
//     "offer": {
//       "type": 'строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo'
//     },

//     "location": {
//       "x": 'случайное число, координата x метки на карте.Значение ограничено размерами блока, в котором перетаскивается метка.',
//       "y": 'случайное число, координата y метки на карте от 130 до 630.'
//     }
//   }
// ];

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
