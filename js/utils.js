'use strict';
window.util = (function () {
  // открываем блок карты ".map"
  var MAP = document.querySelector('.map');
  // находим элемент '.map__pin--main'
  var MAIN_PIN = document.querySelector('.map__pin--main');
  // находим форму '.ad-form'
  var FORM = document.querySelector('.ad-form');
  // находим элемент '#address'
  var INPUT_ADDRESS = FORM.querySelector('#address');
  // находим все элементы 'fieldset'
  var FIELDSET_ARRAY = document.querySelectorAll('fieldset');
  // находим все элементы 'select'
  var SELECT_ARRAY = document.querySelectorAll('select');
  return {
    map: MAP,
    mapPinMain: MAIN_PIN,
    form: FORM,
    inputAddress: INPUT_ADDRESS,
    fieldsetArr: FIELDSET_ARRAY,
    selectArr: SELECT_ARRAY,
    // создаем функцию, которая будет перебирать массив / коллекцию и у каждого элемента удалять атрибут 'disabled'
    removeAttributeDisabled: function (arr) {
      for (var k = 0; k < arr.length; k++) {
        arr[k].removeAttribute('disabled', '');
      }
    }
  };
})();
