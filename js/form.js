'use strict';
(function () {
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
  // находим элемент '#address'
  var inputAddress = adForm.querySelector('#address');
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
})();

