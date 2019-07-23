'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  var fieldsetArr = document.querySelectorAll('fieldset');
  var selectArr = document.querySelectorAll('select');
  // функция, которая перебирает массив / коллекцию и каждому элементу добавлять атрибут 'disabled'
  var setAttributeDisabled = function (arr) {
    arr.forEach(function (it) {
      it.setAttribute('disabled', '');
    });
  };
  // функция, которая перебирает массив / коллекцию и у каждого элемента удалять атрибут 'disabled'
  var removeAttributeDisabled = function (arr) {
    arr.forEach(function (it) {
      it.removeAttribute('disabled', '');
    });
  };
  setAttributeDisabled(fieldsetArr);
  setAttributeDisabled(selectArr);
  var titleInput = form.querySelector('#title');
  /** запускаем код валидации на кол-во символов с  выдачей сообщений */
  // можно ли тут как-то исправить???????*
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
  // titleInput.addEventListener('input', function (evt) {
  //   var target = evt.target;
  //   if (target.value.length < 30) {
  //     target.setCustomValidity('В заголовке объявления должно быть минимум 30 символов');
  //   } else if (target.value.length > 200) {
  //     target.setCustomValidity('В заголовке объявления должно быть максимум 200 символов');
  //   } else {
  //     target.setCustomValidity('');
  //   }
  // });
  /** */
  var typeInput = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  // массив минимальных цен для атрибутов min и placeholder
  var pricesArr = [0, 1000, 5000, 100000];
  // функция, которая добавляет в атрибуты min и placeholder у элемента формы '#price' значение из массива цен
  var setAttributesMinAndPlaceholder = function (item) {
    priceInput.setAttribute('min', item);
    priceInput.setAttribute('placeholder', item);
  };
  var typeArr = typeInput.querySelectorAll('option');
  // массив из индексов всех вариантов значений элемента формы '#type'
  var typeOptionValue = [];
  typeArr.forEach(function (it) {
    typeOptionValue.push(it.value);
  });
  // функцию которая, по изменению значения select изменяет минимальное значения цены и подпись в поле формы
  typeInput.onchange = function () {
    // получает индекс выбранного значения у элемента формы '#price' и устанавливает соответствующий ему индекс из массива цен
    setAttributesMinAndPlaceholder(pricesArr[typeOptionValue.indexOf(typeInput.value)]);
  };
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  timeInInput.onchange = function () {
    timeOutInput.selectedIndex = this.selectedIndex;
  };
  timeOutInput.onchange = function () {
    timeInInput.selectedIndex = this.selectedIndex;
  };


  var roomNumberInput = form.querySelector('#room_number');
  var capacityInput = form.querySelector('#capacity');
  // var roomArr = roomNumberInput.querySelectorAll('option');
  var capacityArr = capacityInput.querySelectorAll('option');
  // массив из индексов всех вариантов значений элемента формы '#room_number'
  // var roomNumberOptionValue = [];
  // roomArr.forEach(function (it) {
  //   roomNumberOptionValue.push(it.value);
  // });
  // console.log(roomNumberOptionValue);
  // массив из индексов всех вариантов значений элемента формы '#capacity'
  // var capacityOptionValue = [];
  // capacityArr.forEach(function (it) {
  //   capacityOptionValue.push(it.value);
  // });
  // console.log(capacityOptionValue);
  roomNumberInput.onchange = function (evt) {
    var target = evt.target;
    // console.log();
    if (parseInt(target.value, 10) === 1) {
      capacityArr.forEach(function (it) {
        it.setAttribute('disabled', '');
        it.removeAttribute('selected', '');
        if (parseInt(it.value, 10) < 2 && parseInt(it.value, 10) > 0) {
          it.removeAttribute('disabled', '');
          it.setAttribute('selected', '');
        }
      });
    } else if (parseInt(target.value, 10) === 2) {
      capacityArr.forEach(function (it) {
        it.setAttribute('disabled', '');
        it.removeAttribute('selected', '');
        if (parseInt(it.value, 10) < 3 && parseInt(it.value, 10) > 0) {
          it.removeAttribute('disabled', '');
          it.setAttribute('selected', '');
        }
      });
    } else if (parseInt(target.value, 10) === 3) {
      capacityArr.forEach(function (it) {
        it.setAttribute('disabled', '');
        it.removeAttribute('selected', '');
        if (parseInt(it.value, 10) < 4 && parseInt(it.value, 10) > 0) {
          it.removeAttribute('disabled', '');
          it.setAttribute('selected', '');
        }
      });
    } else if (parseInt(target.value, 10) > 3) {
      capacityArr.forEach(function (it) {
        it.setAttribute('disabled', '');
        it.removeAttribute('selected', '');
        if (parseInt(it.value, 10) === 0) {
          it.removeAttribute('disabled', '');
          it.setAttribute('selected', '');
        }
      });
    }
    // capacityArr.forEach(function (it) {
    //   it.setAttribute('disabled', '');
    //   it.removeAttribute('selected', '');
    //   if (parseInt(it.value, 10) === 2) {
    //     it.removeAttribute('disabled', '');
    //     it.setAttribute('selected', '');
    //   }
    // });
    // for (var i = 0; i < capacityArr.length; i++) {
    //   // console.log(capacityArr[i].value);
    //   capacityArr[i].setAttribute('disabled', '');
    //   capacityArr[i].removeAttribute('selected', '');
    //   if (parseInt(capacityArr[i].value, 10) === 2) {
    //     capacityArr[i].removeAttribute('disabled', '');
    //     capacityArr[i].setAttribute('selected', '');
    //   }
    // }
  };


  // функция которая вызывает функции удаляющие атрибут 'disabled' у всех элементам 'fieldset' и 'select'
  var editsForm = function () {
    removeAttributeDisabled(fieldsetArr);
    removeAttributeDisabled(selectArr);
  };
  window.form = {
    editsForm: editsForm,
    form: form
  };
})();
