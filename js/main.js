var mock = [
  {
    "author": {
      "avatar": 'img/avatars/user{{xx}}.png' строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },
    "offer": {
      "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
    },

    "location": {
      "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      "y": случайное число, координата y метки на карте от 130 до 630.
    }
  }
];
var map = document.querySelector('.map');

map.classList.remove('map--faded');
