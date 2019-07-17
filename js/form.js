'use strict';
(function () {
  // находим форму '.ad-form'
  var ADFORM = document.querySelector('.ad-form');
  // находим все элементы 'fieldset'
  var fieldsetArr = document.querySelectorAll('fieldset');
  // находим все элементы 'select'
  var selectArr = document.querySelectorAll('select');
  // создаем функцию, которая будет перебирать массив / коллекцию и каждому элементу добавлять атрибут 'disabled'
  var setAttributeDisabled = function (arr) {
    arr.forEach(function (it) {
      it.setAttribute('disabled', '');
    });
  };
  // создаем функцию, которая будет перебирать массив / коллекцию и у каждого элемента удалять атрибут 'disabled'
  var removeAttributeDisabled = function (arr) {
    arr.forEach(function (it) {
      it.removeAttribute('disabled', '');
    });
  };
  // добавлят атрибут 'disabled' всем элементам 'fieldset'
  setAttributeDisabled(fieldsetArr);
  // добавлят атрибут 'disabled' всем элементам 'select'
  setAttributeDisabled(selectArr);
  // находим элемент формы '#title'
  var titleInput = ADFORM.querySelector('#title');
  // запускаем код валидации на кол-во символов с  выдачей сообщений

  /* можно ли тут как-то исправить???????*/
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
  var type = ADFORM.querySelector('#type');
  // находим элемент формы '#price'
  var minCountPrice = ADFORM.querySelector('#price');
  // создаем массив минимальных цен для атрибутов min и placeholder
  var pricesArray = [0, 1000, 5000, 100000];
  // создаем функцию, которая будет добавлять в атрибуты min и placeholder у элемента формы '#price' значение из массива цен
  var setAttributesMinAndPlaceholder = function (item) {
    minCountPrice.setAttribute('min', item);
    minCountPrice.setAttribute('placeholder', item);
  };
  // находим все варианты значений элемента формы '#type'
  var typeArray = type.querySelectorAll('option');
  // создаем массив из индексов всех вариантов значений элемента формы '#type'
  var typeOptionValue = [];
  typeArray.forEach(function (it) {
    typeOptionValue.push(it.value);
  });
  // создаем функцию которая будет по изменению значения select изменять минимальное значения цены и подпись в поле формы
  type.onchange = function () {
    // получаем индекс выбранного значения у элемента формы '#price' и устанавливаем соответствующий ему индекс из массива цен
    setAttributesMinAndPlaceholder(pricesArray[typeOptionValue.indexOf(type.value)]);
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
  // создаем функцию которая делает активной карту, форму и вызывает функции удаляющие атрибут 'disabled' у всех элементам 'fieldset' и 'select' и вставляем данные в блок из контейнера
  var editsForm = function () {
    removeAttributeDisabled(fieldsetArr);
    removeAttributeDisabled(selectArr);
  };
  window.form = {
    editsForm: editsForm,
    adForm: ADFORM
  };
})();
